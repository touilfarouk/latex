const CACHE_NAME = "katex-pwa-cache-v1";
const ASSETS = [
    "/",
    "/index.html",
    "/app.js",
    "https://cdn.jsdelivr.net/npm/katex@0.15.3/dist/katex.min.js",
    "https://cdn.jsdelivr.net/npm/katex@0.15.3/dist/katex.min.css",
];

// Install Service Worker
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
    );
    console.log("Service Worker Installed");
});

// Activate Service Worker
self.addEventListener("activate", (event) => {
    console.log("Service Worker Activated");
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            )
        )
    );
});

// Fetch from Cache or Network
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
