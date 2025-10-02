// sections/ArchSection.tsx
import React from "react";
import ArchInfoBlock from "../components/arch/ArchInfoBlock";
import ArchImageStack from "../components/arch/ArchImageStack";
import type { ArchInfo, ArchImage } from "../components/arch/types/arch";
// 슬라이더 타입만 재사용(컴포넌트는 사용 X)
import type { ProfileItem } from "../components/ProfileSlider";

/** ▶ slider 카드 스타일을 그대로 쓰고 싶다면,
 *  1) 여기 클래스명을 ProfileSlider에서 쓰던 카드 클래스명과 맞춰주세요.
 *  2) 그 CSS를 전역에 import 해 두면 동일한 룩이 나옵니다.
 */
function ProfileCard({ item }: { item: ProfileItem }) {
  return (
    <article className="profile-card">
      <div className="profile-card__media">
        <img src={item.avatar} alt={item.name} />
      </div>
      <div className="profile-card__body">
        <h3 className="profile-card__title">{item.name}</h3>
        {item.role && <p className="profile-card__role">{item.role}</p>}
        <p className="profile-card__desc">{item.desc}</p>
        {item.handle?.url && (
          <a
            className="profile-card__link"
            href={item.handle.url}
            target="_blank"
            rel="noreferrer"
          >
            {item.handle.label ?? "more"}
          </a>
        )}
      </div>
    </article>
  );
}

// 1) 원본 ProfileItem 데이터
const sliderItems: ProfileItem[] = [
  {
    id: "jm",
    name: "김정민",
    role: "Creative Engineer",
    avatar: "src/img/me.png",
    desc: "Data × UX × AI · Next.js/React/TS · GSAP · Spring Boot · Three.js",
    handle: { url: "https://github.com/qkjm1", label: "@qkjm1" },
    theme: "sun",
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
