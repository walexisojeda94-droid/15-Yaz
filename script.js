(() => {
  'use strict';
  const WHATSAPP_NUMBER = ''; // Completar: código de país + área, solo números. Ej: 54911XXXXXXXX
  const eventDate = new Date('2026-12-19T00:00:00-03:00');
  const $ = (id) => document.getElementById(id);

  // Cuenta regresiva
  const tick = () => {
    const d = Math.max(0, eventDate - Date.now());
    const v = { days: Math.floor(d / 864e5), hours: Math.floor(d / 36e5) % 24, minutes: Math.floor(d / 6e4) % 60, seconds: Math.floor(d / 1e3) % 60 };
    for (const k in v) $(k).textContent = k === 'days' ? v[k] : String(v[k]).padStart(2, '0');
  };
  tick(); setInterval(tick, 1000);

  // Menú
  const menu = $('menu'), mb = $('menuBtn');
  mb.onclick = () => mb.setAttribute('aria-expanded', menu.classList.toggle('open'));
  menu.querySelectorAll('a').forEach(a => a.onclick = () => { menu.classList.remove('open'); mb.setAttribute('aria-expanded', 'false'); });

  // Música
  const audio = $('bgMusic'), fab = $('musicToggle');
  fab.onclick = async () => {
    if (audio.paused) {
      try { await audio.play(); fab.classList.add('playing'); fab.setAttribute('aria-label', 'Pausar música'); }
      catch { alert('Falta agregar el archivo assets/musica.mp3'); }
    } else { audio.pause(); fab.classList.remove('playing'); fab.setAttribute('aria-label', 'Reproducir música'); }
  };

  // Linternas y flores decorativas
  const rnd = (a, b) => a + Math.random() * (b - a);
  document.querySelectorAll('[data-sky]').forEach(s => {
    for (let i = 0; i < +s.dataset.sky; i++) {
      const l = document.createElement('span'); l.className = 'ln';
      l.style.cssText = `left:${rnd(2, 96)}%;top:${rnd(2, 80)}%;transform:scale(${rnd(.5, 1.3)});animation-delay:${rnd(0, 5)}s`;
      s.prepend(l);
    }
  });
  document.querySelectorAll('section').forEach(s => {
    [['-18px', '-14px', 80, 'auto', 'auto'], ['auto', '-22px', 64, '-14px', 'auto'], ['-26px', 'auto', 70, 'auto', '-10px']].forEach(([b, r, w, l, t], i) => {
      if (i === 0) return;
      const f = document.createElement('span'); f.className = 'fl';
      f.style.cssText = `width:${w}px;height:${w}px;${i === 1 ? 'bottom:-14px;left:-14px' : 'bottom:-18px;right:-14px'};transform:rotate(${i * 30}deg)`;
      f.innerHTML = '<svg><use href="#fl"/></svg>'; s.append(f);
    });
  });

  // Galería
  const stack = $('stack');
  $('next').onclick = () => stack.append(stack.firstElementChild);
  $('prev').onclick = () => stack.prepend(stack.lastElementChild);

  // Agregar al calendario (día completo; el horario está a confirmar)
  $('calBtn').href = 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=' +
    encodeURIComponent('XV Años de Rocío Yazmin Ojeda Goffi') + '&dates=20261219/20261220';

  const wa = (msg) => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');

  // RSVP
  $('rsvpForm').onsubmit = (e) => {
    e.preventDefault();
    const d = new FormData(e.target);
    const msg = ['Hola, confirmo para los XV de Rocío Yazmin Ojeda Goffi.', `Nombre: ${d.get('guestName')}`, `Cantidad: ${d.get('guestCount')}`, `Asistencia: ${d.get('attendance')}`, d.get('guestMessage') ? `Mensaje: ${d.get('guestMessage')}` : ''].filter(Boolean).join('\n');
    if (!WHATSAPP_NUMBER) { $('formNote').textContent = 'Falta configurar el número de WhatsApp en script.js.'; return; }
    wa(msg);
  };

  // Modal de canciones
  const modal = $('songModal');
  const close = () => { modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true'); };
  document.querySelectorAll('[data-song]').forEach(b => b.onclick = () => { modal.classList.add('open'); modal.setAttribute('aria-hidden', 'false'); $('songName').focus(); });
  $('songClose').onclick = close;
  modal.onclick = (e) => { if (e.target === modal) close(); };
  document.onkeydown = (e) => { if (e.key === 'Escape') close(); };
  $('songForm').onsubmit = (e) => {
    e.preventDefault();
    const s = $('songName').value.trim();
    if (!WHATSAPP_NUMBER) { $('songNote').textContent = 'Falta configurar el número de WhatsApp en script.js.'; return; }
    wa(`Hola, quiero sugerir una canción para los XV de Rocío: ${s}`); close();
  };
})();
