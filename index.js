// GSAP & ScrollTrigger가 이미 로드되어 있어야 함
gsap.registerPlugin(ScrollTrigger);

const area = document.getElementById('area');
const c1 = document.getElementById('cloud1');
const c2 = document.getElementById('cloud2');
const c3 = document.getElementById('cloud3');
const c4 = document.getElementById('cloud4');


if (area) {
  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: area,
      start: "top top",      // SVG top == viewport top
      end: "+=1500",         // 1500px 동안 스크럽 (원하면 숫자만 조절)
      scrub: true,
      // markers: true,      // 디버그 시 켜기
    }
  });
// 상대값 대신 절대값: 0 -> -120 등
tl.fromTo(c1, { y: 65 },  { y: -100 }, -0.10)
  .fromTo(c2, { y: 60 },  { y: -140 }, -0.40)
  .fromTo(c3, { y: 50 },  { y: -180 }, -0.10)
  .fromTo(c4, { y: 20 },  { y: -140 }, -0.10);

}

// 반응형/레이아웃 변경 시 다시 계산
window.addEventListener('resize', () => ScrollTrigger.refresh());

// // Initialize Lenis smooth scroll
// const lenis = new Lenis({
//   duration: 1.2,
//   easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
//   smooth: true,
//   gestureDirection: "vertical",
//   smoothTouch: true,
//   touchMultiplier: 2
// });

// function raf(time) {
//   lenis.raf(time);
//   ScrollTrigger.update();
//   requestAnimationFrame(raf);
// }

// requestAnimationFrame(raf);

// Set z-index for images
document.querySelectorAll(".arch__right .img-wrapper").forEach((element) => {
  const order = element.getAttribute("data-index");
  if (order !== null) {
    element.style.zIndex = order;
  }
});

// Mobile layout handler (only handle order)
function handleMobileLayout() {
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  const leftItems = gsap.utils.toArray(".arch__left .arch__info");
  const rightItems = gsap.utils.toArray(".arch__right .img-wrapper");

  if (isMobile) {
    // Interleave items using order
    leftItems.forEach((item, i) => {
      item.style.order = i * 2;
    });
    rightItems.forEach((item, i) => {
      item.style.order = i * 2 + 1;
    });
  } else {
    // Clear order for desktop
    leftItems.forEach((item) => {
      item.style.order = "";
    });
    rightItems.forEach((item) => {
      item.style.order = "";
    });
  }
}

// Debounce resize for performance
let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(handleMobileLayout, 100);
});

// Run on initial load
handleMobileLayout();

const imgs = gsap.utils.toArray(".img-wrapper img");
const bgColors = ["#EDF9FF", "#FFECF2", "#FFE8DB"];

// GSAP Animation with Media Query
ScrollTrigger.matchMedia({
  "(min-width: 769px)": function () {
    const mainTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".arch",
        start: "top top",
        end: "bottom bottom",
        pin: ".arch__right",
        scrub: true
      }
    });

    gsap.set(imgs, {
      clipPath: "inset(0)",
      objectPosition: "0px 0%"
    });

    imgs.forEach((_, index) => {
      const currentImage = imgs[index];
      const nextImage = imgs[index + 1] ? imgs[index + 1] : null;

      const sectionTimeline = gsap.timeline();

      if (nextImage) {
        sectionTimeline
          .to(
            "body",
            {
              backgroundColor: bgColors[index],
              duration: 1.5,
              ease: "power2.inOut"
            },
            0
          )
          .to(
            currentImage,
            {
              clipPath: "inset(0px 0px 100%)",
              objectPosition: "0px 60%",
              duration: 1.5,
              ease: "none"
            },
            0
          )
          .to(
            nextImage,
            {
              objectPosition: "0px 40%",
              duration: 1.5,
              ease: "none"
            },
            0
          );
      }

      mainTimeline.add(sectionTimeline);
    });
  },
  "(max-width: 768px)": function () {
    const mbTimeline = gsap.timeline();
    gsap.set(imgs, {
      objectPosition: "0px 60%"
    });

    imgs.forEach((image, index) => {
      const innerTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: image,
          start: "top-=70% top+=50%",
          end: "bottom+=200% bottom",
          scrub: true
        }
      });

      innerTimeline
        .to(image, {
          objectPosition: "0px 30%",
          duration: 5,
          ease: "none"
        })
        .to("body", {
          backgroundColor: bgColors[index],
          duration: 1.5,
          ease: "power2.inOut"
        });

      mbTimeline.add(innerTimeline);
    });
  }
});

// ===== GitHub 토글 패널 =====
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

  // 바깥 클릭으로 닫기
  document.addEventListener('click', (e) => {
    if (!isOpen()) return;
    const t = e.target;
    if (!panel.contains(t) && !toggle.contains(t)) close();
  });

  // ESC로 닫기
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen()) close();
  });
})();

// 히어로 카피 등장 애니메이션
window.addEventListener('DOMContentLoaded', () => {
  if (window.gsap) {
    gsap.from(".hero-copy__title", {
      y: 16,
      opacity: 0,
      duration: 0.9,
      ease: "power2.out",
      clearProps: "all"
    });
    gsap.from(".hero-copy__sub", {
      y: 10,
      opacity: 0,
      delay: 0.05,
      duration: 0.7,
      ease: "power2.out",
      clearProps: "all"
    });
  }
});

gsap.from(".hero-copy__title", {y:16, opacity:0, duration:0.9, ease:"power2.out"});
