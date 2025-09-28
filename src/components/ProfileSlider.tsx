import React, { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./css/profile-slider.css";

export type ProfileItem = {
  id: string;
  name: string;
  role?: string;
  desc: string;
  handle?: { label: string; url: string };
  avatar: string;
  theme?: "sun" | "rose" | "coral" | "cloud";
};

type Props = {
  items: ProfileItem[];
  fullscreen?: boolean;
  colorfulBg?: boolean;
};

export default function ProfileSlider({
  items,
  fullscreen = true,
  colorfulBg,
}: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);   // ✅ 새로 추가
  const trackRef = useRef<HTMLDivElement>(null);

  const [active, setActive] = useState(0);
  const animatingRef = useRef(false);

  // 최초 살짝 페이드업
  useLayoutEffect(() => {
    const cards = trackRef.current?.querySelectorAll(".pcard");
    if (!cards) return;
    gsap.from(cards, { opacity: 0, y: 24, duration: 0.6, stagger: 0.05, ease: "power2.out" });
  }, []);

  const goto = (idx: number) => {
    const track = trackRef.current;
    if (!track || animatingRef.current) return;
    const next = Math.max(0, Math.min(items.length - 1, idx));

    animatingRef.current = true;
    gsap.to(track, {
      xPercent: -100 * next,
      duration: 0.7,
      ease: "power3.inOut",
      onComplete: () => {
        animatingRef.current = false;
        setActive(next);
      },
    });
  };
  const slideBy = (dir: number) => goto(active + dir);

  // ✅ 휠/터치 리스너를 수동으로 등록 (passive: false)
  useLayoutEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;

    let startX = 0;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault(); // ✅ 이제 가능
      const move = Math.abs(e.deltaX) + Math.abs(e.deltaY);
      if (move < 15) return;
      slideBy(e.deltaY > 0 || e.deltaX > 0 ? 1 : -1);
    };

    const onTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
    };
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault(); // ✅ 이제 가능
      const dx = e.touches[0].clientX - startX;
      if (Math.abs(dx) < 40) return;
      slideBy(dx < 0 ? 1 : -1);
      startX = e.touches[0].clientX;
    };

    vp.addEventListener("wheel", onWheel, { passive: false });
    vp.addEventListener("touchstart", onTouchStart, { passive: true });
    vp.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      vp.removeEventListener("wheel", onWheel);
      vp.removeEventListener("touchstart", onTouchStart);
      vp.removeEventListener("touchmove", onTouchMove);
    };
  }, [active]);

  const onKeyDown: React.KeyboardEventHandler = (e) => {
    if (e.key === "ArrowRight") slideBy(1);
    if (e.key === "ArrowLeft") slideBy(-1);
  };

  if (!items?.length) {
    return <section className="ps"><div className="ps__empty">프로필 데이터가 없습니다.</div></section>;
  }

  return (
    <section
      ref={sectionRef}
      className={`ps ${fullscreen ? "ps--fullscreen" : ""} ${colorfulBg ? "ps--bg" : ""}`}
      aria-roledescription="carousel"
      aria-label="profiles"
      onKeyDown={onKeyDown}
      tabIndex={0}
    >
      <button aria-label="이전" className="ps__nav ps__nav--prev" onClick={() => slideBy(-1)}>‹</button>

      {/* ✅ JSX에서 onWheel/onTouchXX 제거, ref만 둠 */}
      <div className="ps__viewport" ref={viewportRef}>
        <div
          className="ps__track"
          ref={trackRef}
          style={{ transform: `translateX(${-100 * active}%)` }}
        >
          {items.map((it, i) => (
            <div className="ps__slide" role="group" aria-roledescription="slide" aria-label={`${i + 1} / ${items.length}`} key={it.id}>
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
                      <a className="pcard__handle" href={it.handle.url} target="_blank" rel="noreferrer">
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

      <button aria-label="다음" className="ps__nav ps__nav--next" onClick={() => slideBy(1)}>›</button>

      <div className="ps__dots" aria-hidden="true">
        {items.map((_, i) => (
          <button key={i} className={`ps__dot ${i === active ? "is-active" : ""}`} onClick={() => goto(i)} />
        ))}
      </div>
    </section>
  );
}
