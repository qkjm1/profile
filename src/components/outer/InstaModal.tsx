// src/components/InstaModal.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import "../outer/css/outer-carousel.css";

/** 개별 미디어(이미지/영상) */
export type MediaItem = {
  src: string;
  type?: "image" | "video";
};

/** 모달 내부에서 좌(미디어들)-우(설명) 한 쌍을 이루는 "블록" */
export type ModalBlock = {
  media: MediaItem[];
  title?: string;
  text?: string;
  href?: string;
};

/** 캐러셀 아이템이 모달에 넘겨주는 데이터 */
export type ModalPanel = {
  id: string | number;
  image: string;
  title?: string;
  text?: string;
  href?: string;
  media?: MediaItem[];
  blocks?: ModalBlock[];
};

type Props = {
  items: ModalPanel[];
  activeIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

function inferType(src: string): "image" | "video" {
  const vExt = [".mp4", ".webm", ".ogg", ".mov"];
  const lower = src.toLowerCase();
  return vExt.some((ext) => lower.endsWith(ext)) ? "video" : "image";
}

export default function InstaModal({
  items,
  activeIndex,
  onClose,
  onPrev: _onPrev,   // 미사용 경고 방지
  onNext: _onNext,   // 미사용 경고 방지
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);

  // 현재 카드
  const active = items[activeIndex];

  // blocks 계산 (없으면 레거시 필드로 1개 블록 자동 구성)
  const blocks: ModalBlock[] = useMemo(() => {
    if (active?.blocks && active.blocks.length) return active.blocks;

    const gallery =
      active?.media?.length
        ? active.media
        : active?.image
        ? [{ src: active.image, type: inferType(active.image) }]
        : [];

    return [
      {
        media: gallery,
        title: active?.title,
        text: active?.text,
        href: active?.href,
      },
    ];
  }, [active]);

  // 모달 내부 인덱스
  const [blockIdx, setBlockIdx] = useState(0);
  const [mediaIdx, setMediaIdx] = useState(0);

  // 카드 바뀌면 초기화
  useEffect(() => {
    setBlockIdx(0);
    setMediaIdx(0);
  }, [activeIndex]);

  // 블록 바뀌면 미디어도 초기화
  useEffect(() => {
    setMediaIdx(0);
  }, [blockIdx]);

  // ✅ blocks 계산 이후에 블록 네비 함수 정의
  const prevBlock = () =>
    setBlockIdx((i) => (i - 1 + blocks.length) % blocks.length);
  const nextBlock = () =>
    setBlockIdx((i) => (i + 1) % blocks.length);

  const cur = blocks[blockIdx] ?? { media: [] };
  const gallery = cur.media ?? [];
  const curMedia = gallery[mediaIdx];

  // ===== 스와이프(드래그) 상태 =====
  const startX = useRef<number | null>(null);
  const deltaX = useRef(0);
  const dragging = useRef(false);

  const onPointerDown = (clientX: number) => {
    startX.current = clientX;
    deltaX.current = 0;
    dragging.current = true;
  };
  const onPointerMove = (clientX: number) => {
    if (!dragging.current || startX.current === null) return;
    deltaX.current = clientX - startX.current;
  };
  const onPointerUp = () => {
    if (!dragging.current) return;
    dragging.current = false;
    const threshold = 40;
    if (deltaX.current > threshold) prevBlock();
    else if (deltaX.current < -threshold) nextBlock();
    startX.current = null;
    deltaX.current = 0;
  };

  // 이미지 영역 포커스시에만 ←/→ 처리 (부모로 전파 차단)
  const onMediaKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.stopPropagation(); e.preventDefault(); prevBlock();
    } else if (e.key === "ArrowRight") {
      e.stopPropagation(); e.preventDefault(); nextBlock();
    }
  };

  // 모달 전체: ESC만 처리
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const onBackdrop = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="imodal-backdrop" onMouseDown={onBackdrop} aria-modal role="dialog">
      <div className="imodal" ref={wrapRef} tabIndex={-1}>
        <div className="imodal-left">
          {/* 좌/우 큰 화살표 = 블록 전환 */}
          {blocks.length > 1 && (
            <button
              className="imodal-nav imodal-nav--left"
              onClick={(e) => { e.stopPropagation(); prevBlock(); }}
              aria-label="이전 세트" title="이전(←)"
            >
              <svg viewBox="0 0 24 24" aria-hidden><path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
            </button>
          )}

          <div
            className="imodal-media"
            tabIndex={0}
            onKeyDown={onMediaKeyDown}
            // 마우스 드래그
            onMouseDown={(e) => { e.stopPropagation(); onPointerDown(e.clientX); }}
            onMouseMove={(e) => { e.stopPropagation(); onPointerMove(e.clientX); }}
            onMouseUp={(e) => { e.stopPropagation(); onPointerUp(); }}
            onMouseLeave={(e) => { e.stopPropagation(); onPointerUp(); }}
            // 터치 스와이프
            onTouchStart={(e) => { e.stopPropagation(); onPointerDown(e.touches[0].clientX); }}
            onTouchMove={(e) => { e.stopPropagation(); onPointerMove(e.touches[0].clientX); }}
            onTouchEnd={(e) => { e.stopPropagation(); onPointerUp(); }}
          >
            {curMedia && (curMedia.type ?? inferType(curMedia.src)) === "video" ? (
              <video key={curMedia.src} className="imodal-video" src={curMedia.src} controls playsInline />
            ) : (
              <img key={curMedia?.src} className="imodal-image" src={curMedia?.src || ""} alt={cur?.title ?? ""} />
            )}
          </div>

          {blocks.length > 1 && (
            <button
              className="imodal-nav imodal-nav--right"
              onClick={(e) => { e.stopPropagation(); nextBlock(); }}
              aria-label="다음 세트" title="다음(→)"
            >
              <svg viewBox="0 0 24 24" aria-hidden><path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg>
            </button>
          )}

          {/* 썸네일: 블록 내 미디어 전환만 */}
          {gallery.length > 1 && (
            <div className="imodal-thumbs" onMouseDown={(e) => e.stopPropagation()}>
              {gallery.map((m, i) => (
                <button
                  key={m.src + i}
                  className={`imodal-thumb ${i === mediaIdx ? "is-active" : ""}`}
                  onClick={(e) => { e.stopPropagation(); setMediaIdx(i); }}
                  aria-label={`미디어 ${i + 1}`} title={`미디어 ${i + 1}`}
                >
                  {(m.type ?? inferType(m.src)) === "video"
                    ? <div className="imodal-thumb-video"><video src={m.src} muted /></div>
                    : <img src={m.src} alt="" />
                  }
                </button>
              ))}
            </div>
          )}

          {/* 블록 도트 */}
          {blocks.length > 1 && (
            <div className="imodal-bdots" role="tablist" aria-label="block pagination" onMouseDown={(e) => e.stopPropagation()}>
              {blocks.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === blockIdx}
                  aria-label={`${i + 1} 세트로 이동`}
                  className={`imodal-bdot ${i === blockIdx ? "is-active" : ""}`}
                  onClick={(e) => { e.stopPropagation(); setBlockIdx(i); }}
                  title={`${i + 1} 세트로 이동`}
                />
              ))}
            </div>
          )}
        </div>

        {/* 오른쪽 설명 패널 */}
        <aside className="imodal-right" onMouseDown={(e) => e.stopPropagation()}>
          <header className="imodal-head">
            <div className="imodal-title">{cur?.title ?? active?.title ?? "Untitled"}</div>
            <button className="imodal-close" onClick={onClose} aria-label="닫기" title="닫기(ESC)">
              <svg viewBox="0 0 24 24" aria-hidden><path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
            </button>
          </header>

          <div className="imodal-body">
            {cur?.text
              ? <p className="imodal-text">{cur.text}</p>
              : active?.text
              ? <p className="imodal-text">{active.text}</p>
              : <p className="imodal-text imodal-text--muted">설명이 없습니다.</p>}
          </div>

        </aside>
      </div>
    </div>
  );
}
