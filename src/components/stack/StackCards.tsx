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

/* === 프로젝트 맥락에 맞춘 보조문구 ===
   - 카드 레이아웃/스타일은 유지, 텍스트만 교체
   - 너무 길어지면 말줄임 처리됨 (기존 CSS 그대로) */
function hintByStackName(name: string): string {
  switch (name.toLowerCase()) {
    /* Frontend / UI */
    case "typescript":
      return "Lingbo·POVI 프론트 전반의 타입 안정성/DX";
    case "react":
      return "대시보드·맵·모달·알림 등 UI 컴포넌트 구조화";
    case "next.js":
      return "포트폴리오/Lingbo 웹앱·SSR·API 라우트 연동";
    case "tailwind css":
      return "대시보드·모달·사이드바·반응형 레이아웃 스타일링";
    case "framer motion":
      return "히어로/카드 인터랙션·스크롤 구간 미세 모션";
    case "gsap":
      return "스크롤 트리거·웨이브·패스 애니메이션 구현";
    case "swiper":
      return "갤러리/리뷰·카드 슬라이더 네비게이션";
    case "three.js":
      return "WebGL 3D 뷰어·파트 클릭·줌/팬/회전 컨트롤";
    case "vite":
      return "컴포넌트 실험용 샌드박스·경량 데모 번들링";
    case "thymeleaf":
      return "Spring Boot 기반 레거시/관리페이지 SSR 템플릿";
    case "figma":
      return "UI 키트·아이콘·레이아웃 와이어/하이파이 시안";
    case "ajax (xhr/fetch)":
      return "3001→8080 API 호출·세션/CSR 통신 브릿지";
    case "jquery":
      return "카카오맵·기존 페이지 보강용 DOM/AJAX 유틸";
    case "jsp":
      return "기존 서버 렌더링 화면 유지/점진적 개선 베이스";

    /* Backend / Server */
    case "java":
      return "도메인·DTO/Service·알림(WebSocket) 핵심 로직";
    case "spring boot":
      return "REST API·세션·CORS·WebSocket 알림·파일 업로드";
    case "apache maven":
      return "멀티 모듈/의존성 관리·빌드 파이프라인";
    case "node.js":
      return "Next 런타임·툴링 스크립트·개발 서버";

    /* DB / Infra */
    case "mysql":
      return "Lingbo 트래킹·게시판·다이어리 스키마/쿼리";
    case "mariadb":
      return "로컬 개발·Workbench 연동·권한/계정 분리";
    case "docker":
      return "MySQL 컨테이너·로컬 개발 환경 표준화";
    case "aws":
      return "EC2 배포·공용 DB 연동·운영 환경 구성";

    /* AI / API */
    case "openai":
      return "POVI 음성→설명문 생성·프롬프트/요약 파이프라인";
    case "python":
      return "음성 분석·이미지 파이프라인 스크립트/유틸";
    case "fastapi":
      return "POVI 마이크로서비스 API·모델 엔드포인트";

    /* Collaboration / Deploy */
    case "git":
      return "브랜치 전략·cherry-pick·서브모듈(ComfyUI)";
    case "github":
      return "povi-project 조직·PR/이슈·릴리즈/권한 관리";
    case "vercel":
      return "Next.js 프론트 자동 배포·프리뷰/프로덕션";
    case "notion":
      return "요구사항·기술 문서·포트폴리오/발표 자료 정리";

    default:
      return "프로젝트 실사용 스택";
  }
}
