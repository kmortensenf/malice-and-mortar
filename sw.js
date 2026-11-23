// Retires the old installed app: clears its cache, unregisters, and reloads open tabs onto the moved page.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(ks => Promise.all(ks.filter(k => k.startsWith("mm-")).map(k => caches.delete(k))))
    .then(() => self.registration.unregister())
    .then(() => self.clients.matchAll({ type: "window" }))
    .then(cs => cs.forEach(c => c.navigate(c.url))));
});
