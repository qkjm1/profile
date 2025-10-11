//src/components/OuterCarousel.tsx
import React, { useMemo, useRef, useState, useEffect } from "react";
import "../outer/css/outer-carousel.css";
import InstaModal, { MediaItem, ModalBlock } from "./InstaModal";


// ✅ PanelItem에 blocks 추가
export type PanelItem = {
  id: string | number;
  image: string;
  title?: string;
  text?: string;
  href?: string;
  media?: MediaItem[];      // (기존) 모달 좌측 갤러리
  blocks?: ModalBlock[];    // (신규) 모달 내부 (사진+설명) 세트 슬라이드
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

  // --- 모달 상태 ---
  const [isOpen, setIsOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState<number>(0); // items 기준 index

  // 카드 클릭 → 모달 오픈
  const openModal = (globalIdx: number) => {
    setActiveIdx(globalIdx);
    setIsOpen(true);
    // 바디 스크롤 잠금
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

  // 키보드 ← → & ESC (모달 열렸을 때는 모달 내 네비/닫기)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (isOpen) {
        if (e.key === "Escape") closeModal();
        if (e.key === "ArrowLeft") gotoPrevItem();
        if (e.key === "ArrowRight") gotoNextItem();
        return;
      }
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, index, pages.length]);

  // items의 전역 인덱스를 계산(페이지/열 기반)
  const getGlobalIndex = (pi: number, col: number) => {
    const base = pi * perSlide;
    return base + col;
  };

  return (
    <div className="oc-wrapper" style={{ ["--ocMaxW" as any]: `${maxWidth}px` }}>
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
        <button className="oc-outer-btn oc-outer-btn--left" aria-label="이전" onClick={prev}>
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
                      {/* a태그로 외부 이동하던 기존 UX는 모달 내부의 '열기' 버튼로 대체 */}
                      {body}
                    </div>
                  );
                })}
                {/* 빈칸 채우기 */}
                {page.length < perSlide &&
                  Array.from({ length: perSlide - page.length }).map((_, i) => (
                    <div className="oc-card oc-card--empty" key={`empty-${i}`} />
                  ))}
              </div>
            ))}
          </div>
        </div>

        {/* 오른쪽 외부 화살표 */}
        <button className="oc-outer-btn oc-outer-btn--right" aria-label="다음" onClick={next}>
          <svg viewBox="0 0 129 129" aria-hidden>
            <path d="m40.4,121.3c-0.8,0.8-1.8,1.2-2.9,1.2s-2.1-0.4-2.9-1.2c-1.6-1.6-1.6-4.2 0-5.8l51-51-51-51c-1.6-1.6-1.6-4.2 0-5.8 1.6-1.6 4.2-1.6 5.8,0l53.9,53.9c1.6,1.6 1.6,4.2 0,5.8l-53.9,53.9z" />
          </svg>
        </button>
      </div>

      {/* 인스타 PC 스타일 모달 */}
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
