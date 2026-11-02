// public/sw.js - INDUSYNC Service Worker Ultra-Resiliente (Android / iOS / PC)
const CACHE_NAME = 'indusync-v9-clean';

const CORE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.svg'
];

// 1. INSTALACIÓN: Precarga del App Shell
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      for (const asset of CORE_ASSETS) {
        try {
          await cache.add(asset);
        } catch (err) {
          console.warn('⚠️ [SW] No se pudo precachear:', asset);
        }
      }
    })
  );
});

// 2. ACTIVACIÓN: Control inmediato de la app instalada en el celular
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => key !== CACHE_NAME && caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// 3. INTERCEPTOR DE RED (Garantiza respuesta SIEMPRE a Chrome Android)
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = request.url;

  // 🛡️ BLINDAJE CRÍTICO: Ignorar esquemas que no sean HTTP/HTTPS (como chrome-extension://)
  if (!url.startsWith('http')) {
    return;
  }

  // Omitir peticiones que no sean GET o que vayan a Supabase DB
  if (request.method !== 'GET' || url.includes('supabase.co')) {
    return;
  }

  // A) MANEJO DE NAVEGACIÓN (Abrir la app desde el icono en Android)
  if (request.mode === 'navigate' || request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      (async () => {
        try {
          const networkResponse = await fetch(request);
          if (networkResponse && networkResponse.status === 200) {
            const cache = await caches.open(CACHE_NAME);
            cache.put('/', networkResponse.clone());
            cache.put('/index.html', networkResponse.clone());
            return networkResponse;
          }
        } catch (error) {
          console.log('📡 [SW Offline Android] Cargando desde memoria del celular...');
        }

        const cache = await caches.open(CACHE_NAME);
        const cachedIndex = (await cache.match('/index.html')) || (await cache.match('/')) || (await cache.match(request));

        if (cachedIndex) {
          return cachedIndex;
        }

        return new Response('<html><body style="background:#090d16;color:#fff;font-family:sans-serif;padding:20px;text-align:center;"><h2>INDUSYNC Meta-OS</h2><p>Por favor abre la app 1 vez con internet para inicializar el almacenamiento offline.</p></body></html>', {
          headers: { 'Content-Type': 'text/html' }
        });
      })()
    );
    return;
  }

  // B) MANEJO DE RECURSOS (JavaScript, CSS, Imágenes)
  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      const cachedResponse = await cache.match(request);

      if (cachedResponse) {
        fetch(request).then((netRes) => {
          if (netRes && netRes.status === 200) {
            cache.put(request, netRes);
          }
        }).catch(() => {});
        return cachedResponse;
      }

      try {
        const networkResponse = await fetch(request);
        if (networkResponse && networkResponse.status === 200) {
          cache.put(request, networkResponse.clone());
        }
        return networkResponse;
      } catch (err) {
        return new Response('', { status: 200, statusText: 'OK (Offline Fallback)' });
      }
    })()
  );
});