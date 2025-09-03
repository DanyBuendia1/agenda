self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('mi-cache').then(cache => {
      return cache.addAll([
        '/index.html',
        '/js/register-sw.js',
        '/js/service-worker.js',
        '/agenda.jpg'
      ]);
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});
