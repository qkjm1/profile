import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import ArchSection from "./sections/ArchSection";
import OuterSection from "./sections/OuterSection";
import StackSection from "./sections/StackSection";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.normalizeScroll(true);
// ✅ "섹션(top) 기준"으로 스크롤 (핀/Spacer 무시)
// - 헤더 높이만큼 자동 보정
// - 스냅 ST가 당겨버리는 현상 방지: 일시 비활성화 후 복구
function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  // 1) 헤더 높이 계산 (고정 헤더가 겹치지 않도록 보정)
  const header = document.querySelector<HTMLElement>(".hero__inner");
  const headerH = header ? header.getBoundingClientRect().height : 0;

  // 2) 목표 Y (섹션 엘리먼트의 문서상 top)
  //    - pin/spacer와 관계없이 "현재 DOM 레이아웃" 기준
  const rect = el.getBoundingClientRect();
  let targetY = window.scrollY + rect.top - headerH;

  // 3) #snapper에 붙인 '스냅용 ScrollTrigger'를 잠시 꺼두기 (있으면)
  const snapST = ScrollTrigger.getAll().find(
    (t) =>
      (t.vars?.trigger as Element | undefined)?.id === "snapper" &&
      !!t.vars?.snap
  );
  snapST?.disable(); // 잠깐 비활성화

  // 4) Lenis 우선 스크롤
  const lenis = (window as any).__lenis as
    | InstanceType<typeof Lenis>
    | undefined;
  const duration = 1.1;

  if (lenis) {
    lenis.scrollTo(targetY, { duration, lock: true });
  } else {
    window.scrollTo({ top: targetY, behavior: "smooth" });
  }

  // 5) 스냅 ST 복구 (스크롤 끝났을 법한 시점 + 여유 120ms)
  window.setTimeout(() => {
    snapST?.enable();
  }, Math.round(duration * 1000) + 120);
}


function HeroHeader() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const heroInnerRef = useRef<HTMLDivElement | null>(null);

  const handleNav = useCallback(
    (targetId: string) => () => {
      scrollToSection(targetId);
    },
    []
  );

  useLayoutEffect(() => {
  const el = heroInnerRef.current;
  if (!el) return;

  // 초기 상태: 숨김
  gsap.set(el, { yPercent: -120, autoAlpha: 0, pointerEvents: "none" });

  let idleTimer: number | null = null;
  const clearIdle = () => { if (idleTimer) { clearTimeout(idleTimer); idleTimer = null; } };

  const show = () => {
    clearIdle();
    gsap.to(el, {
      yPercent: 0,
      autoAlpha: 1,
      duration: 0.28,
      ease: "power2.out",
      onStart: () => (el.style.pointerEvents = "auto"),
    });
  };

  const hide = () => {
    if (open) return; // 패널 열려 있으면 유지
    gsap.to(el, {
      yPercent: -120,
      autoAlpha: 0,
      duration: 0.42,
      ease: "power2.inOut",
      onComplete: () => (el.style.pointerEvents = "none"),
    });
  };

  const scheduleHide = (ms = 1000) => {
    clearIdle();
    idleTimer = window.setTimeout(() => {
      // hover/focus 중이면 유지
      const isHover = el.matches(":hover");
      const hasFocus = el.contains(document.activeElement);
      if (!isHover && !hasFocus) hide();
    }, ms);
  };

  // ScrollTrigger 글로벌 이벤트 사용
  const onStart = () => show();
  const onEnd = () => scheduleHide(900);

  ScrollTrigger.addEventListener("scrollStart", onStart);
  ScrollTrigger.addEventListener("scrollEnd", onEnd);

  // 헤더 마우스/포커스 인터랙션 시 항상 보이기
  const onEnter = () => show();
  const onLeave = () => scheduleHide(600);
  el.addEventListener("mouseenter", onEnter);
  el.addEventListener("focusin", onEnter);
  el.addEventListener("mouseleave", onLeave);
  el.addEventListener("focusout", onLeave);

  // 패널 상태가 바뀌면 즉시 반영 (열리면 표시/닫히면 일정후 숨김)
  if (open) show();
  else scheduleHide(600);

  return () => {
    ScrollTrigger.removeEventListener("scrollStart", onStart);
    ScrollTrigger.removeEventListener("scrollEnd", onEnd);
    el.removeEventListener("mouseenter", onEnter);
    el.removeEventListener("focusin", onEnter);
    el.removeEventListener("mouseleave", onLeave);
    el.removeEventListener("focusout", onLeave);
    clearIdle();
  };
}, [open]);


  useLayoutEffect(() => {
    // 버튼 맵: data-target 속성으로 조회
    const btns = Array.from(
      document.querySelectorAll<HTMLButtonElement>(".navlink[data-target]")
    );
    const btnMap = new Map<string, HTMLButtonElement>();
    btns.forEach((b) => {
      const key = b.getAttribute("data-target");
      if (key) btnMap.set(key, b);
    });

    const ids = ["p-arch", "p-profiles", "p-stack"];
    const triggers = ids.map((id) =>
      ScrollTrigger.create({
        trigger: document.getElementById(id)!,
        start: "top center",
        end: "bottom center",
        onToggle: (self) => {
          // 전부 false로 초기화
          btnMap.forEach((btn) => btn.setAttribute("aria-current", "false"));
          // 활성 구간의 버튼만 true
          if (self.isActive)
            btnMap.get(id)?.setAttribute("aria-current", "true");
        },
      })
    );

    return () => triggers.forEach((t) => t.kill());
  }, []);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!open) return;
      const t = e.target as Node;
      if (panelRef.current?.contains(t)) return;
      if (btnRef.current?.contains(t)) return;
      setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) setOpen(false);
    };
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="hero">
      <div className="hero__inner" ref={heroInnerRef}>
        {/* STEP 2) 좌측: 섹션 내비게이션 */}
        <nav className="hero__nav" aria-label="섹션 내비게이션">
          <button
            className="navlink"
            type="button"
            data-target="p-arch"
            onClick={handleNav("p-arch")}
          >
            Hello
          </button>
          <button
            className="navlink"
            type="button"
            data-target="p-profiles"
            onClick={handleNav("p-profiles")}
          >
            Profiles
          </button>
          <button
            className="navlink"
            type="button"
            data-target="p-stack"
            onClick={handleNav("p-stack")}
          >
            Stack
          </button>
        </nav>

        {/* STEP 3) 우측: GitHub 토글 + Velog 링크 */}
        <div className="hero__actions">
          {/* Velog: GitHub 오른쪽에 고정 링크 */}
          <a
            className="toggle toggle--link"
            href="https://velog.io/@kqk11"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Velog로 이동"
            style={{ marginRight: 8 }}
          >
            <img
              className="toggle__icon"
              src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1581345292/noticon/hbwtrewlv2xxxyqe3qpm.png"
              alt=""
              width={18}
              height={18}
              loading="lazy"
              decoding="async"
              style={{
                marginRight: 6,
                verticalAlign: "middle",
                objectFit: "contain",
              }}
            />
            <span className="toggle__label">Velog</span>
          </a>

          {/* GitHub 토글 패널 */}
          <button
            ref={btnRef}
            id="ghToggle"
            className="toggle"
            type="button"
            aria-expanded={open}
            aria-controls="ghPanel"
            onClick={(e) => {
              e.stopPropagation();
              setOpen((v) => !v);
            }}
          >
            <svg
              aria-hidden="true"
              width="18"
              height="18"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <path d="M8 .198a8 8 0 0 0-2.53 15.6c.4.074.55-.174.55-.388 0-.19-.007-.693-.01-1.36-2.24.487-2.71-1.08-2.71-1.08-.364-.924-.89-1.17-.89-1.17-.727-.497.055-.487.055-.487.803.056 1.225.825 1.225.825.715 1.225 1.873.871 2.33.666.073-.518.28-.872.508-1.073-1.787-.202-3.667-.894-3.667-3.978 0-.879.314-1.597.824-2.159-.083-.203-.357-1.02.078-2.127 0 0 .672-.215 2.2.824a7.63 7.63 0 0 1 2-.27c.68.003 1.37.092 2 .27 1.53-1.04 2.2-.824 2.2-.824.437 1.107.162 1.924.08 2.127.513.562.824 1.28.824 2.159 0 3.092-1.884 3.773-3.676 3.972.287.247.54.735.54 1.482 0 1.07-.01 1.933-.01 2.195 0 .215.146.466.553.387A8.002 8.002 0 0 0 8 .198z" />
            </svg>
            <span className="toggle__label">GitHub</span>
            <span className="toggle__chev" aria-hidden="true">
              ▾
            </span>
          </button>

          <div
            id="ghPanel"
            className="gh-panel"
            hidden={!open}
            ref={panelRef}
            role="dialog"
            aria-label="GitHub quick panel"
          >
            <div className="gh-panel__section">
              <p className="gh-panel__title">프로필</p>
              <a
                className="gh-link"
                href="https://github.com/qkjm1"
                target="_blank"
                rel="noopener noreferrer"
              >
                @qkjm1
              </a>
            </div>
            <div className="gh-panel__section">
              <p className="gh-panel__title">대표 레포지토리</p>
              <ul className="gh-repolist">
                <li>
                  <a
                    className="gh-link"
                    href="https://github.com/AniwellProject/AniwellProject"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Aniwell
                  </a>
                </li>
                <li>
                  <a
                    className="gh-link"
                    href="https://github.com/qkjm1/ptoject_25"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    PhysiClick
                  </a>
                </li>
                <li>
                  <a
                    className="gh-link"
                    href="https://github.com/qkjm1/dashboard"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    lingbo
                  </a>
                </li>
                <li>
                  <a
                    className="gh-link"
                    href="https://github.com/povi-project/povi-project"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    povi-project
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function HeroCopy() {
  return (
    <div
      className="hero-copy"
      role="banner"
      aria-label="포트폴리오 히어로 카피"
    >
      <h1 className="hero-copy__title">
        <span className="hero-copy__line">
          데이터·UX·AI를 잇는 창의적 엔지니어,
        </span>
        <span className="hero-copy__emph">개발자 김정민입니다.</span>
      </h1>
      <p className="hero-copy__sub">
        | Spring Boot · OpenAI API · python · Next.js · Three.js · node.js |
      </p>
    </div>
  );
}

function BackgroundSVG() {
  return (
    <svg
      id="area"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      width="1440"
      height="560"
      preserveAspectRatio="none"
      viewBox="0 0 1440 560"
    >
      <g mask="url(#SvgjsMask1330)" fill="none">
        <rect
          width="1440"
          height="560"
          x="0"
          y="0"
          fill="url(#SvgjsLinearGradient1331)"
        ></rect>

        <defs>
          <linearGradient
            id="cloud1-grad"
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1="0"
            x2="0"
            y2="560"
          >
            <stop offset="50%" stopColor="#E4004B" />
            <stop offset="90%" stopColor="#FAD691" />
          </linearGradient>
        </defs>
        <path
          id="cloud1"
          d="M1512 560L0 560 L0 339.71Q35.71 303.42, 72 339.14Q98.01 293.15, 144 319.17Q230.2 285.37, 264 371.57Q283.04 270.61, 384 289.65Q426.45 260.1, 456 302.54Q512.19 286.74, 528 342.93Q532.39 275.32, 600 279.71Q641.41 249.13, 672 290.54Q722.53 269.07, 744 319.6Q813.28 268.88, 864 338.16Q878.02 280.18, 936 294.2Q978.13 264.33, 1008 306.46Q1089.18 267.64, 1128 348.82Q1200.7 301.52, 1248 374.22Q1270.96 277.18, 1368 300.14Q1393.53 253.66, 1440 279.19Q1498.2 265.39, 1512 323.6z"
          fill="url(#cloud1-grad)"
        />

        <defs>
          <linearGradient
            id="cloud2-grad"
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1="0"
            x2="0"
            y2="560"
          >
            <stop offset="70%" stopColor="#ED775A" />
            <stop offset="95%" stopColor="#FAD691" />
          </linearGradient>
        </defs>
        <path
          id="cloud2"
          d="M1512 560L0 560 L0 390.18Q39.26 357.44, 72 396.7Q115.83 320.53, 192 364.37Q277.82 330.19, 312 416.01Q316.33 348.34, 384 352.67Q418.78 315.45, 456 350.22Q507.68 329.9, 528 381.59Q619.99 353.58, 648 445.57Q666.67 344.24, 768 362.9Q809.77 332.67, 840 374.44Q926.06 340.5, 960 426.57Q1006.21 352.78, 1080 399Q1162.82 361.81, 1200 444.63Q1247.32 371.94, 1320 419.26Q1341.62 368.88, 1392 390.5Q1476.32 354.81, 1512 439.13z"
          fill="url(#cloud2-grad)"
        />

        <defs>
          <linearGradient
            id="cloud3-grad"
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1="0"
            x2="0"
            y2="560"
          >
            <stop offset="80%" stopColor="#FAD691" />
            <stop offset="100%" stopColor="#fff" />
          </linearGradient>
        </defs>
        <path
          id="cloud3"
          d="M1464 560L0 560 L0 501.73Q59.12 440.85, 120 499.96Q124.09 432.05, 192 436.14Q242.85 366.99, 312 417.83Q399 384.83, 432 471.83Q470.87 390.7, 552 429.57Q593.93 399.5, 624 441.44Q671.69 417.13, 696 464.82Q780.22 429.04, 816 513.26Q816.88 442.14, 888 443.03Q913.61 396.63, 960 422.24Q1047.89 390.13, 1080 478.03Q1157.57 435.59, 1200 513.16Q1229.59 470.75, 1272 500.34Q1307.25 415.59, 1392 450.84Q1414.4 401.24, 1464 423.64z"
          fill="url(#cloud3-grad)"
        />
        <g id="cloud4Wrap" transform="translate(0, 200)">
          <defs>
            <linearGradient
              id="cloud4-grad"
              gradientUnits="userSpaceOnUse"
              x1="0"
              y1="0"
              x2="0"
              y2="560"
            >
              <stop offset="0%" stopColor="#C9CDCF" />
              <stop offset="50%" stopColor="#f8f7f6" />
            </linearGradient>
          </defs>
          <path
            id="cloud4"
            d="M1512 560L0 560 L0 339.71Q35.71 303.42, 72 339.14Q98.01 293.15, 144 319.17Q230.2 285.37, 264 371.57Q283.04 270.61, 384 289.65Q426.45 260.1, 456 302.54Q512.19 286.74, 528 342.93Q532.39 275.32, 600 279.71Q641.41 249.13, 672 290.54Q722.53 269.07, 744 319.6Q813.28 268.88, 864 338.16Q878.02 280.18, 936 294.2Q978.13 264.33, 1008 306.46Q1089.18 267.64, 1128 348.82Q1200.7 301.52, 1248 374.22Q1270.96 277.18, 1368 300.14Q1393.53 253.66, 1440 279.19Q1498.2 265.39, 1512 323.6z"
            fill="url(#cloud4-grad)"
          />
        </g>
      </g>

      <defs>
        <mask id="SvgjsMask1330">
          <rect width="1440" height="560" fill="#f8f7f6" />
        </mask>
        <linearGradient
          x1="50%"
          y1="0%"
          x2="50%"
          y2="100%"
          gradientUnits="userSpaceOnUse"
          id="SvgjsLinearGradient1331"
        >
          <stop stopColor="#ffff" offset="0"></stop>
          <stop stopColor="#ffff" offset="0.72"></stop>
          <stop stopColor="#ffff" offset="1"></stop>
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function App() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // Lenis (스무스 스크롤)
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
    });

    const raf = (t: number) => {
      lenis.raf(t);
      ScrollTrigger.update();
      requestAnimationFrame(raf);
    };
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!mq.matches) requestAnimationFrame(raf);

    const onChange = (e: MediaQueryListEvent) =>
      e.matches ? lenis.stop() : lenis.start();
    mq.addEventListener?.("change", onChange);

    return () => {
      mq.removeEventListener?.("change", onChange);
      lenis.destroy();
    };
  }, []);
  useEffect(() => {
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  // ✅ 페이지 스냅 (fullpage 대체) - 섹션별 pin
  useLayoutEffect(() => {
    const sections = gsap.utils.toArray<HTMLElement>("#snapper .snap-section");
    if (sections.length < 2) return;

    // 섹션별 pin 트리거 생성
    const triggers = sections.map((el, i) =>
      ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: "+=100%", // 정확히 1뷰포트 길이만큼 고정
        pin: true,
        pinSpacing: i !== sections.length - 1, // 마지막 섹션만 spacer 제거
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      })
    );

    // 진행도 기준 스냅(가까운 섹션 경계로)
    const snapST = ScrollTrigger.create({
      trigger: "#snapper",
      start: "top top",
      end: () =>
        "+=" + (sections.length * window.innerHeight - window.innerHeight),
      snap: {
        snapTo: (v) => {
          const n = sections.length - 1;
          return Math.round(v * n) / n;
        },
        duration: 0.5,
        delay: 0.03,
        ease: "power1.inOut",
      },
      invalidateOnRefresh: true,
    });

    return () => {
      snapST.kill();
      triggers.forEach((t) => t.kill());
    };
  }, []);

  // GSAP: 히어로 카피 첫 진입 애니메이션
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
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
    return () => ctx.revert();
  }, []);

  // GSAP: 히어로 SVG 패럴럭스 + Arch 섹션 애니메이션
  useLayoutEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const mm = gsap.matchMedia();
    const imgs = Array.from(
      document.querySelectorAll<HTMLImageElement>(".img-wrapper img")
    );
    const bgColors = ["#EDF9FF", "#FFECF2", "#FFE8DB"];

    // 히어로 패럴럭스
    const area = document.getElementById("area");
    const c1 = document.getElementById("cloud1");
    const c2 = document.getElementById("cloud2");
    const c3 = document.getElementById("cloud3");
    const c4 = document.getElementById("cloud4");

    const heroTl =
      area &&
      gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: area,
          start: "top top",
          end: () => "+=" + Math.round(window.innerHeight * 1.5),
          scrub: true,
        },
      });

    if (heroTl) {
      heroTl
        .fromTo(c1, { y: 65 }, { y: -120 }, -0.1)
        .fromTo(c2, { y: 60 }, { y: -140 }, -0.4)
        .fromTo(c3, { y: 50 }, { y: -180 }, -0.1)
        .fromTo(c4, { y: 20 }, { y: -140 }, -0.1);
    }

    // 이미지 z-index
    document
      .querySelectorAll<HTMLElement>(".arch__right .img-wrapper")
      .forEach((el) => {
        const order = el.getAttribute("data-index");
        if (order != null) el.style.zIndex = order;
      });

    // 모바일 레이아웃 순서
    const handleMobileLayout = () => {
      const isMobile = window.matchMedia("(max-width: 768px)").matches;
      const leftItems = Array.from(
        document.querySelectorAll<HTMLElement>(".arch__left .arch__info")
      );
      const rightItems = Array.from(
        document.querySelectorAll<HTMLElement>(".arch__right .img-wrapper")
      );
      if (isMobile) {
        leftItems.forEach((item, i) => (item.style.order = String(i * 2)));
        rightItems.forEach((item, i) => (item.style.order = String(i * 2 + 1)));
      } else {
        [...leftItems, ...rightItems].forEach(
          (item) => (item.style.order = "")
        );
      }
    };
    handleMobileLayout();
    const onResize = () => {
      ScrollTrigger.refresh();
      handleMobileLayout();
    };
    window.addEventListener("resize", onResize);

    // Arch 섹션
    mm.add(
      {
        isDesktop: "(min-width: 769px)",
        isMobile: "(max-width: 768px)",
      },
      (ctx) => {
        const { isDesktop } = ctx.conditions!;
        if (isDesktop) {
          const mainTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: ".arch",
              start: "top top",
              end: "bottom bottom",
              scrub: true,
            },
          });

          gsap.set(imgs, { clipPath: "inset(0)", objectPosition: "0px 0%" });

          imgs.forEach((_, index) => {
            const currentImage = imgs[index];
            const nextImage = imgs[index + 1] || null;

            const sectionTimeline = gsap.timeline();
            if (nextImage) {
              sectionTimeline
                .to(
                  "body",
                  {
                    backgroundColor: bgColors[index],
                    duration: 1.5,
                    ease: "power2.inOut",
                  },
                  0
                )
                .to(
                  currentImage,
                  {
                    clipPath: "inset(0px 0px 100%)",
                    objectPosition: "0px 60%",
                    duration: 1.5,
                    ease: "none",
                  },
                  0
                )
                .to(
                  nextImage,
                  { objectPosition: "0px 40%", duration: 1.5, ease: "none" },
                  0
                );
            }
            mainTimeline.add(sectionTimeline);
          });
        } else {
          const mbTimeline = gsap.timeline();
          gsap.set(imgs, { objectPosition: "0px 60%" });

          imgs.forEach((image, index) => {
            const innerTimeline = gsap.timeline({
              scrollTrigger: {
                trigger: image,
                start: "top-=70% top+=50%",
                end: "bottom+=200% bottom",
                scrub: true,
              },
            });

            innerTimeline
              .to(image, {
                objectPosition: "0px 30%",
                duration: 5,
                ease: "none",
              })
              .to("body", {
                backgroundColor: bgColors[index],
                duration: 1.5,
                ease: "power2.inOut",
              });

            mbTimeline.add(innerTimeline);
          });
        }
      }
    );

    return () => {
      window.removeEventListener("resize", onResize);
      mm.revert();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <main>
      {/* 0. 인트로(자유 스크롤) */}
      <div id="section" className="section" ref={sectionRef}>
        <HeroHeader />
        <HeroCopy />
        <BackgroundSVG />
      </div>

      {/* 1~N. 스냅 페이지 컨테이너 */}
      <div id="snapper">
        {/* 1) Arch 섹션 (핀/애니메이션 있음 → 스냅 제외하고 싶으면 no-snap 클래스를 더 주세요) */}

        <section className="snap-section" id="p-arch">
          {/* 필요하다면 상하 spacer를 재배치 */}
          <ArchSection />
        </section>

        {/* 2) Profiles */}
        <section className="snap-section" id="p-profiles">
          <OuterSection />
        </section>

        <section className="snap-section" id="p-stack">
          <header className="stack-header">
            <h2 className="stack-title">Skill & Stack</h2>
          </header>
          <StackSection />
        </section>

        <div className="spacer"></div>

        <div className="spacer"></div>
        {/* 3) 추가 페이지들 */}
        {/* <section className="snap-section" id="p-skills">...</section>
            <section className="snap-section" id="p-contact">...</section> */}
      </div>
    </main>
  );
}
