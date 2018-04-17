self.addEventListener('install', function(event) {
	const timeStamp = Date.now();
	console.log('SW Installed');
	event.waitUntil(
		caches.open('Tahanan')
			.then(function (cache) {
				cache.addAll([
					'/',
					'/manifest.json?timestamp=${timeStamp}',
					'/index.html?timestamp=${timeStamp}',
					'/js/app.js?timestamp=${timeStamp}',
					'/css/styles.css?timestamp=${timeStamp}',
					'/images/Baguio.png?timestamp=${timeStamp}',
					'/images/marker.png?timestamp=${timeStamp}',
					'/images/icons/96x96.png?timestamp=${timeStamp}',
					'/images/icons/144x144.png?timestamp=${timeStamp}',
					'/images/icons/256x256.png?timestamp=${timeStamp}'
				]);
			})
	);
});
	
self.addEventListener('activate', function () {
	console.log('SW Activated');
});
self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.match(event.request)
		.then (function(res) {
			if (res) {
				return res;
			} else {
				return fetch(event.request);
			}
		})
	);
});

