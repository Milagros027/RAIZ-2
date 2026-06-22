/* =============================================
   NURAFORM CLONE — main.js
   ============================================= */

/* ---------- NAV: scroll effect ---------- */
const nav = document.getElementById('nav');
const onScroll = () => {
  if (window.scrollY > 20) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ---------- MOBILE MENU ---------- */
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobile-menu');

burger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  burger.setAttribute('aria-expanded', isOpen);
  // Animate burger → X
  const spans = burger.querySelectorAll('span');
  if (isOpen) {
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

/* Close mobile menu on link click */
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    const spans = burger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  });
});

/* ---------- SCROLL-TRIGGERED ANIMATIONS ---------- */
const animEls = document.querySelectorAll('[data-animate]');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

animEls.forEach(el => revealObserver.observe(el));

/* ---------- TYPEWRITER EFFECT ---------- */
const prompts = [
  'Create a client onboarding form…',
  'Build an event RSVP form…',
  'Make a customer feedback survey…',
  'Design a job application form…',
  'Create a product feedback form…',
];

const typewriterEl = document.getElementById('typewriter');
const promptPlaceholder = document.getElementById('prompt-placeholder');
let promptIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typewriterTimeout;

function runTypewriter() {
  const current = prompts[promptIndex];

  if (!isDeleting) {
    typewriterEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      isDeleting = true;
      typewriterTimeout = setTimeout(runTypewriter, 2000);
      return;
    }
  } else {
    typewriterEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      promptIndex = (promptIndex + 1) % prompts.length;
      typewriterTimeout = setTimeout(runTypewriter, 400);
      return;
    }
  }

  const speed = isDeleting ? 35 : 65;
  typewriterTimeout = setTimeout(runTypewriter, speed);
}

// Also animate the prompt bar placeholder (alternates)
let placeholderIndex = 0;
const placeholderPrompts = [
  'Create a client onboarding form…',
  'Build an event RSVP form…',
  'Make a feedback survey…',
  'Design a job application…',
];

function cyclePlaceholder() {
  if (promptPlaceholder) {
    promptPlaceholder.style.opacity = '0';
    setTimeout(() => {
      placeholderIndex = (placeholderIndex + 1) % placeholderPrompts.length;
      promptPlaceholder.textContent = placeholderPrompts[placeholderIndex];
      promptPlaceholder.style.transition = 'opacity 0.4s ease';
      promptPlaceholder.style.opacity = '1';
    }, 300);
  }
}

// Start typewriter after a brief delay
setTimeout(runTypewriter, 800);
setInterval(cyclePlaceholder, 3200);

/* ---------- ANALYTICS BAR ANIMATION ---------- */
// Animate analytics bars when they come into view
const analyticsBars = document.querySelectorAll('.analytics-bar, .analytics-mini-bar');

const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      const targetW = bar.style.getPropertyValue('--w');
      bar.style.setProperty('--w', '0%');
      requestAnimationFrame(() => {
        setTimeout(() => {
          bar.style.width = targetW;
        }, 100);
      });
      barObserver.unobserve(bar);
    }
  });
}, { threshold: 0.3 });

analyticsBars.forEach(bar => barObserver.observe(bar));

/* ---------- AI BUTTON CYCLING ---------- */
const aiBtns = document.querySelectorAll('.feat-ai-btn');
if (aiBtns.length) {
  let activeIdx = 0;
  setInterval(() => {
    aiBtns.forEach((btn, i) => {
      btn.classList.toggle('active', i === activeIdx);
    });
    activeIdx = (activeIdx + 1) % aiBtns.length;
  }, 1800);
}

/* ---------- LAYOUT OPTION CYCLING ---------- */
const layoutOpts = document.querySelectorAll('.layout-opt');
if (layoutOpts.length) {
  let activeLayout = 0;
  setInterval(() => {
    layoutOpts.forEach((opt, i) => {
      opt.classList.toggle('active', i === activeLayout);
    });
    activeLayout = (activeLayout + 1) % layoutOpts.length;
  }, 2200);
}

/* ---------- SMOOTH PARALLAX on hero glows ---------- */
const glow1 = document.querySelector('.hero__glow--1');
const glow2 = document.querySelector('.hero__glow--2');

let ticking = false;
window.addEventListener('mousemove', (e) => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    const cx = (e.clientX / window.innerWidth - 0.5) * 30;
    const cy = (e.clientY / window.innerHeight - 0.5) * 20;
    if (glow1) glow1.style.transform = `translateX(calc(-50% + ${cx}px)) translateY(${cy}px)`;
    if (glow2) glow2.style.transform = `translateX(${-cx * 0.5}px) translateY(${-cy * 0.5}px)`;
    ticking = false;
  });
});

/* ---------- AUDIENCE CARD staggered reveal ---------- */
const audienceCards = document.querySelectorAll('.audience-card');
audienceCards.forEach((card, i) => {
  card.style.transitionDelay = `${i * 60}ms`;
});

const audienceObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.05 });

audienceCards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'opacity 0.5s ease, transform 0.5s ease, border-color 0.2s';
  audienceObserver.observe(card);
});

/* ---------- FEAT CARD stagger ---------- */
const featCards = document.querySelectorAll('.feat-card');
featCards.forEach((card, i) => {
  card.style.transitionDelay = `${(i % 3) * 80}ms`;
});

const featObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.05 });

featCards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(24px)';
  card.style.transition = `opacity 0.55s ease, transform 0.55s ease, border-color 0.2s, box-shadow 0.2s`;
  featObserver.observe(card);
});

/* ---------- NUMBER COUNTER for analytics ---------- */
function animateCounter(el, target, duration = 1200) {
  const start = performance.now();
  const format = (n) => {
    if (n >= 1000) return (n / 1000).toFixed(1) + 'k';
    return Math.floor(n).toString();
  };
  function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = format(target * ease);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = format(target);
  }
  requestAnimationFrame(step);
}

const analyticsVals = document.querySelectorAll('.analytics-val');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const raw = el.textContent;
      if (raw.includes('%')) {
        const num = parseFloat(raw);
        let start = performance.now();
        const step = (now) => {
          const t = Math.min((now - start) / 1200, 1);
          const ease = 1 - Math.pow(1 - t, 3);
          el.textContent = (num * ease).toFixed(0) + '%';
          if (t < 1) requestAnimationFrame(step);
          else el.textContent = raw;
        };
        requestAnimationFrame(step);
      } else {
        const num = parseInt(raw.replace(/,/g, ''));
        animateCounter(el, num);
      }
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

analyticsVals.forEach(el => counterObserver.observe(el));

/* ---------- TEST CARD hover glow ---------- */
document.querySelectorAll('.test-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mouse-x', `${x}%`);
    card.style.setProperty('--mouse-y', `${y}%`);
  });
});
