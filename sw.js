/* DropPilot service worker — offline support for in-car use.
 *
 * Strategy:
 * - /api/* and any navigation carrying ?session_id= always go to the
 *   network. The Stripe checkout session and the edge middleware's payment
 *   verification must never be served from cache.
 * - EXCEPTION: /api/content (full elite content files) is cached at runtime
 *   so verified elite buyers keep their content offline. The cookie-gated
 *   endpoint only ever served it to them.
 * - App shell (same-origin static files) is precached on install and served
 *   stale-while-revalidate afterwards.
 * - Navigations are network-first with a cached fallback, so a reload with
 *   no signal still opens the app.
 * - Pinned CDN scripts (React) and fonts are cached at runtime so the app
 *   shell renders fully offline after the first visit.
 */

// __BUILD_VERSION__ is replaced at build time (tools/build.mjs) with the
// Vercel commit SHA or a timestamp, so every deploy gets a fresh cache.
const VERSION = "droppilot-__BUILD_VERSION__";
const STATIC_CACHE = VERSION + "-static";
const RUNTIME_CACHE = VERSION + "-runtime";

const PRECACHE = [
  "/",
  "/app.html",
  "/app.bundle.js",
  "/content-en1.js",
  "/content-en2.js",
  "/content-es1.js",
  "/content-es2.js",
  "/manifest.webmanifest",
  "/icon-192.png",
  "/icon-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      // Add files individually: one missing file (e.g. an icon mid-deploy)
      // must not wipe out the whole offline cache.
      .then((cache) =>
        Promise.allSettled(PRECACHE.map((url) => cache.add(url)))
      )
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((k) => k.indexOf("droppilot-") === 0 && k !== STATIC_CACHE && k !== RUNTIME_CACHE)
            .map((k) => caches.delete(k))
        )
      )
      .then(() => self.clients.claim())
  );
});

// Payment-related requests must always hit the network.
function isPaymentRequest(url) {
  return (
    url.pathname.indexOf("/api/") === 0 ||
    url.searchParams.has("session_id")
  );
}

function staleWhileRevalidate(cacheName, request) {
  return caches.open(cacheName).then((cache) =>
    cache.match(request).then((cached) => {
      const network = fetch(request).then((response) => {
        if (response && (response.status === 200 || response.type === "opaque")) {
          cache.put(request, response.clone());
        }
        return response;
      });
      return cached || network;
    })
  );
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);

  // Elite content files: cache at runtime so buyers keep them offline.
  // (The endpoint only serves them to cookie-verified elite browsers.)
  if (url.pathname === "/api/content") {
    event.respondWith(staleWhileRevalidate(RUNTIME_CACHE, request));
    return;
  }

  // Never cache or intercept Stripe checkout / payment verification.
  if (isPaymentRequest(url)) return;

  // Navigations: network first, fall back to the cached copy offline.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.status === 200) {
            const copy = response.clone();
            caches.open(STATIC_CACHE).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() =>
          caches
            .match(request, { cacheName: STATIC_CACHE })
            .then((hit) => hit || caches.match("/app.html", { cacheName: STATIC_CACHE }))
        )
    );
    return;
  }

  // Same-origin static assets: serve cached, refresh in background.
  if (url.origin === self.location.origin) {
    event.respondWith(staleWhileRevalidate(STATIC_CACHE, request));
    return;
  }

  // Pinned CDN scripts and fonts: cache at runtime so the shell renders offline.
  if (
    url.hostname === "unpkg.com" ||
    url.hostname === "fonts.googleapis.com" ||
    url.hostname === "fonts.gstatic.com"
  ) {
    event.respondWith(staleWhileRevalidate(RUNTIME_CACHE, request));
  }
});
