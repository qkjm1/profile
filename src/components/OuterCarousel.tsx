"use client";
//src/components/OuterCarousel.tsx

import React, { useMemo, useRef, useState, useEffect } from "react";
import "./css/outer-carousel.css";

export type PanelItem = {
  id: string | number;
  image: string; // 패널 배경 이미지 (필수)
  title?: string; // 패널 위에 보여줄 제목(옵션)
  text?: string; // 패널 위에 보여줄 텍스트(옵션)
  href?: string; // 패널 클릭시 이동할 링크(옵션)
};

type Props = {
  items: PanelItem[];
  /** 한 화면(슬라이드) 당 패널 개수 — CodePen 느낌은 3 */
  perSlide?: 3 | 2 | 1;
  /** 패널 높이(px) */
  panelHeight?: number;
  /** 컨테이너 최대폭(px) */
  maxWidth?: number;
  /** 자동 넘김(ms). 0이면 자동 슬라이드 없음 */
  autoplayMs?: number;
};

export default function OuterCarousel({
  items,
  perSlide = 3,
  panelHeight = 300,
  maxWidth = 1024,
  autoplayMs = 0,
}: Props) {
  const pages = useMemo(() => {
    const chunked: PanelItem[][] = [];
    for (let i = 0; i < items.length; i += perSlide) {
      chunked.push(items.slice(i, i + perSlide));
    }
    return chunked.length ? chunked : [[]];
  }, [items, perSlide]);

  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const go = (next: number) => {
    const n = (next + pages.length) % pages.length;
    setIndex(n);
  };
  const prev = () => go(index - 1);
  const next = () => go(index + 1);

  // 자동 슬라이드 (옵션)
  useEffect(() => {
    if (!autoplayMs) return;
    const t = setInterval(next, autoplayMs);
    return () => clearInterval(t);
  }, [index, autoplayMs, pages.length]);

  // 키보드 ← →
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, pages.length]);

  return (
    <div
      className="oc-wrapper"
      style={{ ["--ocMaxW" as any]: `${maxWidth}px` }}
    >
      {/* 도트 내비게이션 */}
      <div className="oc-dots" role="tablist" aria-label="carousel pagination">
        {pages.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === index}
            aria-label={`${i + 1} 페이지로 이동`}
            className={`oc-dot ${i === index ? "is-active" : ""}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>

      <div className="oc-row">
        {/* 왼쪽 외부 화살표 */}
        <button
          className="oc-outer-btn oc-outer-btn--left"
          aria-label="이전"
          onClick={prev}
        >
          <svg viewBox="0 0 129 129" aria-hidden>
            <path d="m88.6,121.3c0.8,0.8 1.8,1.2 2.9,1.2s2.1-0.4 2.9-1.2c1.6-1.6 1.6-4.2 0-5.8l-51-51 51-51c1.6-1.6 1.6-4.2 0-5.8s-4.2-1.6-5.8,0l-54,53.9c-1.6,1.6-1.6,4.2 0,5.8l54,53.9z" />
          </svg>
        </button>

        {/* 중앙 캐러셀 뷰포트 */}
        <div className="oc-viewport" ref={containerRef}>
          <div
            className="oc-track"
            style={{
              width: `${pages.length * 100}%`,
              transform: `translateX(-${(100 / pages.length) * index}%)`,
            }}
          >
            {pages.map((page, pi) => (
              <div
                className="oc-slide"
                key={`slide-${pi}`}
                style={{ ["--ocPanelH" as any]: `${panelHeight}px` }}
              >
                {page.map((card) => {
                  const body = (
                    <>
                      <div
                        className="oc-card-bg"
                        style={{ backgroundImage: `url("${card.image}")` }}
                        aria-hidden
                      />
                      {(card.title || card.text) && (
                        <div className="oc-card-overlay">
                          {card.title && (
                            <h3 className="oc-card-title">{card.title}</h3>
                          )}
                          {card.text && (
                            <p className="oc-card-text">{card.text}</p>
                          )}
                        </div>
                      )}
                    </>
                  );
                  return (
                    <div className="oc-card" key={card.id}>
                      {card.href ? (
                        <a
                          className="oc-card-link"
                          href={card.href}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {body}
                        </a>
                      ) : (
                        body
                      )}
                    </div>
                  );
                })}
                {/* 페이지에 카드가 부족하면 빈 칸 채우기(정렬 유지) */}
                {page.length < perSlide &&
                  Array.from({ length: perSlide - page.length }).map((_, i) => (
                    <div
                      className="oc-card oc-card--empty"
                      key={`empty-${i}`}
                    />
                  ))}
              </div>
            ))}
          </div>
        </div>

        {/* 오른쪽 외부 화살표 */}
        <button
          className="oc-outer-btn oc-outer-btn--right"
          aria-label="다음"
          onClick={next}
        >
          <svg viewBox="0 0 129 129" aria-hidden>
            <path d="m40.4,121.3c-0.8,0.8-1.8,1.2-2.9,1.2s-2.1-0.4-2.9-1.2c-1.6-1.6-1.6-4.2 0-5.8l51-51-51-51c-1.6-1.6-1.6-4.2 0-5.8 1.6-1.6 4.2-1.6 5.8,0l53.9,53.9c1.6,1.6 1.6,4.2 0,5.8l-53.9,53.9z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
