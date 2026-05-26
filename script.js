/* ============================================================
   Wedding Invitation — vanilla JS
   Mirrors the original React behavior 1:1.
   ============================================================ */

// ----- Preloader -----
(function () {
  const el = document.getElementById('preloader');
  if (!el) return;
  setTimeout(() => el.classList.add('fading'), 1700);
  setTimeout(() => el.classList.add('hidden'), 2400);
})();

// ----- Audio Player -----
(function () {
  const audio  = document.getElementById('audio-player');
  const btn    = document.getElementById('play-toggle');
  const playI  = document.getElementById('play-icon');
  const pauseI = document.getElementById('pause-icon');
  const fill   = document.getElementById('seek-fill');
  const bar    = document.getElementById('seek-bar');
  const time   = document.getElementById('time-display');

  if (!audio || !btn) return;

  const fmt = (s) => {
    if (!isFinite(s) || s < 0) s = 0;
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  };

  const render = () => {
    const cur = audio.currentTime || 0;
    const dur = audio.duration || 0;
    fill.style.width = dur ? (cur / dur) * 100 + '%' : '0%';
    time.textContent = `${fmt(cur)} / ${fmt(dur)}`;
  };

  audio.addEventListener('timeupdate', render);
  audio.addEventListener('loadedmetadata', render);
  audio.addEventListener('ended', () => {
    playI.style.display = '';
    pauseI.style.display = 'none';
    btn.setAttribute('aria-label', 'Play message');
  });

  btn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play().then(() => {
        playI.style.display = 'none';
        pauseI.style.display = '';
        btn.setAttribute('aria-label', 'Pause message');
      }).catch(() => {});
    } else {
      audio.pause();
      playI.style.display = '';
      pauseI.style.display = 'none';
      btn.setAttribute('aria-label', 'Play message');
    }
  });

  bar.addEventListener('click', (e) => {
    if (!audio.duration) return;
    const rect = bar.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    audio.currentTime = Math.max(0, Math.min(1, ratio)) * audio.duration;
  });

  render();
})();

// ----- RSVP Modal -----
(function () {
  const modal = document.getElementById('rsvp-modal');
  const open  = document.getElementById('open-rsvp');
  const form  = document.getElementById('rsvp-form');
  const toast = document.getElementById('toast');

  if (!modal || !open || !form) return;

  const showModal = () => {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
  };
  const hideModal = () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  };

  open.addEventListener('click', showModal);

  modal.querySelectorAll('[data-close]').forEach((el) =>
    el.addEventListener('click', hideModal)
  );

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') hideModal();
  });

  const showToast = (msg) => {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    toast.setAttribute('aria-hidden', 'false');
    setTimeout(() => {
      toast.classList.remove('show');
      toast.setAttribute('aria-hidden', 'true');
    }, 3500);
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast("Thank you! We can't wait to celebrate with you 💛");
    form.reset();
    hideModal();
  });
})();
