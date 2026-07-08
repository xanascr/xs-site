const CACHE = "xanascript-v1";
const ASSETS = ["/", "/en/", "/pt/", "/es/", "/manifest.json", "/css/tailwind.css"];

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

  // Only handle same-origin GET requests
  if (e.request.method !== "GET" || url.origin !== self.location.origin) return;

  // Skip API routes (they have dynamic auth headers)
  if (url.pathname.startsWith("/api/")) return;

  // Only cache static assets (CSS, JS, images, fonts, manifest)
  const isStatic = /\.(css|js|json|png|jpg|jpeg|gif|svg|ico|woff2?|ttf|eot)$/i.test(url.pathname)
    || ASSETS.includes(url.pathname);
  if (!isStatic) return;

  e.respondWith(
    caches.match(e.request).then((hit) => {
      if (hit) return hit;
      return fetch(e.request).then((res) => {
        if (res.ok) {
          const clone = res.clone();
          caches.open(CACHE).then((c) => c.put(e.request, clone));
        }
        return res;
      });
    }).catch(() => caches.match("/en/"))
  );
});
