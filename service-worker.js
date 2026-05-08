const CACHE_NAME = 'mobi-green-cache-v1';
const ASSETS_TO_CACHE = [
	'./',
	'./index.html',
	'./style.css',
	'./app.js',
	'./manifest.json',
	'./Logo.png',
	'./icon-192.png',
	'./icon-512.png'
];

self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
	);
	self.skipWaiting();
});

self.addEventListener('activate', (event) => {
	event.waitUntil(
		caches.keys().then((cacheNames) => Promise.all(
			cacheNames.map((cacheName) => {
				if (cacheName !== CACHE_NAME) {
					return caches.delete(cacheName);
				}
				return Promise.resolve();
			})
		))
	);
	self.clients.claim();
});

self.addEventListener('fetch', (event) => {
	if (event.request.method !== 'GET') return;

	const requestUrl = new URL(event.request.url);
	if (requestUrl.origin !== self.location.origin) return;

	event.respondWith(
		caches.match(event.request).then((cachedResponse) => {
			if (cachedResponse) return cachedResponse;

			return fetch(event.request).then((networkResponse) => {
				const responseClone = networkResponse.clone();
				caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
				return networkResponse;
			}).catch(() => caches.match('./index.html'));
		})
	);
});
