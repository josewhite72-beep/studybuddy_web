/* ============================================================
   StudyBuddy English — Service Worker
   Versiona el caché para forzar actualización automática
   ============================================================ */

const CACHE_VERSION = 'sb-v2'
const CACHE_NAME = `studybuddy-${CACHE_VERSION}`

const PRECACHE_URLS = [
  './',
  './index.html',
  './manifest.json',
  './pre_k.json',
  './K.json',
  './1.json',
  './2.json',
  './3.json',
  './4.json',
  './5.json',
  './6.json',
  './7.json',
  './8.json',
  './9.json',
  './10.json',
  './11.json',
  './12.json',
]

/* ── INSTALL: cache all resources ───────────────────────────── */
self.addEventListener('install', event => {
  console.log(`[SW] Installing ${CACHE_NAME}`)
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())  // activate immediately
  )
})

/* ── ACTIVATE: delete old caches ────────────────────────────── */
self.addEventListener('activate', event => {
  console.log(`[SW] Activating ${CACHE_NAME}`)
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key.startsWith('studybuddy-') && key !== CACHE_NAME)
          .map(key => {
            console.log(`[SW] Deleting old cache: ${key}`)
            return caches.delete(key)
          })
      )
    ).then(() => self.clients.claim())  // take control immediately
  )
})

/* ── FETCH: network first for HTML, cache first for assets ──── */
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url)

  // Always fetch index.html from network (never serve stale)
  if (url.pathname.endsWith('index.html') || url.pathname.endsWith('/')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Update cache with fresh copy
          const clone = response.clone()
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone))
          return response
        })
        .catch(() => caches.match('./index.html'))
    )
    return
  }

  // JSON files: network first, fallback to cache
  if (url.pathname.endsWith('.json')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const clone = response.clone()
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone))
          return response
        })
        .catch(() => caches.match(event.request))
    )
    return
  }

  // Everything else: cache first
  event.respondWith(
    caches.match(event.request)
      .then(cached => cached || fetch(event.request))
  )
})

/* ── MESSAGE: force update from app ─────────────────────────── */
self.addEventListener('message', event => {
  if (event.data === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})
