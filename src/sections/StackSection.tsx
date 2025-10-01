import React from "react";
import StackMarquee, { type StackItem } from "../components/stack/StackMarquee";

const items: StackItem[] = [
  // ===== Frontend / UI =====
  { name: "TypeScript", src: "https://cdn.simpleicons.org/typescript" },
  { name: "React", src: "https://cdn.simpleicons.org/react" },
  { name: "Next.js", src: "https://cdn.simpleicons.org/nextdotjs/000000" },
  { name: "Tailwind CSS", src: "https://cdn.simpleicons.org/tailwindcss" },
  { name: "Framer Motion", src: "https://cdn.simpleicons.org/framer/000000" },
  { name: "GSAP", src: "https://cdn.simpleicons.org/greensock" },
  { name: "Lenis", src: "https://cdn.simpleicons.org/waveform" }, // 대체 아이콘
  { name: "Swiper", src: "https://cdn.simpleicons.org/swiper" },
  { name: "Three.js", src: "https://cdn.simpleicons.org/threedotjs/000000" },
  { name: "Vite", src: "https://cdn.simpleicons.org/vite" },
  { name: "Thymeleaf", src: "https://cdn.simpleicons.org/thymeleaf" },

  // ===== Backend / Server =====
  { name: "Java", src: "https://cdn.simpleicons.org/java/000000" },
  { name: "Spring Boot", src: "https://cdn.simpleicons.org/springboot" },
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

export default function StackSection() {
  return (
    <section className="stack-section" aria-label="기술 스택">
      <div className="container">
        {/* 위/아래에 제목 등 필요한 레이아웃 자유롭게 추가 */}
        <StackMarquee items={items} size={66} speed={90} gap={80} />
        <StackMarquee items={items} size={66} speed={90} gap={80} direction="right" />
        <StackMarquee items={items} size={66} speed={90} gap={80} />
        <StackMarquee items={items} size={66} speed={90} gap={80} direction="right" />
      </div>
    </section>
  );
}
