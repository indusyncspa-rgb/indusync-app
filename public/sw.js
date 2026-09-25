// public/sw.js - INDUSYNC Service Worker Mobile Offline Engine
const CACHE_NAME = 'indusync-v4-mobile-offline';

// Archivos críticos que se guardan en el disco del celular en el segundo 0 de instalación
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.svg',
  'https://cdn.tailwindcss.com'
];

// 1. INSTALACIÓN: Guardar la app shell en disco local inmediatamente
self.addEventListener('install', (event) => {
  console.log('⚙️ [SW Mobile] Precargando archivos esenciales en el celular...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_URLS);
    }).then(() => self.skipWaiting())
  );
});

// 2. ACTIVACIÓN: Limpiar versiones viejas del celular
self.addEventListener('activate', (event) => {
  console.log('⚡ [SW Mobile] Activando nuevo motor offline...');
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('🧹 [SW Mobile] Borrando caché obsoleta:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. INTERCEPTOR DE RED (Cache First con Fallback a Red)
self.addEventListener('fetch', (event) => {
  const request = event.request;

  if (request.method !== 'GET') return;

  // Ignorar consultas directas a la base de datos de Supabase
  if (request.url.includes('supabase.co') || request.url.includes('/rest/v1/')) {
    return;
  }

  // Respuesta inmediata para navegación de páginas en el móvil
  if (request.mode === 'navigate' || request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const copy = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put('/', copy.clone());
              cache.put('/index.html', copy);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // SI NO HAY RED EN EL CELULAR: Entregar la app shell guardada en disco
          return caches.match('/') || caches.match('/index.html');
        })
    );
    return;
  }

  // Estrategia para scripts, estilos e imágenes
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        // Devolver inmediatamente desde el disco del celular
        fetch(request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then((cache) => cache.put(request, networkResponse));
          }
        }).catch(() => {/* Modo sin conexión activo */});

        return cachedResponse;
      }

      // Si no estaba en caché, descargarlo y guardarlo
      return fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
          }
          return networkResponse;
        })
        .catch(() => {
          console.warn('⚠️ [SW Mobile] Recurso offline no disponible:', request.url);
        });
    })
  );
});