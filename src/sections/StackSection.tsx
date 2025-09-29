import React from "react";
import StackMarquee, { type StackItem } from "../components/stack/StackMarquee";

const items: StackItem[] = [
  { name: "TypeScript", src: "https://cdn.simpleicons.org/typescript" },
  { name: "React", src: "https://cdn.simpleicons.org/react" },
  { name: "Next.js", src: "https://cdn.simpleicons.org/nextdotjs/000000" },
  { name: "Node.js", src: "https://cdn.simpleicons.org/nodedotjs" },
  { name: "GSAP", src: "https://cdn.simpleicons.org/greensock" },
  { name: "Vite", src: "https://cdn.simpleicons.org/vite" },
  { name: "Tailwind", src: "https://cdn.simpleicons.org/tailwindcss" },
  { name: "Firebase", src: "https://cdn.simpleicons.org/firebase" },
  { name: "Three.js", src: "https://cdn.simpleicons.org/threedotjs/000000" },
  { name: "GitHub", src: "https://cdn.simpleicons.org/github/000000" },
];

export default function StackSection() {
  return (
    <section className="stack-section" aria-label="기술 스택">
      <div className="container">
        {/* 위/아래에 제목 등 필요한 레이아웃 자유롭게 추가 */}
        <StackMarquee items={items} size={56} speed={28} gap={36} />
        <StackMarquee
          items={items}
          size={56}
          speed={32}
          gap={36}
          direction="right"
        />
      </div>
    </section>
  );
}
