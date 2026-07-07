import Bull from "bull";

const MAX_RETRIES = 3;
const MAX_QUEUE_SIZE = 1000;

let emailQueue = null;
let fallbackQueue = [];
let fallbackProcessing = false;

try {
  const redisUrl = process.env.REDIS_URL;
  if (redisUrl) {
    emailQueue = new Bull("email", redisUrl, {
      defaultJobOptions: {
        attempts: MAX_RETRIES,
        backoff: { type: "exponential", delay: 1000 },
        removeOnComplete: true,
        removeOnFail: false,
      },
    });
    emailQueue.on("error", (err) => console.warn("[email-queue] Bull error:", err.message));
    emailQueue.process(async (job) => {
      await job.data.sendMailFn(job.data);
    });
  }
} catch (e) {
  console.warn("[email-queue] Bull unavailable, using in-memory fallback:", e.message);
}

async function processFallback() {
  if (fallbackProcessing || fallbackQueue.length === 0) return;
  fallbackProcessing = true;

  while (fallbackQueue.length > 0) {
    const job = fallbackQueue.shift();
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        await job.sendMailFn(job);
        break;
      } catch (e) {
        console.warn(`[email-queue] Attempt ${attempt}/${MAX_RETRIES} failed:`, e.message);
        if (attempt === MAX_RETRIES) {
          console.error(`[email-queue] Dropping email after ${MAX_RETRIES} attempts`);
        }
        await new Promise(r => setTimeout(r, 1000 * attempt));
      }
    }
  }

  fallbackProcessing = false;
}

export function enqueue(sendMailFn, job) {
  if (emailQueue) {
    emailQueue.add({ sendMailFn, ...job });
  } else {
    if (fallbackQueue.length >= MAX_QUEUE_SIZE) {
      console.warn("[email-queue] Fallback queue full, dropping oldest email");
      fallbackQueue.shift();
    }
    fallbackQueue.push(job);
    setImmediate(processFallback);
  }
}

export function queueSize() {
  if (emailQueue) return 0;
  return fallbackQueue.length;
}
