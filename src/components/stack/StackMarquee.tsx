import React from "react";
import "./stack-marquee.css";

export type StackItem = {
  name: string;
  src: string;     // 아이콘 이미지(SVG/PNG) URL
  href?: string;   // 클릭 시 이동할 링크(선택)
};

type Props = {
  items: StackItem[];
  size?: number;              // 아이콘 크기(px), 기본 28
  speed?: number;             // 1회전 시간(초), 기본 30
  gap?: number;               // 아이템 간격(px), 기본 28
  direction?: "left" | "right";
  pauseOnHover?: boolean;     // hover 시 일시정지, 기본 true
  fadeEdge?: boolean;         // 좌우 페이드 마스크, 기본 true
  label?: string;             // 접근성용 레이블
};

export default function StackMarquee({
  items,
  size = 56,
  speed = 30,
  gap = 36,
  direction = "left",
  pauseOnHover = true,
  fadeEdge = true,
  label = "technology stack",
}: Props) {
  // 트랙을 2회 반복해서 끊김 없이 루프
  const doubled = [...items, ...items];

  return (
    <div
      className={[
        "stack-marquee",
        direction === "right" ? "is-reverse" : "",
        pauseOnHover ? "is-paused-on-hover" : "",
        fadeEdge ? "has-fade" : "",
      ].join(" ")}
      aria-label={label}
      role="region"
      style={
        {
          // CSS 변수로 커스터마이즈
          "--stack-size": `${size}px`,
          "--stack-gap": `${gap}px`,
          "--stack-speed": `${speed}s`,
        } as React.CSSProperties
      }
    >
      <div className="stack-marquee__track" aria-hidden="true">
        {doubled.map((it, i) => {
          const key = `${it.name}-${i}`;
          const img = (
            <img
              className="stack-marquee__icon"
              src={it.src}
              alt={it.name}
              width={size}
              height={size}
              loading="lazy"
            />
          );
          return (
            <div className="stack-marquee__item" key={key} title={it.name}>
              {it.href ? (
                <a href={it.href} target="_blank" rel="noreferrer">
                  {img}
                </a>
              ) : (
                img
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
