const CACHE = "xanascript-v2";
const ASSETS = ["/", "/manifest.json", "/css/tailwind.css", "/css/lesson.css", "/css/markdown.css"];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(clients.claim());
});

self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET" || url.origin !== self.location.origin) return;
  if (url.pathname.startsWith("/api/")) return;

  const isStatic = /\.(css|js|json|png|jpg|jpeg|gif|svg|ico|woff2?|ttf|eot)$/i.test(url.pathname)
    || ASSETS.includes(url.pathname);

  if (isStatic) {
    e.respondWith(
      caches.match(e.request).then((hit) => {
        if (hit) return hit;
        return fetch(e.request).then((res) => {
          if (res.ok) { const clone = res.clone(); caches.open(CACHE).then((c) => c.put(e.request, clone)); }
          return res;
        });
      }).catch(() => caches.match("/"))
    );
  }
});