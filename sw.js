/* Service worker do Long Shadow CSS Generator.
   Estratégia: app shell em cache (offline) + fontes do Google em
   stale-while-revalidate. Ao publicar mudanças, troque VERSAO. */
const VERSAO = 'v1.0.0';
const CACHE_APP = 'long-shadow-app-' + VERSAO;
const CACHE_FONTES = 'long-shadow-fontes';

const SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './fotoever.jpeg',
  './icones/icon-192.png',
  './icones/icon-512.png',
  './icones/icon-maskable-512.png',
  './icones/apple-touch-icon-180.png',
  './icones/favicon-32.png'
];

self.addEventListener('install', (evento) => {
  evento.waitUntil(
    caches.open(CACHE_APP)
      .then((cache) => cache.addAll(SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (evento) => {
  evento.waitUntil(
    caches.keys()
      .then((chaves) => Promise.all(
        chaves
          .filter((chave) => chave !== CACHE_APP && chave !== CACHE_FONTES)
          .map((chave) => caches.delete(chave))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (evento) => {
  const requisicao = evento.request;
  if (requisicao.method !== 'GET') return;

  const url = new URL(requisicao.url);

  // Fontes do Google: serve do cache e atualiza em segundo plano
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    evento.respondWith(
      caches.open(CACHE_FONTES).then(async (cache) => {
        const emCache = await cache.match(requisicao);
        const daRede = fetch(requisicao).then((resposta) => {
          if (resposta.ok || resposta.type === 'opaque') cache.put(requisicao, resposta.clone());
          return resposta;
        });
        return emCache || daRede;
      })
    );
    return;
  }

  // O resto só interessa se for do próprio app
  if (url.origin !== self.location.origin) return;

  // Navegação: rede primeiro, cache como reserva offline
  if (requisicao.mode === 'navigate') {
    evento.respondWith(
      fetch(requisicao)
        .then((resposta) => {
          const copia = resposta.clone();
          caches.open(CACHE_APP).then((cache) => cache.put('./index.html', copia));
          return resposta;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  // Arquivos estáticos: cache primeiro
  evento.respondWith(
    caches.match(requisicao).then((emCache) => emCache || fetch(requisicao).then((resposta) => {
      if (resposta.ok) {
        const copia = resposta.clone();
        caches.open(CACHE_APP).then((cache) => cache.put(requisicao, copia));
      }
      return resposta;
    }))
  );
});
