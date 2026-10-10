// Invitación de Rocío Yazmin Ojeda Goffi
// Fecha confirmada: 19 de diciembre de 2026.
// Para habilitar los envíos, completar WHATSAPP_NUMBER con código de país y área,
// solo números, sin +, espacios ni guiones. Ejemplo: 54911XXXXXXXX.

(() => {
  'use strict';

  const WHATSAPP_NUMBER = ''; // Completar antes de publicar.
  const eventDate = new Date('2026-12-19T20:00:00-03:00');

  const byId = (id) => document.getElementById(id);
  const music = byId('backgroundMusic');
  const musicToggle = byId('musicToggle');
  const form = byId('rsvpForm');
  const formNote = byId('formNote');
  const menuToggle = byId('menuToggle');
  const navLinks = byId('navLinks');

  function updateCountdown() {
    const diff = Math.max(0, eventDate.getTime() - Date.now());
    const values = {
      days: Math.floor(diff / 86400000),
      hours: Math.floor(diff / 3600000) % 24,
      minutes: Math.floor(diff / 60000) % 60,
      seconds: Math.floor(diff / 1000) % 60
    };

    Object.entries(values).forEach(([id, value]) => {
      const element = byId(id);
      if (element) {
        element.textContent = id === 'days'
          ? String(value)
          : String(value).padStart(2, '0');
      }
    });
  }

  updateCountdown();
  window.setInterval(updateCountdown, 1000);

  // Música: si todavía no se agregó assets/musica.mp3, se informa sin romper la página.
  if (musicToggle && music) {
    musicToggle.addEventListener('click', async () => {
      const label = musicToggle.querySelector('.music-label');
      if (music.paused) {
        try {
          await music.play();
          musicToggle.classList.add('playing');
          musicToggle.setAttribute('aria-label', 'Pausar música');
          if (label) label.textContent = 'Pausar';
        } catch (error) {
          if (label) label.textContent = 'Agregar canción';
          if (formNote) {
            formNote.textContent = 'La música todavía no está cargada. Agregá el archivo assets/musica.mp3 cuando elijas la canción.';
          }
        }
      } else {
        music.pause();
        musicToggle.classList.remove('playing');
        musicToggle.setAttribute('aria-label', 'Reproducir música');
        if (label) label.textContent = 'Música';
      }
    });
  }

  // Menú adaptable para celulares.
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Confirmación de asistencia.
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const message = [
        'Hola, confirmo para los XV de Rocío Yazmin Ojeda Goffi.',
        `Nombre: ${data.get('guestName') || ''}`,
        `Cantidad: ${data.get('guestCount') || ''}`,
        `Asistencia: ${data.get('attendance') || ''}`,
        data.get('guestMessage') ? `Mensaje: ${data.get('guestMessage')}` : ''
      ].filter(Boolean).join('\n');

      if (!WHATSAPP_NUMBER) {
        if (formNote) {
          formNote.textContent = 'Formulario de prueba: falta configurar el WhatsApp de la familia para enviar la confirmación.';
        }
        return;
      }

      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
        '_blank',
        'noopener,noreferrer'
      );
    });
  }

  // Modal flotante para sugerir canciones.
  const songModal = byId('songModal');
  const songOpen = byId('songSuggestOpen');
  const songClose = byId('songSuggestClose');
  const songForm = byId('songForm');
  const songNote = byId('songNote');
  const songName = byId('songName');

  function closeSongModal() {
    if (!songModal) return;
    songModal.classList.remove('open');
    songModal.setAttribute('aria-hidden', 'true');
  }

  if (songModal && songOpen && songClose && songForm && songName) {
    songOpen.addEventListener('click', () => {
      songModal.classList.add('open');
      songModal.setAttribute('aria-hidden', 'false');
      songName.focus();
    });

    songClose.addEventListener('click', closeSongModal);

    songModal.addEventListener('click', (event) => {
      if (event.target === songModal) closeSongModal();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeSongModal();
    });

    songForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const suggestion = songName.value.trim();
      if (!suggestion) {
        if (songNote) songNote.textContent = 'Escribí el nombre de una canción antes de enviarla.';
        songName.focus();
        return;
      }

      if (!WHATSAPP_NUMBER) {
        if (songNote) {
          songNote.textContent = `Sugerencia de prueba: “${suggestion}”. Falta configurar el WhatsApp de la familia para enviarla.`;
        }
        return;
      }

      const message = `Hola, quiero sugerir una canción para los XV de Rocío: ${suggestion}`;
      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
        '_blank',
        'noopener,noreferrer'
      );
      closeSongModal();
    });
  }
})();
