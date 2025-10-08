// src/sections/ArchSection.tsx
import React from "react";
import ArchInfoBlock from "../components/arch/ArchInfoBlock";
import ArchImageStack from "../components/arch/ArchImageStack";
import type {
  ArchInfo,
  ArchImage,
  ProfileItem,
} from "../components/arch/types/arch";
import me from "@/img/me.png";
import whrite from "@/img/whrite.png";

// src/sections/ArchSection.tsx 중 ProfileCard만 교체

function ProfileCard({ item }: { item: ProfileItem }) {
  // ✅ handles 우선, 없으면 handle을 배열로 변환해 사용
  const links =
    item.handles && item.handles.length > 0
      ? item.handles
      : item.handle
      ? [item.handle]
      : [];

  // ——— 아이콘들 (inline SVG, currentColor 상속) ———
  const IconUser = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M12 12a5 5 0 1 0-5-5a5 5 0 0 0 5 5m0 2c-5 0-9 2.5-9 5.5V22h18v-2.5C21 16.5 17 14 12 14"
      />
    </svg>
  );
  const IconRole = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M12 1a4 4 0 0 1 4 4a4 4 0 0 1-8 0a4 4 0 0 1 4-4m0 10c5.33 0 8 2.67 8 5.33V20H4v-3.67C4 13.67 6.67 11 12 11"
      />
    </svg>
  );
  const IconCalendar = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2m0 15H5V10h14zm0-11H5V6h14z"
      />
    </svg>
  );
  const IconMail = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2m0 4l-8 5L4 8V6l8 5l8-5z"
      />
    </svg>
  );
  const IconGithub = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 6.84 9.49c.5.1.68-.22.68-.48v-1.7c-2.78.6-3.37-1.2-3.37-1.2c-.46-1.16-1.12-1.47-1.12-1.47c-.92-.63.07-.62.07-.62c1.02.07 1.56 1.05 1.56 1.05c.9 1.54 2.36 1.1 2.94.84c.09-.66.35-1.1.63-1.35c-2.22-.25-4.56-1.11-4.56-4.95c0-1.1.39-2 .1-2.72c0 0 .84-.27 2.75 1.03c.8-.22 1.66-.33 2.52-.33s1.72.11 2.52.33c1.9-1.3 2.74-1.03 2.74-1.03c.29.72.11 1.62.06 2.72c0 3.84-2.34 4.69-4.57 4.94c.36.32.69.94.69 1.9v2.81c0 .26.18.59.69.48A10 10 0 0 0 22 12A10 10 0 0 0 12 2"
      />
    </svg>
  );
  const IconVelog = () => (
    <svg width="16" height="16" viewBox="0 0 256 256" aria-hidden>
      <path
        fill="currentColor"
        d="M232 128c0 57.438-46.562 104-104 104S24 185.438 24 128S70.562 24 128 24s104 46.562 104 104m-53.941-38.39l-35.15 88.784c-2.623 6.63-12.195 6.63-14.818 0l-35.15-88.783c-2.301-5.81 1.993-12.11 8.088-12.11h68.94c6.095 0 10.389 6.3 8.09 12.11"
      />
    </svg>
  );

  // 링크별 대표 아이콘 선택
  const pickLinkIcon = (url?: string) => {
    if (!url) return <IconUser />;
    const u = url.toLowerCase();
    if (u.startsWith("mailto:")) return <IconMail />;
    if (u.includes("github.com")) return <IconGithub />;
    if (u.includes("velog.io")) return <IconVelog />;
    return <IconUser />;
  };

  // 이메일 텍스트로 렌더
  const renderLinkLabel = (h: NonNullable<ProfileItem["handles"]>[number]) =>
    h.label ??
    (h.url?.startsWith("mailto:") ? h.url.replace("mailto:", "") : h.url);

  return (
    <article className="profile-card">
      {/* 헤더 (아바타 + 이름/역할칩) */}
        <div className="profile-card__media">
          {" "}
          <img src={item.avatar} alt={item.name} />{" "}
        </div>
      <header className="profile-card__head">
        <div className="profile-card__titlebox">
          <h3 className="pc-name">
           <span>{item.name}</span>
          </h3>
          {item.role && (
            <div className="pc-rolechip">
              <IconRole />
              <span>{item.role}</span>
            </div>
          )}
        </div>
      </header>

      {/* 메타 (생년월일/설명 등을 캘린더 아이콘과 함께) */}
      {item.desc && (
        <p className="pc-meta">
          <IconCalendar /> <span>{item.desc}</span>
        </p>
      )}

      {/* 링크 리스트 (아이콘 + 줄바꿈 구조) */}
      {links.length > 0 && (
        <div className="profile-card__links">
          {links.map((h, i) => (
            <a
              key={h.url || i}
              className="profile-card__link"
              href={h.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="pc-linkicon">{pickLinkIcon(h.url)}</span>
              <span className="pc-linktext">{renderLinkLabel(h)}</span>
            </a>
          ))}
        </div>
      )}
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
    // ✅ 다중 링크는 여기로
    handles: [
      { url: "https://github.com/qkjm1", label: "GitHub" },
      { url: "https://velog.io/@qkjm1", label: "Velog" },
      { url: "mailto:kqk9269@gmail.com", label: "Email" },
    ],
  },
];

// 2) ArchInfo로 매핑 (각 아치에 한 카드씩)
const idOrder = ["green-arch"] as const;
const leftBlocks: ArchInfo[] = sliderItems.slice(0, 4).map((p, i) => ({
  id: idOrder[i],
  content: <ProfileCard item={p} />,
}));

// 3) 우측 이미지 스택(기존 그대로)
const rightImages: ArchImage[] = [
  {
    src: whrite,
    alt: "Green Architecture",
    z: 1,
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
            z: 2,
            src: "src/img/whrite.png", // 키용 더미 경로
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
