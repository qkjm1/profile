import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import "./css/profile-slider.css";

export type ProfileItem = {
  id: string;
  name: string;
  avatar: string;
  desc: string;
  role?: string;
  theme?: string;
  handle?: { url: string; label: string };
};

type Props = {
  items: ProfileItem[];
  fullscreen?: boolean;
  colorfulBg?: boolean;
  /** 한 화면에 보일 카드 개수 (1~4) */
  perView?: number;
  /** 카드 사이 간격(px) */
  gap?: number;
};

export default function ProfileSlider({
  items,
  fullscreen = true,
  colorfulBg,
  perView = 1,
  gap = 24,
}: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [active, setActive] = useState(0);
  const animatingRef = useRef(false);
  const armedRef = useRef(false); // ⬅️ 섹션이 뷰에 들어와야 조작 가능

  // 최초 카드 살짝 페이드업
  useLayoutEffect(() => {
    const cards = trackRef.current?.querySelectorAll(".pcard");
    if (!cards) return;
    gsap.from(cards, {
      opacity: 0,
      y: 24,
      duration: 0.6,
      stagger: 0.05,
      ease: "power2.out",
      clearProps: "opacity,transform",
    });
  }, []);

  // 섹션이 뷰포트에 들어오면 armed = true
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          armedRef.current = en.isIntersecting;
        });
      },
      { threshold: 0.25 } // 카드의 25%가 들어오면 활성화
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // perView 보정 및 최대 인덱스 계산
  const pv = Math.max(1, Math.min(4, perView));
  const maxIndex = Math.max(0, items.length - pv);

  const goto = (idx: number) => {
    if (!armedRef.current) return; // ⬅️ 아직 섹션이 화면에 없으면 무시
    const track = trackRef.current;
    if (!track || animatingRef.current) return;
    const next = Math.max(0, Math.min(maxIndex, idx));

    animatingRef.current = true;
    gsap.to(track, {
      xPercent: -(100 / pv) * next,
      duration: 0.7,
      ease: "power3.inOut",
      onComplete: () => {
        animatingRef.current = false;
        setActive(next);
      },
    });
  };
  const slideBy = (dir: number) => goto(active + dir);

  // ✋ 휠 리스너 제거 — 버튼/스와이프만
  useLayoutEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;

    let startX = 0;

    const onTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!armedRef.current) return;
      // 수평 스와이프만 캐치
      const dx = e.touches[0].clientX - startX;
      if (Math.abs(dx) < 40) return;
      e.preventDefault(); // ⬅️ 가로 스와이프는 우리가 처리
      slideBy(dx < 0 ? 1 : -1);
      startX = e.touches[0].clientX;
    };

    // wheel 이벤트는 등록하지 않습니다.
    vp.addEventListener("touchstart", onTouchStart, { passive: true });
    vp.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => {
      vp.removeEventListener("touchstart", onTouchStart);
      vp.removeEventListener("touchmove", onTouchMove);
    };
  }, [active, pv, maxIndex]);

  // 키보드 ← →
  const onKeyDown: React.KeyboardEventHandler = (e) => {
    if (!armedRef.current) return;
    if (e.key === "ArrowRight") slideBy(1);
    if (e.key === "ArrowLeft") slideBy(-1);
  };

  if (!items?.length) {
    return (
      <section className="ps">
        <div className="ps__empty">프로필 데이터가 없습니다.</div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className={`ps ${fullscreen ? "ps--fullscreen" : ""} ${
        colorfulBg ? "ps--bg" : ""
      }`}
      aria-roledescription="carousel"
      aria-label="profiles"
      onKeyDown={onKeyDown}
      tabIndex={0}
      // perView, gap을 CSS 변수로 전달 → 순수 CSS만으로 너비 계산
      style={
        {
          ["--per-view" as any]: pv,
          ["--gap" as any]: `${gap}px`,
        } as React.CSSProperties
      }
    >
      <button
        aria-label="이전"
        className="ps__nav ps__nav--prev"
        onClick={() => slideBy(-1)}
      >
        ‹
      </button>

      <div className="ps__viewport" ref={viewportRef}>
        <div
          className="ps__track"
          ref={trackRef}
          style={{ transform: `translateX(calc(-${(100 / pv) * active}%))` }}
        >
          {items.map((it, i) => (
            <div
              className="ps__slide"
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} / ${items.length}`}
              key={`${it.id}-${i}`}
            >
              <article className={`pcard theme-${it.theme ?? "sun"}`}>
                <div className="pcard__head">
                  <h3 className="pcard__title">{it.name}</h3>
                  {it.role && <span className="pcard__tag">{it.role}</span>}
                </div>
                <div className="pcard__body">
                  <figure className="pcard__avatar">
                    <img src={it.avatar} alt={`${it.name} avatar`} />
                  </figure>
                  <div className="pcard__text">
                    <p className="pcard__desc">{it.desc}</p>
                    {it.handle && (
                      <a
                        className="pcard__handle"
                        href={it.handle.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {it.handle.label}
                      </a>
                    )}
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>

      <button
        aria-label="다음"
        className="ps__nav ps__nav--next"
        onClick={() => slideBy(1)}
      >
        ›
      </button>

      <div className="ps__dots" aria-hidden="true">
        {items.map((_, i) => (
          <button
            key={i}
            className={`ps__dot ${
              i >= active && i < active + pv ? "is-active" : ""
            }`}
            onClick={() => goto(i)}
          />
        ))}
      </div>
    </section>
  );
}
