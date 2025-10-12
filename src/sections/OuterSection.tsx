// src/sections/OuterSection.tsx

import OuterCarousel, { PanelItem } from "../components/outer/OuterCarousel";
import imgPhysiclick from "@/img/physiclick.png";
import Physiclickmain from "@/img/physiclick/main.mp4";
import Physiclickmain2 from "@/img/physiclick/main2.mp4";
import Physiclickdetail from "@/img/physiclick/detail.png";
import main_1 from "@/img/physiclick/main_3.png";
import main_2 from "@/img/physiclick/main_4.png";
//
import imgAniwell from "@/img/aniwell_main.png";
import mainVideo from "@/img/aniwell/main.mp4";
import home from "@/img/aniwell/home.png";
import main from "@/img/aniwell/main.png";
import login_1 from "@/img/aniwell/login_1.png";
import login_2 from "@/img/aniwell/login_2.png";
import login_3 from "@/img/aniwell/login_3.png";
import gall from "@/img/aniwell/AniWell_1.png";
import crew_1 from "@/img/aniwell/AniWell_41.png";
//
import imgPovi from "@/img/povi.png";

//
import imgDashboard from "@/img/dashboard.png";

const panels: PanelItem[] = [
  {
    id: 1,
    image: imgPhysiclick, // 썸네일 용(없어도 무방)
    title: "PhysiClick",
    text: "webGl·three.js 기반 3D 시뮬레이터",
    blocks: [
      {
        media: [{ src: Physiclickmain, type: "video" }],
        title: "메인화면 - 첫번째",
        text: "webGL과 Three.js를 이용하여 3D구현 및 인터랙션 개발",
        links: [
          { url: "https://velog.io/@kqk11/series/%EA%B0%9C%EC%9D%B8%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8", label: "velog", comment: "프로젝트 진행 과정" },
        ],
      },
      {
        media: [{ src: Physiclickmain2, type: "video" }],
        title: "메인화면 - 두번쨰",
        text: "Three.js + GLTFLoader, 커스텀 인터랙션(줌/팬/회전) 등",
      },
      {
        media: [{ src: imgPhysiclick }],
        title: "UX 플로우",
        text: "유저 여정과 디버깅 로깅 포인트",
      },
      {
        media: [{ src: main_1 }],
        title: "UX 플로우",
        text: "유저 여정과 디버깅 로깅 포인트",
      },
      {
        media: [{ src: main_2 }],
        title: "UX 플로우",
        text: "유저 여정과 디버깅 로깅 포인트",
      },
    ],
  },
  {
    id: 2,
    image: imgAniwell,
    title: "Aniwell",
    text: "반려동물 건강 분석 · 진료기록 OCR/QR 리포트 분석",
    blocks: [
      {
        media: [{ src: mainVideo, type: "video" }],
        title: "개요",
        text: "Next.js/TypeScript",
        links: [
          { url: "https://www.figma.com/design/r6bISppwHcxGGB8lh64XYL/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=0-1&t=Ry5drSr1oa2Cf4S7-1", label: "피그마", comment: "피그마 세부 디자인" },
          { url: "https://www.notion.so/22a25b09255c80df9e02f2da4a8238ee" , label: "팀프로젝트 분담&일정", comment: "notion 이용" },
        ],
      },
      {
        media: [{ src: home }],
        title: "개요",
        text: "webGL 기반 3D 시뮬레이터 개요와 사용 시나리오",
        
      },
      {
        media: [{ src: main }],
        title: "아키텍처",
        text: "Three.js + GLTFLoader, 커스텀 인터랙션(줌/팬/회전) 등",
      },
      {
        media: [{ src: login_1 }],
        title: "UX 플로우",
        text: "유저 여정과 디버깅 로깅 포인트",
      },
      {
        media: [{ src: login_2 }],
        title: "UX 플로우",
        text: "유저 여정과 디버깅 로깅 포인트",
      },
      {
        media: [{ src: login_3 }],
        title: "UX 플로우",
        text: "유저 여정과 디버깅 로깅 포인트",
      },
       {
        media: [{ src: crew_1 }],
        title: "UX 플로우",
        text: "유저 여정과 디버깅 로깅 포인트",
      },
       {
        media: [{ src: gall }],
        title: "세부화면",
      },
    ],
  },
  {
    id: 3,
    image: imgPovi,
    title: "POVI",
    text: "보이스 → 캐릭터 애니메이션",
    blocks: [
      {
        media: [{ src: imgPovi }],
        title: "개요",
        text: "Next.js/TypeScript",
      },
    ],
  },
  {
    id: 4,
    image: imgDashboard,
    title: "Lingbo Dashboard",
    text: "UTM/QR 실시간 분석 & 알림",
  },
];

export default function Page() {
  return (
    <main>
      <OuterCarousel
        items={panels}
        perSlide={3}
        panelHeight={300}
        maxWidth={1024}
        autoplayMs={0} // 자동 넘김 원하면 3000 등으로
      />
    </main>
  );
}
