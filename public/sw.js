// public/sw.js - INDUSYNC PWA Service Worker (Offline Complete Engine)
const CACHE_NAME = 'indusync-v3-offline-complete';

// Instalación inmediata del Service Worker
self.addEventListener('install', (event) => {
  console.log('⚙️ [SW] Instalando Service Worker INDUSYNC...');
  self.skipWaiting();
});

// Limpieza de cachés antiguas y activación inmediata
self.addEventListener('activate', (event) => {
  console.log('⚡ [SW] Activando Service Worker INDUSYNC...');
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('🧹 [SW] Borrando caché obsoleta:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Interceptor de peticiones de Red y Caché
self.addEventListener('fetch', (event) => {
  const request = event.request;

  // Ignorar peticiones que no sean GET (ej. POST de datos a Supabase)
  if (request.method !== 'GET') return;

  // Ignorar peticiones directas a Supabase (manejadas por el motor offlineStore)
  if (request.url.includes('supabase.co') || request.url.includes('/rest/v1/')) {
    return;
  }

  // 1. MANEJO DE NAVEGACIÓN DE PÁGINAS (HTML)
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put('/index.html', responseClone));
          }
          return networkResponse;
        })
        .catch(() => {
          // Si estamos en Modo Avión / Subterráneo, entregar index.html guardado
          console.log('📡 [SW Offline] Sirviendo App Shell desde Caché');
          return caches.match('/index.html') || caches.match('/');
        })
    );
    return;
  }

  // 2. MANEJO DE ASSETS (JS, CSS, Imágenes, Fuentes, Íconos)
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      // Si el archivo ya está en el caché local, entregarlo de inmediato (Ultra rápido)
      if (cachedResponse) {
        // En segundo plano intentamos actualizar la versión en caché si hay internet
        fetch(request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then((cache) => cache.put(request, networkResponse));
          }
        }).catch(() => {/* Sin red, continuar usando el caché */});

        return cachedResponse;
      }

      // Si el recurso no está en caché, descargarlo de la red y GUARDARLO para la próxima
      return fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, responseToCache));
          }
          return networkResponse;
        })
        .catch(() => {
          console.warn('⚠️ [SW] Recurso no disponible offline:', request.url);
        });
    })
  );
});