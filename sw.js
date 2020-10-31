self.addEventListener('install', (event) => {
  event.waitUntil(preCache());
});

self.addEventListener('fetch', (event) => {
  const request = event.request;

  if (request.method !== 'GET') {
    return;
  }

  event.respondWith(cachedResponse(request));
  event.waitUntil(updateCache(request));
});

const getCache = () => caches.open('v1');

async function preCache() {
  const cache = await getCache();
  return cache.addAll([
    '/',
    '/index.html',
    // '/assets/index.js',
    // '/assets/MediaPlayer.js',
    // '/assets/plugins/AutoPlay.js',
    // '/assets/plugins/AutoPause.js',
    // '/assets/index.css',
    // '/assets/BigBuckBunny.mp4',
  ]);
}

async function cachedResponse(request) {
  const cache = await getCache();
  const response = await cache.match(request);
  return response || fetch(request);
}

async function updateCache(request) {
  const cache = await getCache();
  const response = await fetch(request);
  return cache.put(request, response);
}
