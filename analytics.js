(() => {
  'use strict';
  const counter = document.getElementById('pvCount');
  if (!counter || window.certificateHealthPVRequested) return;
  window.certificateHealthPVRequested = true;
  // Historical PV supplied by the site owner before changing providers.
  const historicalPV = 12000;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12000);
  // Count this project page only. Omit URL parameters, fragments and referrers.
  fetch('https://bsz.iirose.cn/api', {
    method: 'POST',
    headers: { 'x-bsz-referer': new URL('./', window.location.href).href },
    credentials: 'omit',
    referrerPolicy: 'no-referrer',
    signal: controller.signal
  })
    .then(response => {
      if (!response.ok) throw new Error('PV service unavailable');
      return response.json();
    })
    .then(result => {
      const value = Number(result.data?.page_pv);
      if (result.success !== true || !Number.isSafeInteger(value) || value < 1) {
        throw new Error('Invalid PV response');
      }
      const total = historicalPV + value;
      if (!Number.isSafeInteger(total)) throw new Error('Invalid total PV');
      counter.textContent = total.toLocaleString('zh-CN');
    })
    .catch(() => { counter.textContent = '暂不可用'; })
    .finally(() => clearTimeout(timer));
})();
