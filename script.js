/* ==========================================================
   INTERACTIVIDAD Y MAGIA PARA LA WEB DE LAURA ✨
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // 1. PARTICULAS Y CORAZONCITOS EN EL CURSOR
  const sparkleContainer = document.getElementById('sparkle-container');
  const symbols = ['🌸', '✨', '💖', '🎀', '⭐', '🍓'];
  let lastParticleTime = 0;

  window.addEventListener('mousemove', (e) => {
    const now = Date.now();
    // Limitar la frecuencia para que sea suave y no sobrecargue
    if (now - lastParticleTime > 90) {
      lastParticleTime = now;
      createCursorParticle(e.clientX, e.clientY);
    }
  });

  function createCursorParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'floating-particle';
    particle.innerText = symbols[Math.floor(Math.random() * symbols.length)];
    particle.style.left = `${x - 10 + (Math.random() * 20 - 10)}px`;
    particle.style.top = `${y - 10 + (Math.random() * 20 - 10)}px`;
    sparkleContainer.appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, 1800);
  }

  // 2. BOTÓN DE EXPLOSIÓN DE AMOR (CONFETTI ROSA)
  const magicHeartBtn = document.getElementById('magicHeartBtn');
  if (magicHeartBtn) {
    magicHeartBtn.addEventListener('click', (e) => {
      triggerHeartExplosion(e.clientX, e.clientY);
    });
  }

  function triggerHeartExplosion(x, y) {
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { 
          x: x ? x / window.innerWidth : 0.5, 
          y: y ? y / window.innerHeight : 0.5 
        },
        colors: ['#f43f68', '#f8718e', '#fea3b4', '#ffe4e9', '#ffffff'],
        shapes: ['circle']
      });
    }
  }

  // 3. MENÚ MÓVIL
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (navLinks.classList.contains('active')) {
        icon.className = 'fa-solid fa-xmark';
      } else {
        icon.className = 'fa-solid fa-bars-staggered';
      }
    });

    // Cerrar al dar click en un enlace
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars-staggered';
      });
    });
  }

  // 4. DESTACAR LINK ACTIVO SEGÚN EL SCROLL
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-item');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      const secTop = sec.offsetTop - 120;
      const secHeight = sec.clientHeight;
      if (window.scrollY >= secTop && window.scrollY < secTop + secHeight) {
        current = sec.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${current}`) {
        item.classList.add('active');
      }
    });
  });

  // 5. REPRODUCTOR DE MÚSICA SIMULADO / INTERACTIVO
  const tracks = [
    { title: "El Final del Cuento 🪗💖", artist: "Luifer Cuello · Favorita de Laura", duration: "3:30" },
    { title: "30 Mil Pies ✈️✨", artist: "Blessd · Laura's Hits", duration: "2:45" },
    { title: "Sunny Pool Days 🌴", artist: "Tierra Caliente Acoustic", duration: "2:56" },
    { title: "Stranger Whispers 👻", artist: "Midnight Terror Soundtrack", duration: "3:22" }
  ];

  let currentTrackIdx = 0;
  let isPlaying = false;
  let progressInterval = null;
  let progressSeconds = 84; // 1:24

  const playBtn = document.getElementById('playBtn');
  const playIcon = document.getElementById('playIcon');
  const prevTrackBtn = document.getElementById('prevTrackBtn');
  const nextTrackBtn = document.getElementById('nextTrackBtn');
  const songTitle = document.getElementById('songTitle');
  const songArtist = document.getElementById('songArtist');
  const progressFill = document.getElementById('progressFill');
  const currentTimeEl = document.getElementById('currentTime');
  const musicWidget = document.querySelector('.music-player-widget');
  const trackItems = document.querySelectorAll('.track-item');

  function updateTrackUI() {
    const track = tracks[currentTrackIdx];
    if (songTitle) songTitle.textContent = track.title;
    if (songArtist) songArtist.textContent = track.artist;

    trackItems.forEach((item, idx) => {
      if (idx === currentTrackIdx) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  function togglePlay() {
    isPlaying = !isPlaying;
    if (isPlaying) {
      playIcon.className = 'fa-solid fa-pause';
      musicWidget.classList.add('playing');
      startProgressTimer();
    } else {
      playIcon.className = 'fa-solid fa-play';
      musicWidget.classList.remove('playing');
      clearInterval(progressInterval);
    }
  }

  function formatTime(totalSec) {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  }

  function startProgressTimer() {
    clearInterval(progressInterval);
    progressInterval = setInterval(() => {
      progressSeconds++;
      if (progressSeconds > 225) progressSeconds = 0;
      currentTimeEl.textContent = formatTime(progressSeconds);
      const percent = (progressSeconds / 225) * 100;
      progressFill.style.width = `${percent}%`;
    }, 1000);
  }

  if (playBtn) playBtn.addEventListener('click', togglePlay);

  if (prevTrackBtn) {
    prevTrackBtn.addEventListener('click', () => {
      currentTrackIdx = (currentTrackIdx - 1 + tracks.length) % tracks.length;
      progressSeconds = 0;
      updateTrackUI();
      if (!isPlaying) togglePlay();
    });
  }

  if (nextTrackBtn) {
    nextTrackBtn.addEventListener('click', () => {
      currentTrackIdx = (currentTrackIdx + 1) % tracks.length;
      progressSeconds = 0;
      updateTrackUI();
      if (!isPlaying) togglePlay();
    });
  }

  trackItems.forEach((item, idx) => {
    item.addEventListener('click', () => {
      currentTrackIdx = idx;
      progressSeconds = 0;
      updateTrackUI();
      if (!isPlaying) togglePlay();
    });
  });

  // 6. MINIJUEGO: TEST ¿QUÉ TANTO COINCIDIMOS?
  const quizQuestions = [
    {
      question: "¿Cuál es tu clima ideal para un viaje perfecto?",
      options: [
        { text: "☀️ Tierra caliente, sol radiante y piscina", score: 25 },
        { text: "❄️ Frío de montaña con chocolate caliente", score: 10 },
        { text: "🌧️ Días lluviosos para quedarse en cama", score: 15 }
      ]
    },
    {
      question: "¿Qué tipo de golosina o antojo prefieres?",
      options: [
        { text: "🍋 Gomitas ácidas, limón con sal o frutas ácidas", score: 25 },
        { text: "🍫 Mucho chocolate dulce y arequipe", score: 12 },
        { text: "🍿 Palomitas saladas de cine", score: 15 }
      ]
    },
    {
      question: "Plan de noche de series en Netflix... ¿Qué género escoges?",
      options: [
        { text: "👻 Series de terror espeluznante, casas embrujadas y suspenso", score: 25 },
        { text: "🎭 Comedias románticas ligeras", score: 15 },
        { text: "🚀 Acción o documentales", score: 10 }
      ]
    },
    {
      question: "¿Cómo reaccionas cuando ves a un perrito o gatito?",
      options: [
        { text: "🐾 ¡Me derrito de amor y voy a consentirlo de inmediato!", score: 25 },
        { text: "👀 Lo miro con ternura desde lejitos", score: 15 },
        { text: "🤷 No soy muy de mascotas", score: 5 }
      ]
    }
  ];

  let currentQuizStep = 0;
  let totalScore = 0;

  const questionCard = document.getElementById('questionCard');
  const quizResultCard = document.getElementById('quizResultCard');
  const quizStepEl = document.getElementById('quizStep');
  const quizQuestionEl = document.getElementById('quizQuestion');
  const quizOptionsEl = document.getElementById('quizOptions');
  const percentageNumber = document.getElementById('percentageNumber');
  const resultTitle = document.getElementById('resultTitle');
  const resultDesc = document.getElementById('resultDesc');
  const restartQuizBtn = document.getElementById('restartQuizBtn');

  function renderQuizQuestion() {
    if (!quizQuestionEl || !quizOptionsEl) return;
    const currentQ = quizQuestions[currentQuizStep];
    quizStepEl.textContent = `Pregunta ${currentQuizStep + 1} de ${quizQuestions.length}`;
    quizQuestionEl.textContent = currentQ.question;
    quizOptionsEl.innerHTML = '';

    currentQ.options.forEach((opt) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-opt-btn';
      btn.textContent = opt.text;
      btn.addEventListener('click', () => {
        totalScore += opt.score;
        currentQuizStep++;
        if (currentQuizStep < quizQuestions.length) {
          renderQuizQuestion();
        } else {
          showQuizResults();
        }
      });
      quizOptionsEl.appendChild(btn);
    });
  }

  function showQuizResults() {
    questionCard.classList.add('hidden');
    quizResultCard.classList.remove('hidden');

    const finalPercent = Math.min(totalScore, 100);
    percentageNumber.textContent = `${finalPercent}%`;

    if (finalPercent >= 80) {
      resultTitle.textContent = "¡Almas gemelas de gustos! 💖✨";
      resultDesc.textContent = "¡Coincidimos en casi todo! Amas la buena vibra del sol, los animalitos, las sensaciones ácidas y no le temes a las buenas series de terror. ¡Nos llevaríamos increíble!";
    } else if (finalPercent >= 55) {
      resultTitle.textContent = "¡Muy buena conexión! 🌸";
      resultDesc.textContent = "Compartimos bastantes gustos y afinidad. Seguro que una tarde charlando con snacks ácidos o viendo una serie nos divertiría un montón.";
    } else {
      resultTitle.textContent = "¡Polos opuestos que se complementan! 🌟";
      resultDesc.textContent = "Aunque tenemos gustos diferentes en algunas cosas, de eso se trata la vida: ¡de aprender y divertirnos con personas únicas!";
    }

    if (typeof confetti === 'function') {
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  }

  if (restartQuizBtn) {
    restartQuizBtn.addEventListener('click', () => {
      currentQuizStep = 0;
      totalScore = 0;
      quizResultCard.classList.add('hidden');
      questionCard.classList.remove('hidden');
      renderQuizQuestion();
    });
  }

  // Inicializar quiz
  renderQuizQuestion();

  // 7. FORMULARIO DE MENSAJITOS (BUZÓN)
  const contactForm = document.getElementById('contactForm');
  const messagesList = document.getElementById('messagesList');

  // Cargar mensajes guardados en localStorage si existen
  const savedMessages = JSON.parse(localStorage.getItem('laura_messages') || '[]');
  savedMessages.forEach(msg => {
    addMessageToDOM(msg.name, msg.vibe, msg.text, false);
  });

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('nameInput').value.trim();
      const vibe = document.getElementById('vibeInput').value;
      const text = document.getElementById('messageInput').value.trim();

      if (name && text) {
        addMessageToDOM(name, vibe, text, true);

        // Guardar
        savedMessages.unshift({ name, vibe, text });
        localStorage.setItem('laura_messages', JSON.stringify(savedMessages.slice(0, 10)));

        contactForm.reset();

        // Efecto confetti
        if (typeof confetti === 'function') {
          confetti({
            particleCount: 60,
            spread: 60,
            origin: { y: 0.8 }
          });
        }

        alert('¡Muchas gracias por tu mensajito! 💖 Ya quedó publicado en el muro de Laura.');
      }
    });
  }

  function addMessageToDOM(name, vibe, text, prepend = false) {
    const bubble = document.createElement('div');
    bubble.className = 'msg-bubble';
    bubble.innerHTML = `
      <div class="msg-author">🌸 ${escapeHTML(name)} (${escapeHTML(vibe)}):</div>
      <p>${escapeHTML(text)}</p>
    `;
    if (prepend && messagesList.firstChild) {
      messagesList.insertBefore(bubble, messagesList.firstChild);
    } else {
      messagesList.appendChild(bubble);
    }
  }

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }

  // 8. MODAL DE MENSAJE SORPRESA / FRASES BONITAS
  const quotes = [
    "\"Recuerda que brillar no se trata de no tener sombras, sino de iluminar con tu propia luz dondequiera que vayas.\" 🌸",
    "\"Grado 11 es para reír, soñar en grande y dejar huella en cada paso.\" 🎓✨",
    "\"La vida es como un dulce ácido: al principio te sorprende, ¡pero luego te fascina!\" 🍋💖",
    "\"Rodéate de cosas que te den calorcito en el alma, como un día de sol o la mirada de un perrito.\" 🐾☀️",
    "\"Ser dulce por fuera no quita que te encante la adrenalina de una buena serie de terror.\" 👻🎬",
    "\"Cada día es una nueva oportunidad para ser tu versión más feliz y auténtica.\" 🌷"
  ];

  const surpriseBtn = document.getElementById('surpriseBtn');
  const surpriseModal = document.getElementById('surpriseModal');
  const modalClose = document.getElementById('modalClose');
  const anotherQuoteBtn = document.getElementById('anotherQuoteBtn');
  const quoteText = document.getElementById('quoteText');

  function openModalWithRandomQuote() {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    if (quoteText) quoteText.textContent = randomQuote;
    if (surpriseModal) surpriseModal.classList.add('active');
  }

  if (surpriseBtn) {
    surpriseBtn.addEventListener('click', openModalWithRandomQuote);
  }

  if (anotherQuoteBtn) {
    anotherQuoteBtn.addEventListener('click', () => {
      let nextQuote;
      do {
        nextQuote = quotes[Math.floor(Math.random() * quotes.length)];
      } while (nextQuote === quoteText.textContent && quotes.length > 1);
      quoteText.textContent = nextQuote;
      triggerHeartExplosion();
    });
  }

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      surpriseModal.classList.remove('active');
    });
  }

  if (surpriseModal) {
    surpriseModal.addEventListener('click', (e) => {
      if (e.target === surpriseModal) {
        surpriseModal.classList.remove('active');
      }
    });
  }

});
