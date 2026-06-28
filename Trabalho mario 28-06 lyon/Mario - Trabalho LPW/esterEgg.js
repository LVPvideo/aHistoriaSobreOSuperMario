// Ester egg simples (Konami Code)
// Digite: ↑ ↑ ↓ ↓ ← → ← → B A

(function () {
  const KONAMI = [
    'ArrowUp',
    'ArrowUp',
    'ArrowDown',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ArrowLeft',
    'ArrowRight',
    'b',
    'a',
  ];

  let idx = 0;
  let triggered = false;

  function ensureOverlay() {
    let overlay = document.getElementById('egg-overlay');
    if (overlay) return overlay;

    overlay = document.createElement('div');
    overlay.id = 'egg-overlay';
    overlay.style.position = 'fixed';
    overlay.style.inset = '0';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.background = 'rgba(0,0,0,0.55)';
    overlay.style.zIndex = '9999';
    overlay.style.pointerEvents = 'none';

    const box = document.createElement('div');
    box.style.textAlign = 'center';
    box.style.padding = '22px 26px';
    box.style.background = 'rgba(255, 255, 255, 0.12)';
    box.style.border = '2px solid rgba(255, 255, 255, 0.35)';
    box.style.borderRadius = '14px';
    box.style.backdropFilter = 'blur(6px)';

    const title = document.createElement('div');
    title.style.fontFamily = '"Press Start 2P", monospace';
    title.style.color = '#fff';
    title.style.fontSize = '16px';
    title.style.marginBottom = '12px';
    title.textContent = '🎉 SEGREDO DESBLOQUEADO!';

    const sub = document.createElement('div');
    sub.style.fontFamily = '"Comic Neue", monospace';
    sub.style.color = '#fff';
    sub.style.fontSize = '13px';
    sub.style.opacity = '0.95';
    sub.textContent = 'It\'s-a me... Mario!';

    box.appendChild(title);
    box.appendChild(sub);
    overlay.appendChild(box);

    document.body.appendChild(overlay);
    return overlay;
  }

  function playAudio() {
    // Tenta tocar um dos áudios já existentes (se existir na pasta).
    const audioSrcs = [
      '../Áudios/it-s-me-mario.mp3',
      '../Áudios/thank-you-mario.mp3',
    ];

    for (const src of audioSrcs) {
      const a = new Audio(src);
      a.volume = 0.9;
      a.play().catch(() => {});
      return;
    }
  }

  function triggerEgg() {
    if (triggered) return;
    triggered = true;

    const overlay = ensureOverlay();

    try {
      overlay.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 220,
        easing: 'ease-out',
      });
    } catch (_) {}

    playAudio();

    setTimeout(() => {
      const o = document.getElementById('egg-overlay');
      if (o) o.remove();
    }, 4200);
  }

  function normalizeKey(e) {
    if (!e || !e.key) return '';
    const k = e.key;
    if (
      k === 'ArrowUp' ||
      k === 'ArrowDown' ||
      k === 'ArrowLeft' ||
      k === 'ArrowRight'
    ) {
      return k;
    }
    if (k.length === 1) return k.toLowerCase();
    return k;
  }

  window.addEventListener('keydown', (e) => {
    const key = normalizeKey(e);
    if (!key) return;

    const expected = KONAMI[idx];

    if (key === expected) {
      idx++;
      if (idx === KONAMI.length) {
        triggerEgg();
        idx = 0;
      }
    } else {
      idx = key === KONAMI[0] ? 1 : 0;
    }
  });
})();

