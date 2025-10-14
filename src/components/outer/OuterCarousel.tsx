// src/components/OuterCarousel.tsx
import React, { useMemo, useRef, useState, useEffect } from "react";
import "../outer/css/outer-carousel.css";
import InstaModal, { MediaItem, ModalBlock } from "./InstaModal";

export type PanelItem = {
  id: string | number;
  image: string;
  title?: string;
  text?: string;
  href?: string;
  media?: MediaItem[];
  blocks?: ModalBlock[];
};

type Props = {
  items: PanelItem[];
  perSlide?: 3 | 2 | 1;
  panelHeight?: number;
  maxWidth?: number;
  autoplayMs?: number;
};

export default function OuterCarousel({
  items,
  perSlide = 3,
  panelHeight = 300,
  maxWidth = 1024,
  autoplayMs = 0,
}: Props) {
  // 🔻 반응형: 폭 <= 900px이면 페이지당 1개
const [cols, setCols] = useState(perSlide);
useEffect(() => {
  const handleResize = () => {
    setCols(window.innerWidth <= 900 ? 1 : perSlide);
  };
  handleResize();
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, [perSlide]);

const pages = useMemo(() => {
  const chunked: PanelItem[][] = [];
  for (let i = 0; i < items.length; i += cols) {
    chunked.push(items.slice(i, i + cols));
  }
  return chunked.length ? chunked : [[]];
}, [items, cols]);

  const [index, setIndex] = useState(0);
  // cols 바뀌면(화면 크기 변경) 첫 페이지로
  useEffect(() => { setIndex(0); }, [cols]);

  const containerRef = useRef<HTMLDivElement>(null);

  const go = (next: number) => setIndex((next + pages.length) % pages.length);
  const prev = () => go(index - 1);
  const next = () => go(index + 1);

  // --- 모달 상태 ---
  const [isOpen, setIsOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState<number>(0);

  const openModal = (globalIdx: number) => {
    setActiveIdx(globalIdx);
    setIsOpen(true);
    document.documentElement.style.overflow = "hidden";
  };
  const closeModal = () => {
    setIsOpen(false);
    document.documentElement.style.overflow = "";
  };
  const gotoPrevItem = () => setActiveIdx((i) => (i - 1 + items.length) % items.length);
  const gotoNextItem = () => setActiveIdx((i) => (i + 1) % items.length);

  // 자동 슬라이드
  useEffect(() => {
    if (!autoplayMs) return;
    const t = setInterval(next, autoplayMs);
    return () => clearInterval(t);
  }, [index, autoplayMs, pages.length]);

  // 전역 인덱스(페이지/열 기반)
  const getGlobalIndex = (pi: number, col: number) => pi * cols + col;

  return (
    <div className="oc-wrapper" style={{ ["--ocMaxW" as any]: `${maxWidth}px` }}>
      {/* 도트 내비 */}
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
        <button className="oc-outer-btn oc-outer-btn--left" aria-label="이전" onClick={prev}>
          <svg viewBox="0 0 129 129" aria-hidden>
            <path d="m88.6,121.3c0.8,0.8 1.8,1.2 2.9,1.2s2.1-0.4 2.9-1.2c1.6-1.6 1.6-4.2 0-5.8l-51-51 51-51c1.6-1.6 1.6-4.2 0-5.8s-4.2-1.6-5.8,0l-54,53.9c-1.6,1.6-1.6,4.2 0,5.8l54,53.9z" />
          </svg>
        </button>

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
                {page.map((card, colIdx) => {
                  const body = (
                    <>
                      <div
                        className="oc-card-bg"
                        style={{ backgroundImage: `url("${card.image}")` }}
                        aria-hidden
                      />
                      {(card.title || card.text) && (
                        <div className="oc-card-overlay">
                          {card.title && <h3 className="oc-card-title">{card.title}</h3>}
                          {card.text && <p className="oc-card-text">{card.text}</p>}
                        </div>
                      )}
                    </>
                  );
                  const globalIdx = getGlobalIndex(pi, colIdx);
                  return (
                    <div
                      className="oc-card"
                      key={card.id}
                      onClick={() => openModal(globalIdx)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") openModal(globalIdx);
                      }}
                    >
                      {body}
                    </div>
                  );
                })}
                {/* 빈칸 채우기 */}
                {page.length < cols &&
                  Array.from({ length: cols - page.length }).map((_, i) => (
                    <div className="oc-card oc-card--empty" key={`empty-${i}`} />
                  ))}
              </div>
            ))}
          </div>
        </div>

        <button className="oc-outer-btn oc-outer-btn--right" aria-label="다음" onClick={next}>
          <svg viewBox="0 0 129 129" aria-hidden>
            <path d="m40.4,121.3c-0.8,0.8-1.8,1.2-2.9,1.2s-2.1-0.4-2.9-1.2c-1.6-1.6-1.6-4.2 0-5.8l51-51-51-51c-1.6-1.6-1.6-4.2 0-5.8 1.6-1.6 4.2-1.6 5.8,0l53.9,53.9c1.6,1.6 1.6,4.2 0,5.8l-53.9,53.9z" />
          </svg>
        </button>
      </div>

      {isOpen && (
        <InstaModal
          items={items}
          activeIndex={activeIdx}
          onClose={closeModal}
          onPrev={gotoPrevItem}
          onNext={gotoNextItem}
        />
      )}
    </div>
  );
}
