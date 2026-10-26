(function () {
  var LOG = 'https://script.google.com/macros/s/AKfycbz9Rqv1YNES0cz5jzyUqr5CuoFDgZFoVeqJHmA2M0rLqe7Cab8AEi4YDE3WkvE3a6UkQQ/exec';
  var FALLBACK = 'https://taikanmethod.com/';
  var q = new URLSearchParams(location.search);
  var id = q.get('l') || location.pathname.replace(/^\/go\/?/, '').replace(/\/$/, '').split('/').pop() || '';
  id = decodeURIComponent(id).trim();
  function go(url) { location.replace(url || FALLBACK); }
  if (!id || id === 'index.html' || id === '404.html') { go(FALLBACK); return; }
  try {
    var u = LOG + '?l=' + encodeURIComponent(id) + '&ref=' + encodeURIComponent(document.referrer || '') + '&ua=' + encodeURIComponent((navigator.userAgent || '').slice(0, 120));
    if (navigator.sendBeacon) navigator.sendBeacon(u); else fetch(u, { mode: 'no-cors', keepalive: true });
  } catch (e) {}
  fetch('/go/links.json', { cache: 'no-store' }).then(function (r) { return r.json(); })
    .then(function (m) { var t = m[id]; setTimeout(function () { go(t && t.url); }, 150); })
    .catch(function () { go(FALLBACK); });
})();
