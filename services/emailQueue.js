let queue = [];
let processing = false;
const MAX_RETRIES = 3;

async function processQueue(sendMailFn) {
  if (processing || queue.length === 0) return;
  processing = true;

  while (queue.length > 0) {
    const job = queue.shift();
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        const html = await job.htmlPromise;
        await sendMailFn({ ...job, html });
        break;
      } catch (e) {
        console.warn(`[email-queue] Attempt ${attempt}/${MAX_RETRIES} failed:`, e.message);
        if (attempt === MAX_RETRIES) {
          console.error(`[email-queue] Dropping email after ${MAX_RETRIES} attempts:`, job.subject);
        }
        await new Promise(r => setTimeout(r, 1000 * attempt));
      }
    }
  }

  processing = false;
}

export function enqueue(sendMailFn, job) {
  queue.push(job);
  setImmediate(() => processQueue(sendMailFn));
}

export function queueSize() {
  return queue.length;
}
