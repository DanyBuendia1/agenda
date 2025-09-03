if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./js/service-worker.js')
    .then(reg => console.log('Service Worker registrado', reg))
    .catch(err => console.error('Error al registrar el Service Worker', err));
}
