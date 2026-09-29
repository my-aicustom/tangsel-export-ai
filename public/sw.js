const CACHE_VERSION = 'tangsel-export-ai-ice-bsd-v1';
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const PAGE_CACHE = `${CACHE_VERSION}-pages`;

const CORE_PAGES = [
  '/',
  '/kiosk',
  '/logistics',
  '/readiness',
  '/command-center',
  '/ai-advisor',
];

const STATIC_ASSETS = [
  '/favicon.svg',
  '/branding/logo-tangsel.png',
  '/branding/logo-tangsel.webp',
  '/branding/logo-dhl.png',
  '/branding/logo-dhl.webp',
  '/branding/logo-dhl-transparent.png',
  '/branding/my-aicustom-logo.webp',
  '/images/Lambang_Kota_Tangerang_Selatan.svg.webp',
  '/images/loho DHL.webp',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then((cache) => cache.addAll(STATIC_ASSETS)),
      caches.open(PAGE_CACHE).then((cache) => cache.addAll(CORE_PAGES)),
    ]).then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys
          .filter((key) => key.startsWith('tangsel-export-ai-') && !key.startsWith(CACHE_VERSION))
          .map((key) => caches.delete(key)),
      ))
      .then(() => self.clients.claim()),
  );
});

function isStaticRequest(request) {
  const url = new URL(request.url);
  return request.destination === 'style'
    || request.destination === 'script'
    || request.destination === 'image'
    || request.destination === 'font'
    || url.pathname.startsWith('/branding/')
    || url.pathname.startsWith('/images/')
    || url.pathname === '/favicon.svg'
    || url.hostname === 'fonts.googleapis.com'
    || url.hostname === 'fonts.gstatic.com';
}

async function cacheFirst(request) {
  const cache = await caches.open(STATIC_CACHE);
  const cached = await cache.match(request);
  if (cached) return cached;

  const fresh = await fetch(request);
  if (fresh.ok) cache.put(request, fresh.clone());
  return fresh;
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(PAGE_CACHE);
  const cached = await cache.match(request);
  const fresh = fetch(request)
    .then((response) => {
      if (response.ok) cache.put(request, response.clone());
      return response;
    })
    .catch(() => cached);

  return cached || fresh;
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin && !url.hostname.startsWith('fonts.')) return;

  if (isStaticRequest(request)) {
    event.respondWith(cacheFirst(request));
    return;
  }

  if (request.mode === 'navigate' || CORE_PAGES.includes(url.pathname)) {
    event.respondWith(staleWhileRevalidate(request));
  }
});
