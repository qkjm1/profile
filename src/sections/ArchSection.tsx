"use client";
import React from "react";
import me from "@/img/me.png";
import RightScrollPanel, {
  RightPanelItem,
} from "@/components/arch/RightScrollPanel";
import ProfileCard from "@/components/arch/ProfileCard";
import "@/components/arch/css/ArchImageStack.css";
import type { ProfileItem } from "@/components/arch/types/arch";
export default function ArchSection() {
  const rightItems: RightPanelItem[] = [
    {
      name: "김정민",
      school: "부산보건대학교",
      email: "kqk9269@gmail.com",
      desc: "[산대특] 공공데이터를 활용한 웹앱개발자 양성 과정 (2025-02-28 ~ 2025-10-02)",
      bullets: ["Next.js/TypeScript", "GSAP/Three.js", "Spring Boot/MySQL"],
    },
    {
      name: "",
      desc: "물리치료사로 시작해 사람의 움직임과 감정을 이해하던 저는,이제 데이터와 UX, 그리고 AI로 사람의 경험을 설계하는 개발자가 되었습니다. Spring Boot로 백엔드를 설계하고, Next.js·Three.js로 인터랙티브 프런트를 구현하며 기술을 통해 문제를 분석하고, 디자인으로 해결하는 엔지니어링의 즐거움을 추구합니다.",
    },
  ];

  const leftItem: ProfileItem = {
    id: "jm",
    name: "김정민",
    role: "풀스택 개발자",
    avatar: me,
    desc: "2000.11.11",
    handles: [
      { url: "https://github.com/qkjm1", label: "GitHub" },
      { url: "https://velog.io/@qkjm1", label: "Velog" },
      { url: "mailto:kqk9269@gmail.com", label: "Email" },
    ],
  };

  return (
    <section className="arch-profile">
      <aside className="arch-profile__left">
        <ProfileCard item={leftItem} />
      </aside>

      {/* 오른쪽: 내부 스크롤 영역 */}
      <main className="arch-profile__right">
        <RightScrollPanel items={rightItems} />
      </main>
    </section>
  );
}
