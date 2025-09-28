// ==============================
// GSAP + ScrollTrigger
// ==============================
gsap.registerPlugin(ScrollTrigger);

// ---------- SVG 구름 패럴랙스 ----------
const area = document.getElementById('area');
const c1 = document.getElementById('cloud1');
const c2 = document.getElementById('cloud2');
const c3 = document.getElementById('cloud3');
const c4 = document.getElementById('cloud4');

if (area && c1 && c2 && c3 && c4) {
  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: area,
      start: "top top",
      end: "+=1500",
      scrub: true,
      // markers: true,
    },
  });

  tl.fromTo(c1, { y: 65 }, { y: -100 }, -0.10)
    .fromTo(c2, { y: 60 }, { y: -140 }, -0.40)
    .fromTo(c3, { y: 50 }, { y: -180 }, -0.10)
    .fromTo(c4, { y: 20 }, { y: -140 }, -0.10);
}

// ---------- 리사이즈 시 재계산 ----------
window.addEventListener('resize', () => ScrollTrigger.refresh(), { passive: true });

/* // ---------- (선택) 부드러운 스크롤 ----------
const lenis = new Lenis({
  duration: 1.1,
  smoothWheel: true,
  smoothTouch: true,
});
function raf(t) {
  lenis.raf(t);
  ScrollTrigger.update();
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);
// ---------------------------------------- */

// ==============================
// 스크롤 섹션 인디케이터 (선택)
// - .sc-section 이 있으면 li에 active 토글
// - 없으면 자동으로 무시
// ==============================
(() => {
  const sections = gsap.utils.toArray('.sc-section');
  if (!sections.length) return; // 현재 html에 없으면 그냥 종료

  // 인디케이터 후보: .container 안의 ul > li (id/tag1, tag2, ...)
  const indicatorList = document.querySelector('.container ul');
  const indicators = indicatorList ? Array.from(indicatorList.querySelectorAll('li')) : [];

  sections.forEach((sec, i) => {
    ScrollTrigger.create({
      trigger: sec,
      start: "top center",
      end: "bottom center",
      onEnter: () => setActive(i),
      onEnterBack: () => setActive(i),
    });
  });

  function setActive(i) {
    if (!indicators.length) return;
    indicators.forEach(el => el.classList.remove('active'));
    const target = indicators[i];
    if (target) target.classList.add('active');
  }
})();

// ==============================
// GitHub 토글 패널
// ==============================
(() => {
  const toggle = document.getElementById('ghToggle');
  const panel = document.getElementById('ghPanel');
  if (!toggle || !panel) return;

  const open = () => {
    panel.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
  };
  const close = () => {
    panel.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
  };
  const isOpen = () => toggle.getAttribute('aria-expanded') === 'true';

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    isOpen() ? close() : open();
  });

  document.addEventListener('click', (e) => {
    if (!isOpen()) return;
    const t = e.target;
    if (!panel.contains(t) && !toggle.contains(t)) close();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen()) close();
  });
})();

// ==============================
// 히어로 카피 페이드인
// ==============================
window.addEventListener('DOMContentLoaded', () => {
  if (!window.gsap) return;
  gsap.from(".hero-copy__title", {
    y: 16,
    opacity: 0,
    duration: 0.9,
    ease: "power2.out",
    clearProps: "all",
  });
  gsap.from(".hero-copy__sub", {
    y: 10,
    opacity: 0,
    delay: 0.05,
    duration: 0.7,
    ease: "power2.out",
    clearProps: "all",
  });
});

// ===== 풀페이지 내비 =====
(() => {
  const pages = Array.from(document.querySelectorAll('.scroller .page'));
  if (!pages.length) return;

  // 현재 페이지 인덱스 추적
  let current = 0;

  // IntersectionObserver로 현재 섹션 표시
  const io = new IntersectionObserver((entries) => {
    entries.forEach((ent) => {
      if (ent.isIntersecting) {
        const i = pages.indexOf(ent.target);
        current = i;
        updateDots(i);
      }
    });
  }, { root: null, threshold: 0.6 });
  pages.forEach(p => io.observe(p));

  // Dot nav 클릭 → 해당 섹션으로 이동
  const dots = Array.from(document.querySelectorAll('.dotnav__dot'));
  function updateDots(i) {
    dots.forEach((d, idx) => d.setAttribute('aria-current', idx === i ? 'true' : 'false'));
  }
  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const idx = Number(dot.dataset.target || '0');
      pages[idx]?.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // 키보드(↑/↓, PgUp/PgDn, Space)로 페이지 넘김
  window.addEventListener('keydown', (e) => {
    const key = e.key;
    const goPrev = key === 'ArrowUp' || key === 'PageUp';
    const goNext = key === 'ArrowDown' || key === 'PageDown' || key === ' ';
    if (!goPrev && !goNext) return;

    e.preventDefault();
    const nextIdx = clamp(current + (goNext ? 1 : -1), 0, pages.length - 1);
    pages[nextIdx]?.scrollIntoView({ behavior: 'smooth' });
  }, { passive: false });

  // 유틸
  function clamp(n, a, b) { return Math.max(a, Math.min(b, n)); }
})();
