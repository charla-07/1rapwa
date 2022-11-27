var cacheName = 'appV1';
var contenidoCache = [
    'index.html',
    'galeria.html',
    'nosotros.html',
    'app.js',
    'sw.js',
    'manifest.webmanifest',
    'css/bootstrap.min.css',
    'js/bootstrap.js',
    'js/bootstrap.bundle.js',
];

self.addEventListener('install', (e) =>{
    console.log("instalado");
    e.waitUntil((async() => {
        const cache = await caches.open(cacheName);
        await cache.addAll(contenidoCache);
    })());
});

self.addEventListener('fetch', (e) => {
    e.respondWith((async()=>{
        const r = await caches.match(e.request);
        if (r) return r;
        console.log(r);
        const response = await fetch(e.request);
        const cache = await caches.open(cacheName);
        cache.put(e.request, response.clone());

        return response;
    })());
});