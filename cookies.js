// mirloapps.es - cookie consent: Analytics loads only after acceptance
(function () {
  var KEY = 'mirlo_cookie_consent'; // 'accepted' | 'rejected'
  var GA_ID = 'G-Y6KBEYNZEV';

  var ES = (document.documentElement.lang || 'en').toLowerCase().indexOf('es') === 0;
  var T = ES ? {
    msg: 'Usamos cookies de análisis (Google Analytics) para entender cómo se usa la web. Puedes aceptar o rechazar; tu elección se recuerda y puedes cambiarla cuando quieras desde el enlace "Cookies" del pie.',
    more: 'Más información',
    accept: 'Aceptar',
    reject: 'Rechazar'
  } : {
    msg: 'We use analytics cookies (Google Analytics) to understand how the site is used. You can accept or reject; your choice is remembered and you can change it anytime from the "Cookies" link in the footer.',
    more: 'Learn more',
    accept: 'Accept',
    reject: 'Reject'
  };

  function loadAnalytics() {
    if (document.getElementById('mirlo-ga')) return;
    var s = document.createElement('script');
    s.id = 'mirlo-ga';
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA_ID);
  }

  function removeBanner() {
    var b = document.getElementById('mirlo-cookie-banner');
    if (b) b.remove();
  }

  function choose(value) {
    try { localStorage.setItem(KEY, value); } catch (e) {}
    removeBanner();
    if (value === 'accepted') loadAnalytics();
  }

  function showBanner() {
    if (document.getElementById('mirlo-cookie-banner')) return;
    var b = document.createElement('div');
    b.id = 'mirlo-cookie-banner';
    b.setAttribute('role', 'dialog');
    b.className = 'fixed bottom-0 inset-x-0 z-50 p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg';
    b.innerHTML =
      '<div class="max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-4 text-sm text-gray-700 dark:text-gray-300">' +
        '<p class="flex-1">' + T.msg + ' <a href="/privacidad.html#cookies" class="underline">' + T.more + '</a>.</p>' +
        '<div class="flex gap-3 shrink-0">' +
          '<button id="mirlo-cookie-reject" class="px-4 py-2 rounded-lg border border-gray-400 dark:border-gray-500 text-gray-700 dark:text-gray-200 font-medium">' + T.reject + '</button>' +
          '<button id="mirlo-cookie-accept" class="px-4 py-2 rounded-lg border border-mirlo-orange bg-mirlo-orange text-white font-medium">' + T.accept + '</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(b);
    document.getElementById('mirlo-cookie-accept').addEventListener('click', function () { choose('accepted'); });
    document.getElementById('mirlo-cookie-reject').addEventListener('click', function () { choose('rejected'); });
  }

  window.mirloCookiePrefs = showBanner;

  document.addEventListener('DOMContentLoaded', function () {
    var v = null;
    try { v = localStorage.getItem(KEY); } catch (e) {}
    if (v === 'accepted') loadAnalytics();
    else if (v === null) showBanner();
  });
})();
