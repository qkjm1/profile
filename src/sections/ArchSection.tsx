// sections/ArchSection.tsx
import React from "react";
import ArchInfoBlock from "../components/arch/ArchInfoBlock";
import ArchImageStack from "../components/arch/ArchImageStack";
import type { ArchInfo, ArchImage } from "../components/arch/types/arch";
// 슬라이더 타입만 재사용(컴포넌트는 사용 X)
import type { ProfileItem, Props } from "../components/ProfileSlider";
import me from "@/img/me.png"; 

function ProfileCard({ item }: { item: Props }) {
  // ✅ handles 우선, 없으면 handle을 배열로 변환해 사용
  const links = (item.handles && item.handles.length > 0)
    ? item.handles
    : (item.handle ? [item.handle] : []);

  return (
    <article className="profile-card">
      <div className="profile-card__media">
        <img src={item.avatar} alt={item.name} />
      </div>

      <div className="profile-card__body">
        <h3 className="profile-card__title">{item.name}</h3>
        {item.role && <p className="profile-card__role">{item.role}</p>}
        {item.desc && <p className="profile-card__desc">{item.desc}</p>}

        {links.length > 0 && (
          <div className="profile-card__links">
            {links.map((h, i) => (
              <a
                key={h.url || i}
                className="profile-card__link"
                href={h.url}
                target="_blank"
                rel="noopener noreferrer"
                style={h.bg ? { backgroundColor: h.bg } : undefined}
              >
                {h.label
                  ?? (h.url?.startsWith("mailto:")
                        ? h.url.replace("mailto:", "")
                        : h.url)}
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}


const sliderItems: ProfileItem[] = [
  {
    id: "jm",
    name: "김정민",
    role: "풀스택 개발자",
    avatar: me,
    desc: "2000.11.11",
    theme: "sun",
    // ✅ 다중 링크는 여기로
    handles: [
      { url: "https://github.com/qkjm1", label: "GitHub" },
      { url: "https://velog.io/@qkjm1", label: "Velog" },
      { url: "mailto:kqk9269@gmail.com", label: "Email" }, // ← 본인 이메일로 바꿔줘!
    ],
  },
];

// 2) ArchInfo로 매핑 (각 아치에 한 카드씩)
const idOrder = [
  "green-arch",
  "blue-arch",
  "pink-arch",
  "orange-arch",
] as const;
const leftBlocks: ArchInfo[] = sliderItems.slice(0, 4).map((p, i) => ({
  id: idOrder[i],
  content: <ProfileCard item={p} />,
}));

// 3) 우측 이미지 스택(기존 그대로)
const rightImages: ArchImage[] = [
  {
    src: "https://res.cloudinary.com/dbsuruevi/image/upload/v1757093052/cu8978xjlsjjpjk52ta0.webp",
    alt: "Green Architecture",
    z: 4,
  },
];

export default function ArchSection() {
  return (
    <div className="arch">
      <div className="arch__left">
        {leftBlocks.map((b) => (
          <ArchInfoBlock key={b.id} item={b} />
        ))}
      </div>
      <ArchImageStack
        images={[
          {
            z: 3,
            src: "/img/blank.png", // 키용 더미 경로
            name: "김정민",
            school: "부산보건대학교",
            email: "kqk9269@gmail.com",
            desc: "[산대특] 공공데이터를 활용한 웹앱개발자 양성 과정 (2025-02-28 ~ 2025-10-02)",
            bullets: [
              "Next.js/TypeScript",
              "GSAP/Three.js",
              "Spring Boot/MySQL",
            ],
          },
        ]}
      />
    </div>
  );
}
