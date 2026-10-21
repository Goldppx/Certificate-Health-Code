(() => {
  'use strict';
  const counter = document.getElementById('pvCount');
  if (!counter || window.certificateHealthPVRequested) return;
  window.certificateHealthPVRequested = true;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  // Use one canonical project URL; omit query strings, fragments and referrers.
  fetch('https://cdn.busuanzi.cc/api.php', {
    method: 'POST',
    body: JSON.stringify({
      url: new URL('./', window.location.href).href,
      referrer: ''
    }),
    credentials: 'omit',
    referrerPolicy: 'no-referrer',
    signal: controller.signal
  })
    .then(response => {
      if (!response.ok) throw new Error('PV service unavailable');
      return response.json();
    })
    .then(data => {
      const value = Number(data.busuanzi_page_pv);
      if (!Number.isSafeInteger(value) || value < 1) throw new Error('Invalid PV');
      counter.textContent = value.toLocaleString('zh-CN');
    })
    .catch(() => { counter.textContent = '暂不可用'; })
    .finally(() => clearTimeout(timer));
})();
