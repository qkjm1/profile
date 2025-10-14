// src/components/arch/RightScrollPanel.tsx
"use client";
import React, { useEffect, useRef, useState } from "react";

export type RightPanelItem = {
  name: string;
  school?: string;
  email?: string;
  desc?: string;
  bullets?: string[];
  desc2?: string;
};

export default function RightScrollPanel({ items }: { items: RightPanelItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const inactivityRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // 자동 전환 (5초)
  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, 5000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = null;
    };
  }, [paused, items.length]);

  // 네비 클릭 시 5초 일시정지 후 재개
  const handleNavClick = (idx: number) => {
    setActiveIndex(idx);
    setPaused(true);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (inactivityRef.current) {
      clearTimeout(inactivityRef.current);
      inactivityRef.current = null;
    }
    inactivityRef.current = setTimeout(() => setPaused(false), 5000);
  };

  // 🔻 마우스 hover 시 자동 슬라이드 일시정지
  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;

    const onEnter = () => setPaused(true);
    const onLeave = () => setPaused(false);

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={panelRef}
      className="rpanel"
      data-paused={paused ? "true" : "false"}
    >
      {/* 카드 뷰포트 */}
      <div className="rpanel__viewport" role="region" aria-live="polite">
        {items.map((it, idx) => (
          <article
            key={(it.name || "slide") + idx}
            className={`intro-card slide ${idx === activeIndex ? "is-active" : ""}`}
            style={{
              transform:
                idx === activeIndex
                  ? "translateY(0)"
                  : idx < activeIndex
                  ? "translateY(-100%)"
                  : "translateY(100%)",
              opacity: idx === activeIndex ? 1 : 0,
            }}
          >
            {it.name && <h2 className="intro-card__title">{it.name}</h2>}
            {it.school && <p className="intro-card__school">{it.school}</p>}
            {it.email && (
              <a href={`mailto:${it.email}`} className="intro-card__email">
                {it.email}
              </a>
            )}
            {it.desc && <p className="intro-card__desc">{it.desc}</p>}
            {it.bullets?.length ? (
              <ul className="intro-card__list">
                {it.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            ) : null}
           {it.desc2 && (
                <div className="intro-card__desc desc2" role="region" aria-label="상세 설명">
            <p>{it.desc2}</p>
            </div>
           )}
          </article>
        ))}
      </div>

      {/* 세로 네비게이션 */}
      <nav className="rnav" aria-label="슬라이드 네비게이션">
        {items.map((it, i) => {
          const active = i === activeIndex;
          return (
            <button
              key={i}
              className={`rnav__btn ${active ? "is-active" : ""}`}
              onClick={() => handleNavClick(i)}
              aria-current={active ? "true" : undefined}
              aria-label={it.name ? `이동: ${it.name}` : `이동: ${i + 1}번`}
            >
              <span className="rnav__bar" aria-hidden>
                <span className="rnav__barProgress" />
              </span>
              <span className="rnav__label">{it.name || `Section ${i + 1}`}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
