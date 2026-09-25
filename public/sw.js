// public/sw.js - INDUSYNC Service Worker Móvil Resiliente
const CACHE_NAME = 'indusync-v5-mobile-pro';

const ESSENTIAL_FILES = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.svg',
];

// Instalación sin fallos: Guarda cada archivo individualmente
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      for (const file of ESSENTIAL_FILES) {
        try {
          await cache.add(file);
        } catch (e) {
          console.warn('⚠️ No se pudo pre-cachear:', file);
        }
      }
    })
  );
});

// Activación y toma de control inmediata
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => key !== CACHE_NAME && caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// Interceptor de peticiones
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET' || req.url.includes('supabase.co')) return;

  // Si es navegación de pantalla (HTML), responder con el App Shell
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          if (res.status === 200) {
            const copy = res.clone();
            caches.open(CACHE_NAME).then((c) => c.put('/index.html', copy));
          }
          return res;
        })
        .catch(() => caches.match('/index.html') || caches.match('/'))
    );
    return;
  }

  // Para JS, CSS, imágenes y scripts de Tailwind
  event.respondWith(
    caches.match(req).then((cached) => {
      const fetchPromise = fetch(req).then((networkRes) => {
        if (networkRes && networkRes.status === 200) {
          const resCopy = networkRes.clone();
          caches.open(CACHE_NAME).then((c) => c.put(req, resCopy));
        }
        return networkRes;
      }).catch(() => null);

      // Entregar copia local si existe, o esperar a la red
      return cached || fetchPromise;
    })
  );
});