// Public contact details are rendered by scripts/build.mjs from .env.
(() => {
  const button = document.getElementById('download');
  if (!button) return;
  button.addEventListener('click', () => {
    const storeUrl = ''; // Add the published Play Store URL here.
    if (storeUrl) { window.open(storeUrl, '_blank', 'noopener,noreferrer'); return; }
    let toast = document.querySelector('.toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      toast.setAttribute('role', 'status');
      toast.setAttribute('aria-live', 'polite');
      document.body.appendChild(toast);
    }
    toast.textContent = '보카월드는 출시 준비 중이에요. 스토어 등록 후 다운로드가 열립니다.';
    toast.classList.add('show');
    clearTimeout(window.__toastHide);
    window.__toastHide = setTimeout(() => toast.classList.remove('show'), 3500);
  });
})();
