const CACHE_NAME = 'task-planner-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  // 静态资源
  // 如有本地icon，放进来: './icon-192.png', './icon-512.png',
  // 你可根据实际情况添加更多静态资源
];

// 安装
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

// 激活
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// 抓取
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(
      response => response || fetch(event.request)
    )
  );
});