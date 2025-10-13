// src/components/arch/RightScrollPanel.tsx
"use client";
import React, { useEffect, useRef, useState } from "react";

export type RightPanelItem = {
  name: string;
  school?: string;
  email?: string;
  desc?: string;
  bullets?: string[];
};

export default function RightScrollPanel({ items }: { items: RightPanelItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  // ✅ NodeJS.Timeout → ReturnType<typeof ...> 로 교체
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const inactivityRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (paused) return;

    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, 5000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [paused, items.length]);

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

  return (
    <div className="rpanel">
      <div className="rpanel__viewport">
        {items.map((it, idx) => (
          <article
            key={it.name + idx}
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
          </article>
        ))}
      </div>

      <div className="rpanel__nav">
        {items.map((_, i) => (
          <button
            key={i}
            className={`rpanel__dot ${i === activeIndex ? "is-active" : ""}`}
            onClick={() => handleNavClick(i)}
          />
        ))}
      </div>
    </div>
  );
}
