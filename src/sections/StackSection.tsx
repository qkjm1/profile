// src/sections/StackSection.tsx
import React, { useMemo, useState } from "react";
import StackCards, { type StackItem } from "../components/stack/StackCards";

const items: StackItem[] = [
  // ===== Frontend / UI =====
  { name: "TypeScript", src: "https://cdn.simpleicons.org/typescript", href: "https://www.typescriptlang.org/" },
  { name: "React", src: "https://cdn.simpleicons.org/react", href: "https://react.dev/" },
  { name: "Next.js", src: "https://cdn.simpleicons.org/nextdotjs/000000", href: "https://nextjs.org/" },
  { name: "Tailwind CSS", src: "https://cdn.simpleicons.org/tailwindcss", href: "https://tailwindcss.com/" },
  { name: "Framer Motion", src: "https://cdn.simpleicons.org/framer/000000", href: "https://www.framer.com/motion/" },
  { name: "GSAP", src: "https://cdn.simpleicons.org/greensock", href: "https://gsap.com/" },
  { name: "Swiper", src: "https://cdn.simpleicons.org/swiper", href: "https://swiperjs.com/" },
  { name: "Three.js", src: "https://cdn.simpleicons.org/threedotjs/000000", href: "https://threejs.org/" },
  { name: "Vite", src: "https://cdn.simpleicons.org/vite", href: "https://vitejs.dev/" },
  { name: "Thymeleaf", src: "https://cdn.simpleicons.org/thymeleaf", href: "https://www.thymeleaf.org/" },

  // ===== Backend / Server =====
  { name: "Java", src: "https://cdn.simpleicons.org/java/000000" },
  { name: "Spring Boot", src: "https://cdn.simpleicons.org/springboot", href: "https://spring.io/projects/spring-boot" },
  { name: "Apache Maven", src: "https://cdn.simpleicons.org/apachemaven" },
  { name: "Node.js", src: "https://cdn.simpleicons.org/nodedotjs" },

  // ===== DB / Infra =====
  { name: "MySQL", src: "https://cdn.simpleicons.org/mysql" },
  { name: "MariaDB", src: "https://cdn.simpleicons.org/mariadb" },
  { name: "Docker", src: "https://cdn.simpleicons.org/docker" },
  { name: "AWS", src: "https://cdn.simpleicons.org/amazonaws/000000" },

  // ===== Auth / Platform =====
  { name: "Firebase", src: "https://cdn.simpleicons.org/firebase" },
  { name: "Google Login", src: "https://cdn.simpleicons.org/google/000000" },
  { name: "Kakao", src: "https://cdn.simpleicons.org/kakaotalk" },
  { name: "Naver", src: "https://cdn.simpleicons.org/naver/00C300" },

  // ===== Media / Tools =====
  { name: "Cloudinary", src: "https://cdn.simpleicons.org/cloudinary" },
  { name: "Selenium", src: "https://cdn.simpleicons.org/selenium" },
  { name: "QR (ZXing)", src: "https://cdn.simpleicons.org/qrcode" },
  { name: "PDF (OpenHTMLToPDF)", src: "https://cdn.simpleicons.org/adobeacrobatreader/EC1C24" },

  // ===== AI / API (Sensor 제외) =====
  { name: "OpenAI", src: "https://cdn.simpleicons.org/openai/000000" },
  { name: "Python", src: "https://cdn.simpleicons.org/python" },
  { name: "FastAPI", src: "https://cdn.simpleicons.org/fastapi" },

  // ===== Collaboration =====
  { name: "Git", src: "https://cdn.simpleicons.org/git" },
  { name: "GitHub", src: "https://cdn.simpleicons.org/github/000000" },
  { name: "Vercel", src: "https://cdn.simpleicons.org/vercel/000000" },
  { name: "Notion", src: "https://cdn.simpleicons.org/notion/000000" },
];

const PAGE_SIZE = 15; // 5행 × 3열

export default function StackSection() {
  const pages = useMemo(() => {
    const out: StackItem[][] = [];
    for (let i = 0; i < items.length; i += PAGE_SIZE) {
      out.push(items.slice(i, i + PAGE_SIZE));
    }
    return out;
  }, []);

  const [page, setPage] = useState(0);
  const total = pages.length;

  const prev = () => setPage((p) => (p - 1 + total) % total);
  const next = () => setPage((p) => (p + 1) % total);

  return (
    <section className="stack-section" aria-label="기술 스택">
      <div className="stack-container">
        <header className="stack-header">
          <h2 className="stack-title">Skill & Stack</h2>
          <p className="stack-desc">5행 × 3열로 페이지를 넘기며 볼 수 있어요.</p>
        </header>

        {/* 고정 3열 */}
        <StackCards
          items={pages[page] ?? []}
          iconSize={66}
          gap={16}
          cols={{ base: 3, sm: 3, md: 3, lg: 3, xl: 3 }}
        />

        {/* 페이지 네비게이션 */}
        {total > 1 && (
          <div className="stack-pager" role="navigation" aria-label="스택 페이지 네비게이션">
            <button className="stack-pager__btn" onClick={prev} aria-label="이전 페이지">← Prev</button>
            <span className="stack-pager__info" aria-live="polite">
              {page + 1} / {total}
            </span>
            <button className="stack-pager__btn" onClick={next} aria-label="다음 페이지">Next →</button>
          </div>
        )}
      </div>
    </section>
  );
}
