/* ==========================================================
   AUTOMATIZZE.IA — Main Scripts
   Inspirado em vold.io
   ========================================================== */

'use strict';

// ─── CUSTOM CURSOR ─────────────────────────────────────────────
(function initCursor() {
  const cursor = document.querySelector('[data-cursor]');
  const dot = document.querySelector('[data-cursor-dot]');
  if (!cursor || !dot) return;

  let mx = -100, my = -100, cx = -100, cy = -100;
  let raf;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
  });

  function animate() {
    cx += (mx - cx) * 0.12;
    cy += (my - cy) * 0.12;
    cursor.querySelector('.inner').style.transform =
      `translate3d(${cx}px, ${cy}px, 0)`;
    raf = requestAnimationFrame(animate);
  }
  animate();

  // Magnetic stick on interactive elements
  const stickEls = document.querySelectorAll('[data-stick-cursor]');
  stickEls.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('is-stick'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('is-stick'));
  });
})();

// ─── LOADING SCREEN ────────────────────────────────────────────
(function initLoading() {
  const cover = document.getElementById('loading-cover');
  const loading = document.getElementById('loading');

  window.addEventListener('load', () => {
    setTimeout(() => {
      if (loading) { loading.style.opacity = '0'; }
      setTimeout(() => {
        if (cover) { cover.style.opacity = '0'; }
        setTimeout(() => {
          if (loading) loading.style.display = 'none';
          if (cover) cover.style.display = 'none';
        }, 600);
      }, 200);
    }, 800);
  });
})();

// ─── HEADER SCROLL ─────────────────────────────────────────────
(function initHeader() {
  const head = document.getElementById('head');
  if (!head) return;
  let lastY = 0;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y > 60) {
      head.classList.add('scrolled');
    } else {
      head.classList.remove('scrolled');
    }
    lastY = y;
  }, { passive: true });
})();

// ─── SCROLL PROGRESS BAR ───────────────────────────────────────
(function initProgressBar() {
  const bar = document.querySelector('.progress-bar');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const pct = (window.scrollY / total) * 100;
    bar.style.width = pct + '%';
  }, { passive: true });
})();

// ─── FADE OUT SCROLL INDICATOR ──────────────────────────────────
(function initScrollIndicator() {
  const indicator = document.querySelector('.chapter-indicator');
  if (!indicator) return;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    indicator.style.opacity = Math.max(0, 1 - y / 300);
  }, { passive: true });
})();

// ─── FULLSCREEN MENU ───────────────────────────────────────────
(function initMenu() {
  const nav = document.getElementById('nav');
  const menu = document.getElementById('menu');
  const close = document.getElementById('navClose');
  if (!nav || !menu) return;

  function openMenu() {
    menu.classList.add('is-active');
    document.body.style.overflow = 'hidden';
    menu.setAttribute('aria-hidden', 'false');
  }

  function closeMenu() {
    menu.classList.remove('is-active');
    document.body.style.overflow = '';
    menu.setAttribute('aria-hidden', 'true');
  }

  nav.addEventListener('click', openMenu);
  if (close) close.addEventListener('click', closeMenu);

  // Close on navlinks
  const navLinks = menu.querySelectorAll('.menu-nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const target = link.dataset.target;
      if (target) {
        e.preventDefault();
        closeMenu();
        setTimeout(() => {
          const el = document.getElementById(target);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 400);
      } else {
        closeMenu();
      }
    });
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });
})();

// ─── MODAL (Demo Scheduling) ───────────────────────────────────
(function initModal() {
  const modal = document.querySelector('.modal-overlay');
  const closeBtns = document.querySelectorAll('[data-close-modal], .modal-close');
  const openBtns = document.querySelectorAll('.open-modal-btn');
  const form = document.getElementById('demo-form');
  const success = document.querySelector('.modal-success');

  if (!modal) return;

  function open() {
    modal.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    modal.classList.remove('is-active');
    document.body.style.overflow = '';
  }

  openBtns.forEach(btn => btn.addEventListener('click', e => { e.preventDefault(); open(); }));
  closeBtns.forEach(btn => btn.addEventListener('click', close));
  modal.addEventListener('click', e => { if (e.target === modal) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('.form-submit');
      btn.textContent = 'Enviando...';
      setTimeout(() => {
        if (success) success.style.display = 'block';
        btn.textContent = 'Mensagem Enviada ✓';
        form.reset();
      }, 1000);
    });
  }
})();

// ─── REVEAL ON SCROLL (IntersectionObserver) ───────────────────
(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  els.forEach(el => obs.observe(el));
})();

// ─── YEAR AUTO UPDATE ──────────────────────────────────────────
document.querySelectorAll('.year_copy').forEach(el => {
  el.textContent = new Date().getFullYear();
});

// ─── HORIZONTAL SCROLL SECTION ─────────────────────────────────
(function initHorizontalScroll() {
  const wrapper = document.querySelector('[data-h-scroll]');
  if (!wrapper) return;

  const slides = wrapper.querySelectorAll('.h-slide');
  const visualSlides = document.querySelectorAll('.slide-visual');
  const textSlides = document.querySelectorAll('.slide-text');
  const scrollbarHandle = document.querySelector('.h-scrollbar-handle');
  const bgText = document.querySelector('.scroll-bg-text');

  const totalSlides = slides.length;
  let currentSlide = 0;

  function setSlide(index) {
    if (index < 0 || index >= totalSlides) return;
    currentSlide = index;

    visualSlides.forEach((s, i) => s.classList.toggle('active', i === index));
    textSlides.forEach((s, i) => s.classList.toggle('active', i === index));

    if (scrollbarHandle) {
      scrollbarHandle.style.width = ((index + 1) / totalSlides * 100) + '%';
    }
  }

  // Scroll-triggered section
  const sectionEl = document.getElementById('como-funciona');
  if (!sectionEl) return;

  const sectionHeight = window.innerHeight * (totalSlides + 1);
  sectionEl.style.height = sectionHeight + 'px';

  window.addEventListener('scroll', () => {
    const rect = sectionEl.getBoundingClientRect();
    const sTop = -rect.top;
    const sMax = sectionEl.offsetHeight - window.innerHeight;

    if (sTop < 0 || sTop > sMax) return;

    const progress = sTop / sMax;
    const slideIdx = Math.min(
      Math.floor(progress * totalSlides),
      totalSlides - 1
    );

    setSlide(slideIdx);

    // Move background text
    if (bgText) {
      bgText.style.transform = `translateY(-50%) translateX(${-progress * 30}%)`;
    }
  }, { passive: true });

  // Init
  setSlide(0);
})();

// ─── PARALLAX BANNERS ──────────────────────────────────────────
(function initParallax() {
  const els = document.querySelectorAll('[data-parallax]');
  if (!els.length) return;

  function update() {
    els.forEach(el => {
      const speed = parseFloat(el.dataset.parallax) || -0.3;
      const rect = el.closest('.full-banner, .platform-image')?.getBoundingClientRect();
      if (!rect) return;
      const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * speed;
      el.style.transform = `translateY(${offset}px)`;
    });
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
})();

// ─── CHAT SIMULATOR ────────────────────────────────────────────
(function initChatSim() {
  const body = document.getElementById('chat-sim-body');
  if (!body) return;

  const script = [
    { type: 'user',  text: 'Olá! Quero saber sobre seus planos de IA.' },
    { type: 'agent', text: 'Olá! 👋 Sou o Agente Automatizze. Vamos montar a solução ideal para o seu negócio?' },
    { type: 'user',  text: 'Sim! Atendemos cerca de 800 clientes/mês.' },
    { type: 'agent', text: 'Perfeito. Para esse volume, recomendo nossa solução Enterprise com integração WhatsApp + CRM. Posso te mostrar um demo?' },
    { type: 'user',  text: 'Sim, quero ver o demo!' },
    { type: 'agent', text: '✅ Ótimo! Vou agendar uma demonstração personalizada para você. Qual o melhor horário?' },
  ];

  let index = 0;

  function addTyping() {
    const typing = document.createElement('div');
    typing.className = 'chat-typing';
    typing.innerHTML = '<span></span><span></span><span></span>';
    body.appendChild(typing);
    body.scrollTop = body.scrollHeight;
    return typing;
  }

  function addMsg(item) {
    const msg = document.createElement('div');
    msg.className = `chat-msg ${item.type}`;
    msg.textContent = item.text;
    body.appendChild(msg);
    body.scrollTop = body.scrollHeight;
  }

  function step() {
    if (index >= script.length) return;
    const item = script[index++];

    if (item.type === 'agent') {
      const typing = addTyping();
      setTimeout(() => {
        typing.remove();
        addMsg(item);
        setTimeout(step, 1800);
      }, 1200);
    } else {
      addMsg(item);
      setTimeout(step, 1000);
    }
  }

  // Start when visible
  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      obs.disconnect();
      setTimeout(step, 600);
    }
  }, { threshold: 0.5 });

  obs.observe(body.closest('.chat-sim') || body);
})();

// ─── SCROLL-TO CAROUSEL LINK ───────────────────────────────────
(function initScrollLinks() {
  const scrollBtn = document.getElementById('scroll-to-carousel');
  if (scrollBtn) {
    scrollBtn.addEventListener('click', e => {
      e.preventDefault();
      const target = document.getElementById('como-funciona');
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  }
})();

// ─── WEBGL BACKGROUND (Simplified CSS Fallback) ────────────────
(function initGradientBg() {
  const canvas = document.getElementById('webgl-bg');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let w, h, time = 0;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  function draw() {
    time += 0.003;
    ctx.clearRect(0, 0, w, h);

    // Animated gradient orbs
    const orbs = [
      { x: w * 0.3 + Math.sin(time * 0.7) * w * 0.1, y: h * 0.3 + Math.cos(time * 0.5) * h * 0.1, r: w * 0.3, color: 'rgba(0,255,178,0.04)' },
      { x: w * 0.7 + Math.cos(time * 0.4) * w * 0.1, y: h * 0.6 + Math.sin(time * 0.6) * h * 0.1, r: w * 0.25, color: 'rgba(0,100,80,0.03)' },
    ];

    orbs.forEach(orb => {
      const g = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r);
      g.addColorStop(0, orb.color);
      g.addColorStop(1, 'transparent');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
    });

    requestAnimationFrame(draw);
  }

  draw();
})();
