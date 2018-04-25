self.addEventListener('install', e => {
  const timeStamp = Date.now();
  e.waitUntil(
    caches.open('RestoMapp').then(cache => {
      return cache.addAll([
        '/',
		'/manifest.json?timestamp=${timeStamp}',
		'/index.html?timestamp=${timeStamp}',
		'/images/Baguio.png?timestamp=${timeStamp}',
		'/images/marker.png?timestamp=${timeStamp}',
		'/images/icons/96x96.png?timestamp=${timeStamp}',
		'/images/icons/192x192.png?timestamp=${timeStamp}',
		'/images/icons/256x256.png?timestamp=${timeStamp}',
		'/images/favicon.ico?timestamp=${timeStamp}',
		'/style.css',
		'/script.js'
      ])
          .then(() => self.skipWaiting());
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request, {ignoreSearch: true}).then(response => {
      return response || fetch(event.request);
    })
  );
});