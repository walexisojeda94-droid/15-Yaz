// Invitación de Rocío. Fecha confirmada: 19 de diciembre de 2026.
// Cuando tengas la canción, guardala como assets/musica.mp3.
const eventDate = new Date('2026-12-19T20:00:00-03:00');
const music = document.getElementById('backgroundMusic');
const musicToggle = document.getElementById('musicToggle');
const form = document.getElementById('rsvpForm');
const formNote = document.getElementById('formNote');

function updateCountdown() {
  const diff = Math.max(0, eventDate.getTime() - Date.now());
  const values = {
    days: Math.floor(diff / 86400000),
    hours: Math.floor(diff / 3600000) % 24,
    minutes: Math.floor(diff / 60000) % 60,
    seconds: Math.floor(diff / 1000) % 60
  };
  Object.entries(values).forEach(([id, value]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = id === 'days' ? String(value).padStart(3, '0') : String(value).padStart(2, '0');
  });
}
updateCountdown();
setInterval(updateCountdown, 1000);

musicToggle.addEventListener('click', async () => {
  if (music.paused) {
    try {
      await music.play();
      musicToggle.classList.add('playing');
      musicToggle.setAttribute('aria-label', 'Pausar música');
      musicToggle.querySelector('.music-label').textContent = 'Pausar';
    } catch (error) {
      musicToggle.querySelector('.music-label').textContent = 'Agregar canción';
      formNote.textContent = 'La música todavía no está cargada. Cuando elijas la canción, guardala como assets/musica.mp3.';
    }
  } else {
    music.pause();
    musicToggle.classList.remove('playing');
    musicToggle.setAttribute('aria-label', 'Reproducir música');
    musicToggle.querySelector('.music-label').textContent = 'Música';
  }
});

const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});
navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

form.addEventListener('submit', event => {
  event.preventDefault();
  // Cambiar por el WhatsApp de la familia antes de publicar.
  const WHATSAPP_NUMBER = '';
  const data = new FormData(form);
  const message = [
    'Hola, confirmo para los XV de Rocío Yazmin Ojeda Goffi.',
    `Nombre: ${data.get('guestName')}`,
    `Cantidad: ${data.get('guestCount')}`,
    `Asistencia: ${data.get('attendance')}`,
    data.get('guestMessage') ? `Mensaje: ${data.get('guestMessage')}` : ''
  ].filter(Boolean).join('\\n');
  if (!WHATSAPP_NUMBER) {
    formNote.textContent = 'Formulario de prueba: cuando definamos el WhatsApp, se habilitará el envío real de la confirmación.';
    return;
  }
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
});
