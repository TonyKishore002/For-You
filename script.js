/* Prevent browser restoring scroll position on reload */
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

/* ============================================
   CUSTOMIZE YOUR STORY HERE
   ============================================ */
const loveStory = {
  herName: "Reena",
  yourName: "Tony",

  firstMemory: "The moment our story began.",
  secondMemory: "A moment I'll always remember.",
  favoriteMemory: "One of the many reasons I smile.",

  letter: `Hi Mrs. Tony....Ipdi koopda nalla irukku laa, Marriage panna mudiuma nu laa theriyala reena, but ennala mudinja varaikkum on kuda iruppa`
};

/* ============================================
   APPLY CUSTOMIZATION  
   ============================================ */
(function applyLoveStory() {
  document.getElementById("her-name").textContent = loveStory.herName;
  document.getElementById("letter-her-name").textContent = loveStory.herName;
  document.getElementById("letter-your-name").textContent = loveStory.yourName;
  document.getElementById("forever-your-name").textContent = loveStory.yourName;
  const firstMemoryEl = document.getElementById("first-memory");
  const secondMemoryEl = document.getElementById("second-memory");
  const favoriteMemoryEl = document.getElementById("favorite-memory");
  if (firstMemoryEl) firstMemoryEl.textContent = loveStory.firstMemory;
  if (secondMemoryEl) secondMemoryEl.textContent = loveStory.secondMemory;
  if (favoriteMemoryEl) favoriteMemoryEl.textContent = loveStory.favoriteMemory;
})();

/* ============================================
   60 MULTI-COLOR BALLOON INTRO
   ============================================ */

(function balloonIntro() {

  const loader = document.getElementById("loader");
  const field = document.getElementById("balloon-field");

  if (!loader || !field) return;

  /* Always start from the top of the page */
  window.scrollTo(0, 0);

  document.body.style.overflow = "hidden";

  const colors = [
    "red",
    "pink",
    "purple",
    "blue",
    "cyan",
    "yellow",
    "orange",
    "green",
    "white"
  ];

  const BALLOON_COUNT = 120;

  for (let i = 0; i < BALLOON_COUNT; i++) {

    const balloon = document.createElement("div");

    const color =
      colors[Math.floor(Math.random() * colors.length)];

    balloon.classList.add(
      "balloon",
      `balloon-${color}`
    );

    /* Random size */

    const width =
      Math.floor(Math.random() * 45) + 45;

    const height =
      Math.floor(width * 1.28);

    balloon.style.width = `${width}px`;
    balloon.style.height = `${height}px`;

    /* Random horizontal position */

    balloon.style.left =
      `${Math.random() * 100}%`;

    /* Random starting height */

    balloon.style.bottom =
      `${-100 - Math.random() * 450}px`;

    /* Random animation */

    balloon.style.setProperty(
      "--duration",
      `${6 + Math.random() * 5}s`
    );

    balloon.style.setProperty(
      "--delay",
      `${Math.random() * 2.5}s`
    );

    balloon.style.setProperty(
      "--rotation",
      `${-10 + Math.random() * 20}deg`
    );

    /* String */

    const string = document.createElement("div");

    string.className = "balloon-string";

    balloon.appendChild(string);

    field.appendChild(balloon);
  }

  /*
    Keep intro visible long enough
    for the balloons and text to play.
  */

  setTimeout(() => {

    loader.classList.add("loader-hidden");

    setTimeout(() => {

      document.body.style.overflow = "auto";

    }, 900);

  }, 8500);

})();
/* ============================================
   SCROLL REVEAL (IntersectionObserver)
   ============================================ */
(function scrollReveal() {
  const items = document.querySelectorAll(".reveal-item");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = parseInt(el.dataset.delay || "0", 10);
          setTimeout(() => el.classList.add("in-view"), delay);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.05, rootMargin: "0px 0px 50px 0px" }
  );

  items.forEach((el) => observer.observe(el));
})();

/* ============================================
   HERO PARALLAX (desktop only)
   ============================================ */
(function heroParallax() {
  const glow = document.getElementById("hero-glow");
  const isTouch = window.matchMedia("(pointer: coarse)").matches;
  if (isTouch) return;

  window.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 30;
    glow.style.transform = `translate(${x}px, ${y}px)`;
  });
})();

/* ============================================
   AMBIENT FLOATING PARTICLES
   ============================================ */
(function ambientParticles() {
  const canvas = document.getElementById("particle-canvas");
  const ctx = canvas.getContext("2d");
  let particles = [];
  const COUNT = window.innerWidth < 640 ? 16 : 30;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = document.body.scrollHeight;
  }

  function makeParticle() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.6 + 0.4,
      speed: Math.random() * 0.3 + 0.08,
      drift: (Math.random() - 0.5) * 0.15,
      alpha: Math.random() * 0.4 + 0.15,
      hue: Math.random() > 0.5 ? "240,185,207" : "132,103,201"
    };
  }

  function init() {
    resize();
    particles = Array.from({ length: COUNT }, makeParticle);
  }

  function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.y -= p.speed;
      p.x += p.drift;
      if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.hue}, ${p.alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(tick);
  }

  window.addEventListener("resize", resize);
  init();
  tick();
})();

/* ============================================
   THE LETTER — modal popup + typewriter
   ============================================ */
(function letterSequence() {
  const openBtn      = document.getElementById("open-letter-btn");
  const modal        = document.getElementById("letter-modal");
  const backdrop     = document.getElementById("letter-modal-backdrop");
  const closeBtn     = document.getElementById("letter-modal-close");
  const bodyText     = document.getElementById("letter-body-text");

  if (!openBtn || !modal) return;

  let typewriterTimer = null;
  let typed = false;

  function typeWriter(text) {
    let i = 0;
    bodyText.textContent = "";
    typewriterTimer = setInterval(() => {
      bodyText.textContent += text[i];
      i++;
      if (i >= text.length) {
        clearInterval(typewriterTimer);
        typed = true;
      }
    }, 28);
  }

  function openModal() {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
    if (!typed) {
      setTimeout(() => typeWriter(loveStory.letter), 350);
    }
  }

  function closeModal() {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  openBtn.addEventListener("click", openModal);
  closeBtn.addEventListener("click", closeModal);
  backdrop.addEventListener("click", closeModal);

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) closeModal();
  });
})();


/* ============================================
   FINAL SURPRISE — particle heart formation
   ============================================ */
(function finalSurprise() {
  const surpriseBtn = document.getElementById("surprise-btn");
  const overlay = document.getElementById("surprise-overlay");
  const heartEl = document.getElementById("surprise-heart");
  const messageEl = document.getElementById("surprise-message");
  const closeBtn = document.getElementById("surprise-close");
  const canvas = document.getElementById("surprise-canvas");
  const ctx = canvas.getContext("2d");

  let animId = null;
  let particles = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize);

  function heartPoint(t) {
    // parametric heart curve
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
    return { x, y };
  }

  function makeParticles() {
    const count = window.innerWidth < 640 ? 60 : 110;
    const scale = window.innerWidth < 640 ? 9 : 13;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2 - 20;

    particles = Array.from({ length: count }, (_, i) => {
      const t = (i / count) * Math.PI * 2;
      const pt = heartPoint(t);
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        tx: cx + pt.x * scale,
        ty: cy + pt.y * scale,
        progress: 0,
        speed: Math.random() * 0.015 + 0.012,
        size: Math.random() * 2 + 1.2,
        hue: Math.random() > 0.5 ? "240,185,207" : "132,103,201"
      };
    });
  }

  function easeOutCubic(x) { return 1 - Math.pow(1 - x, 3); }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let allDone = true;

    particles.forEach((p) => {
      if (p.progress < 1) {
        p.progress = Math.min(1, p.progress + p.speed);
        allDone = false;
      }
      const e = easeOutCubic(p.progress);
      const x = p.x + (p.tx - p.x) * e;
      const y = p.y + (p.ty - p.y) * e;

      ctx.beginPath();
      ctx.arc(x, y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.hue}, ${0.35 + e * 0.5})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = `rgba(${p.hue}, 0.6)`;
      ctx.fill();
    });

    if (!allDone) {
      animId = requestAnimationFrame(animate);
    } else {
      // hold formation briefly, then fade particles out
      setTimeout(fadeOutParticles, 700);
    }
  }

  function fadeOutParticles() {
    let opacity = 1;
    function fade() {
      opacity -= 0.02;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.tx, p.ty, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.hue}, ${Math.max(0, opacity * 0.7)})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `rgba(${p.hue}, 0.6)`;
        ctx.fill();
      });
      if (opacity > 0) {
        requestAnimationFrame(fade);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    fade();
  }

  function openSurprise() {
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
    resize();
    makeParticles();
    cancelAnimationFrame(animId);
    animate();

    setTimeout(() => heartEl.classList.add("visible"), 400);
    setTimeout(() => heartEl.classList.add("glow"), 1600);
    setTimeout(() => messageEl.classList.add("visible"), 2200);
    setTimeout(() => closeBtn.classList.add("visible"), 2200);
  }

  function closeSurprise() {
    overlay.classList.remove("active");
    document.body.style.overflow = "auto";
    cancelAnimationFrame(animId);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    heartEl.classList.remove("visible", "glow");
    messageEl.classList.remove("visible");
    closeBtn.classList.remove("visible");
  }

  surpriseBtn.addEventListener("click", openSurprise);
  closeBtn.addEventListener("click", closeSurprise);
})();

/* ==========================================
   BACKGROUND MUSIC (MPEG Audio Support)
   ========================================== */

const music = document.getElementById("background-music");
const musicBtn = document.getElementById("music-btn");

let musicStarted = false;

function startMusic() {
  if (musicStarted || !music) return;

  music.play()
    .then(() => {
      musicStarted = true;
      if (musicBtn) {
        musicBtn.classList.add("playing");
        musicBtn.innerHTML = "🎵";
      }
    })
    .catch(() => {
      // Browser blocked autoplay; will play on user interaction
    });
}

/* Bypass autoplay restrictions on first user interaction anywhere */
['click', 'touchstart', 'keydown'].forEach(evt => {
  document.addEventListener(evt, startMusic, { once: true });
});

/* Music button toggle listener */
if (musicBtn && music) {
  musicBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (music.paused) {
      music.play().then(() => {
        musicStarted = true;
        musicBtn.classList.add("playing");
        musicBtn.innerHTML = "🎵";
      });
    } else {
      music.pause();
      musicBtn.classList.remove("playing");
      musicBtn.innerHTML = "🔇";
    }
  });
}


/* ============================================
   WEB AUDIO ROMANTIC CHIME SYNTHESIZER
   ============================================ */
const AudioCtx = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;

function playChime(freq = 523.25, type = 'sine') {
  try {
    if (!audioCtx) audioCtx = new AudioCtx();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    
    gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.8);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + 0.8);
  } catch(e) {
    // Audio context fallback if blocked
  }
}

/* ============================================
   INTERACTIVE HEART SPARKLE CURSOR TRAIL
   ============================================ */
(function heartTrail() {
  const emojis = ["💖", "✨", "🌸", "💕", "❤️", "🥰", "💌"];
  let lastTime = 0;

  function spawnSparkle(x, y) {
    const now = Date.now();
    if (now - lastTime < 70) return; // throttle
    lastTime = now;

    const el = document.createElement("div");
    el.className = "cursor-heart";
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1200);
  }

  window.addEventListener("mousemove", (e) => spawnSparkle(e.clientX, e.clientY));
  window.addEventListener("touchmove", (e) => {
    if (e.touches.length > 0) {
      spawnSparkle(e.touches[0].clientX, e.touches[0].clientY);
    }
  });
})();

/* ============================================
   FLOATING LOVE TOAST NOTIFICATION
   ============================================ */
function showLoveToast(msg) {
  let toast = document.querySelector(".love-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "love-toast";
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add("show");

  playChime(659.25); // E5 note

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3500);
}

/* ============================================
   LITTLE REASONS CARD DECK INTERACTION
   ============================================ */
(function reasonsDeck() {
  const reasons = [
    "Your smile lights up my whole world ✨",
    "How cute you get when you're super excited 🥺",
    "The way your eyes shine when you talk about things you love 💖",
    "Your kindness and sweet caring heart 🌸",
    "Just hearing your voice instantly makes my day better 🥰",
    "How you make every ordinary moment feel special 💕",
    "Simply because you are YOU — the best part of my life ❤️"
  ];

  let currentIndex = 0;
  const card = document.getElementById("love-card");
  const reasonText = document.getElementById("reason-text");
  const nextBtn = document.getElementById("next-reason-btn");

  if (!card || !reasonText || !nextBtn) return;

  reasonText.textContent = reasons[0];

  card.addEventListener("click", () => {
    card.classList.toggle("flipped");
    playChime(card.classList.contains("flipped") ? 587.33 : 523.25);
  });

  nextBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % reasons.length;
    
    card.classList.remove("flipped");
    playChime(659.25);

    setTimeout(() => {
      reasonText.textContent = reasons[currentIndex];
      card.classList.add("flipped");
    }, 300);
  });
})();

/* ============================================
   INTERACTIVE LOVE METER & BURST
   ============================================ */
(function loveMeter() {
  const heartArea = document.getElementById("heart-tap-area");
  const barFill = document.getElementById("meter-bar-fill");
  const status = document.getElementById("meter-status");

  if (!heartArea || !barFill || !status) return;

  let progress = 0;
  const statusMessages = [
    { pct: 0, msg: "0% - Tap the heart to start filling! 💓" },
    { pct: 20, msg: "20% - Warming up... getting sweet 😊" },
    { pct: 40, msg: "40% - Are you blushing yet? 😳" },
    { pct: 60, msg: "60% - Heart beat racing! 💓✨" },
    { pct: 80, msg: "80% - Almost overflowing with love! 🥰" },
    { pct: 100, msg: "100% INFINITE LOVE OVERLOAD! 💘🎉" }
  ];

  function spawnBurstHearts(x, y) {
    for (let i = 0; i < 6; i++) {
      const p = document.createElement("div");
      p.className = "cursor-heart";
      p.textContent = ["💖", "💗", "💕", "❤️", "✨"][Math.floor(Math.random() * 5)];
      
      const offsetX = (Math.random() - 0.5) * 80;
      const offsetY = (Math.random() - 0.5) * 80;
      p.style.left = `${x + offsetX}px`;
      p.style.top = `${y + offsetY}px`;
      
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 1200);
    }
  }

  heartArea.addEventListener("click", (e) => {
    if (progress >= 100) {
      progress = 100;
      spawnBurstHearts(e.clientX, e.clientY);
      showLoveToast("Reena, you have officially overloaded my heart! 💖");
      return;
    }

    progress = Math.min(100, progress + 15);
    barFill.style.width = `${progress}%`;

    // Rising chime pitch as progress increases!
    playChime(400 + progress * 5);

    spawnBurstHearts(e.clientX, e.clientY);

    // Update status msg based on progress
    for (let i = statusMessages.length - 1; i >= 0; i--) {
      if (progress >= statusMessages[i].pct) {
        status.textContent = statusMessages[i].msg;
        break;
      }
    }

    if (progress >= 100) {
      showLoveToast("🎉 MAXIMUM BLUSH LEVEL REACHED! 💖");
    }
  });
})();

/* ============================================
   PLAYFUL DODGING "NO" BUTTON QUIZ
   ============================================ */
(function playfulQuestion() {
  const yesBtn = document.getElementById("yes-btn");
  const noBtn = document.getElementById("no-btn");
  const response = document.getElementById("question-response");

  if (!yesBtn || !noBtn || !response) return;

  function moveNoBtn() {
    const maxX = 120;
    const maxY = 60;
    const randomX = (Math.random() - 0.5) * maxX * 2;
    const randomY = (Math.random() - 0.5) * maxY * 2;

    noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
    playChime(350, 'sawtooth');
  }

  noBtn.addEventListener("mouseenter", moveNoBtn);
  noBtn.addEventListener("touchstart", (e) => {
    e.preventDefault();
    moveNoBtn();
  });

  yesBtn.addEventListener("click", (e) => {
    playChime(783.99); // G5 note
    response.innerHTML = "Yay! You're stuck with me forever! 🥰 Infinity & Beyond! 🚀❤️";
    
    // Spawn celebratory sparkles
    for (let i = 0; i < 15; i++) {
      setTimeout(() => {
        const x = e.clientX + (Math.random() - 0.5) * 200;
        const y = e.clientY + (Math.random() - 0.5) * 200;
        const el = document.createElement("div");
        el.className = "cursor-heart";
        el.textContent = "💖";
        el.style.left = `${x}px`;
        el.style.top = `${y}px`;
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 1200);
      }, i * 50);
    }
  });
})();