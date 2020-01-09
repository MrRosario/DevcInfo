let cacheName = 'devcinfo-v1';
let filesToCache = [
    '/',
    '/public/css/style.css',
    '/public/js/main-min.js',
    '/public/js/install-sw.js',
    '/public/images/logo.png',
    '/public/images/logo192.png'
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install...');
  self.skipWaiting(); //To forces the waiting service worker to become the active service worker
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell...');
      return cache.addAll(filesToCache).then(() => {
        console.info('All files are cached');
      })
      .catch((error) =>  {
        console.error('Failed to cache', error);
      });
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  console.log('[ServiceWorker] Fetch', event.request.url);
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request); //Network falling back to the cache
    })
  );
});
self.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  console.log('Prevent Chrome 67 and earlier from automatically showing the prompt');
});