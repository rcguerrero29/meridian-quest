/* Meridian Quest service worker — cache-first, offline-capable.
   Rules (2026-09-05, docs/story/el-changarrito.md §4 B5, §5 R6): this worker serves the
   game's own shell and nothing else — never a cross-origin request (an API answer must not
   be frozen in a cache), never a non-ok response (a 403 must not become the permanent
   answer), and it deletes only caches it owns (another pack on this origin keeps its own). */
const CACHE = "mq-v65";
const PFX = "mq-"; /* the cache names this worker owns */
const ASSETS = ["./", "./index.html", "./qr.js", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png",
  "./engine/engine.js", "./engine/engine3d.js", "./vendor/three.min.js",
  "./content/meridian/strings.js", "./content/meridian/quests.en.js", "./content/meridian/quests.es.js",
  "./content/meridian/npcs.js", "./content/meridian/maps.js", "./content/meridian/config.js",
  "./content/meridian/art.js", "./content/meridian/room.js", "./content/meridian/docs.js"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith(PFX) && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  let url; try { url = new URL(e.request.url); } catch (err) { return; }
  if (url.origin !== self.location.origin) return; /* the shell only — never an API, never a CDN */
  e.respondWith(
    caches.match(e.request, { cacheName: CACHE }).then(hit => hit || fetch(e.request).then(res => {
      if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); }
      return res;
    }).catch(() => e.request.mode === "navigate" ? caches.match("./index.html", { cacheName: CACHE }) : Response.error()))
  );
});
