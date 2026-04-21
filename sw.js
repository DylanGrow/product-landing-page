
const CACHE='grow-v1';
const ASSETS=['/','/index.html','/services.html','/contact.html','/style.css','/script.js','/img/hero-800.webp','/icons/icon-192.png','/icons/icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))) )});
self.addEventListener('fetch',e=>{const url=new URL(e.request.url);if(e.request.mode==='navigate'){e.respondWith(fetch(e.request).catch(()=>caches.match('/index.html')));return} e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{if(e.request.method==='GET'&&url.origin===location.origin){caches.open(CACHE).then(c=>c.put(e.request,res.clone()))}return res})))});
