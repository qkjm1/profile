// components/arch/ArchImageStack.tsx
import React from "react";
import type { ArchImage } from "./types/arch";

// 🔹 타입 파일 건드리지 않기 위해, 이 컴포넌트 안에서만 확장 필드 선언
type IntroFields = {
  name?: string;
  school?: string;
  email?: string;
  title?: string;     // 선택: 별도 제목
  desc?: string;      // 선택: 자기소개 본문
  bullets?: string[]; // 선택: 포인트 목록
};

export default function ArchImageStack({ images }: { images: ArchImage[] }) {
  const items = images as Array<ArchImage & IntroFields>;

  return (
    <div className="arch__right">
      {items.map((it) => (
        <div
          className="img-wrapper"
          data-index={it.z ?? 0}
          style={{ zIndex: it.z ?? 0 }}
          key={it.src + (it.name ?? it.title ?? "")}
        >
          {/* ✅ 이미지 대신 텍스트 카드 렌더링 */}
          <article className="profile-card" role="group" aria-label={it.name ?? it.title ?? "intro"}>
            {/* 이름/타이틀 */}
            {it.name ? (
              <h3 className="pc-name">{it.name}</h3>
            ) : it.title ? (
              <h3 className="pc-name">{it.title}</h3>
            ) : null}

            {/* 학교/소속 */}
            {it.school && <p className="pc-school">{it.school}</p>}

            {/* 이메일 */}
            {it.email && (
              <a className="pc-email" href={`mailto:${it.email}`} rel="noreferrer">
                {it.email}
              </a>
            )}

            {/* 자기소개 본문(없으면 alt 대체) */}
            {(it.desc || it.alt) && (
              <p className="pc-desc" style={{ marginTop: 6, color: "#374151", fontSize: 14 }}>
                {it.desc ?? it.alt}
              </p>
            )}

            {/* 포인트 목록 */}
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
