// components/stack/StackCards.tsx
import React from "react";
import "../stack/stack-cards.css";


export type StackItem = {
  name: string;
  src: string; // 아이콘 URL (simpleicons 등)
  href?: string; // 선택: 클릭 시 이동할 공식 문서/홈페이지
};

type Props = {
  items: StackItem[];
  iconSize?: number; // px
  gap?: number;      // px
  cols?: { base?: number; sm?: number; md?: number; lg?: number; xl?: number };
};

export default function StackCards({
  items,
  iconSize = 66,
  gap = 16,
  cols = { base: 2, sm: 3, md: 4, lg: 5, xl: 6 },
}: Props) {
  const styleVars = {
    // CSS 변수로 전달 → 미디어쿼리에서 그대로 사용
    "--icon-size": `${iconSize}px`,
    "--grid-gap": `${gap}px`,
    "--col-base": String(cols.base ?? 2),
    "--col-sm": String(cols.sm ?? 3),
    "--col-md": String(cols.md ?? 4),
    "--col-lg": String(cols.lg ?? 5),
    "--col-xl": String(cols.xl ?? 6),
  };

  return (
    <div className="stack-grid" style={styleVars as React.CSSProperties}>
      {items.map((it) => {
        const CardInner = (
          <article className="stack-card" key={`${it.name}-${it.src}`}>
            <div className="stack-card__body">
              <div className="stack-card__icon" aria-hidden>
                <img src={it.src} alt="" loading="lazy" />
              </div>
              <div className="stack-card__text">
                <h3 className="stack-card__title">{it.name}</h3>
                <p className="stack-card__hint">{hintByStackName(it.name)}</p>
              </div>
            </div>
            <div className="stack-card__line"></div>
          </article>
        );

        return it.href ? (
          <a
            key={`${it.name}-${it.src}-a`}
            className="stack-card__link"
            href={it.href}
            target="_blank"
            rel="noreferrer"
            aria-label={`${it.name} 문서 열기`}
          >
            {CardInner}
          </a>
        ) : (
          CardInner
        );
      })}
    </div>
  );
}

/* 스택 힌트 텍스트 */
function hintByStackName(name: string): string {
  switch (name.toLowerCase()) {
    case "react":
      return "컴포넌트 기반 UI 라이브러리";
    case "next.js":
      return "리액트 풀스택 프레임워크";
    case "typescript":
      return "정적 타입 + DX 향상";
    case "tailwind css":
      return "유틸리티-우선 CSS";
    case "gsap":
      return "타임라인/스크롤 애니메이션";
    case "lenis":
      return "부드러운 스크롤";
    case "swiper":
      return "터치 슬라이더";
    case "three.js":
      return "WebGL 3D 렌더링";
    case "framer motion":
      return "리액트 모션/제스처";
    case "spring boot":
      return "자바 백엔드 프레임워크";
    case "java":
      return "JVM 기반 언어";
    case "mysql":
    case "mariadb":
      return "관계형 데이터베이스";
    case "docker":
      return "컨테이너/배포";
    case "firebase":
      return "인증/스토리지/호스팅";
    case "openai":
      return "LLM·생성형 AI API";
    case "python":
      return "범용/데이터/AI";
    case "fastapi":
      return "파이썬 고성능 API";
    case "selenium":
      return "브라우저 자동화/크롤링";
    case "qr (zxing)":
      return "QR/바코드 처리";
    case "pdf (openhtmltopdf)":
      return "HTML→PDF 렌더링";
    case "vite":
      return "번들러/개발 서버";
    case "thymeleaf":
      return "서버사이드 템플릿";
    case "node.js":
      return "자바스크립트 런타임";
    case "aws":
      return "클라우드 인프라";
    default:
      return "기술 스택";
  }
}
