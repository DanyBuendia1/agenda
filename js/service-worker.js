
const CACHE_NAME = 'mi-cache-v2';
const FILES_TO_CACHE = [
  '/index.html',
  '/index2.html',
  '/manifest.json',
  '/js/register-sw.js',
  '/js/service-worker.js',
  '/agenda.jpg',
  // Agrega aquí otros archivos necesarios (CSS, fuentes, etc.)
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response;
      }
      return fetch(event.request).catch(() => {
        // Si es una petición de navegación, muestra un mensaje offline simple
        if (event.request.mode === 'navigate') {
          return new Response('<h1>Sin conexión</h1><p>No tienes conexión a internet y este recurso no está en caché.</p>', {
            headers: { 'Content-Type': 'text/html' }
          });
        }
      });
    })
  );
});
