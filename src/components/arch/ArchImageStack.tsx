// components/arch/ArchImageStack.tsx
import React from "react";
import type { ArchImage } from "./types/arch";
import "../arch/css/ArchImageStack.css";

// 🔹 타입 파일 건드리지 않기 위해, 이 컴포넌트 안에서만 확장 필드 선언
type IntroFields = {
  name?: string;
  school?: string;
  email?: string;
  title?: string;
  desc?: string;
  bullets?: string[];
};

export default function ArchImageStack({ images }: { images: ArchImage[] }) {
  const items = images as Array<ArchImage & IntroFields>;

  return (
    // ✅ 오직 여기 className만 추가 변경
    <div className="arch__right arch-right-scroll" data-lenis-prevent>
      {items.map((it) => (
        <div
          className="img-wrapper"
          data-index={it.z ?? 0}
          style={{ zIndex: it.z ?? 0 }}
          key={it.src + (it.name ?? it.title ?? "")}
        >
          <article className="profile-card" role="group" aria-label={it.name ?? it.title ?? "intro"}>
            {it.name ? <h3 className="pc-name">{it.name}</h3> : it.title ? <h3 className="pc-name">{it.title}</h3> : null}
            {it.school && <p className="pc-school">{it.school}</p>}
            {it.email && (
              <a className="pc-email" href={`mailto:${it.email}`} rel="noreferrer">
                {it.email}
              </a>
            )}
            {(it.desc || it.alt) && (
              <p className="pc-desc" style={{ marginTop: 6, color: "#374151", fontSize: 14 }}>
                {it.desc ?? it.alt}
              </p>
            )}
            {it.bullets && it.bullets.length > 0 && (
              <ul className="pc-list" style={{ marginTop: 10, paddingLeft: 18, color: "#374151", fontSize: 14 }}>
                {it.bullets.map((b, i) => (
                  <li key={i} style={{ marginBottom: 4, listStyle: "disc" }}>
                    {b}
                  </li>
                ))}
              </ul>
            )}
          </article>
        </div>
      ))}
    </div>
  );
}
