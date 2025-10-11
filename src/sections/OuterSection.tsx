// src/sections/OuterSection.tsx

import OuterCarousel, { PanelItem } from "../components/outer/OuterCarousel";
import imgPhysiclick from "@/img/physiclick.png";
import Physiclickmain from "@/img/physiclick/main.mp4";
import Physiclickmain2 from "@/img/physiclick/main2.mp4";
import Physiclickdetail from "@/img/physiclick/detail.png";
import imgAniwell from "@/img/aniwell_main.png";
import home from "@/img/aniwell/home.png";
import main from "@/img/aniwell/main.png";
import login_1 from "@/img/aniwell/login_1.png";
import login_2 from "@/img/aniwell/login_2.png";
import login_3 from "@/img/aniwell/login_3.png";
import imgPovi from "@/img/povi.png";
import imgDashboard from "@/img/dashboard.png";


const panels: PanelItem[] = [
  {
  id: 1,
  image: imgPhysiclick, // 썸네일 용(없어도 무방)
  blocks: [
    {
      media: [
        { src: Physiclickmain, type: "video" },
      ],
      title: "메인화면 - 1",
      text: "webGL과 Three.js를 이용하여 3D구현 및 인터랙션 개발",
    },
    {
      media: [
        { src: Physiclickmain2, type: "video" },
      ],
      title: "아키텍처",
      text: "Three.js + GLTFLoader, 커스텀 인터랙션(줌/팬/회전) 등",
    },
    {
      media: [
        { src: imgPhysiclick },
      ],
      title: "UX 플로우",
      text: "유저 여정과 디버깅 로깅 포인트",
    },
    {
      media: [
        { src: Physiclickdetail },
      ],
      title: "세부화면"
    }
  ]
},
  {
    id: 2,
    image: imgAniwell,
    blocks: [
    {
      media: [
        { src: home },
      ],
      title: "개요",
      text: "webGL 기반 3D 시뮬레이터 개요와 사용 시나리오",
      href: "https://example.com/overview"
    },
    {
      media: [
        { src: main },
      ],
      title: "아키텍처",
      text: "Three.js + GLTFLoader, 커스텀 인터랙션(줌/팬/회전) 등",
    },
    {
      media: [
        { src: login_1 },
      ],
      title: "UX 플로우",
      text: "유저 여정과 디버깅 로깅 포인트",
    },
    {
      media: [
        { src: login_2 },
      ],
      title: "UX 플로우",
      text: "유저 여정과 디버깅 로깅 포인트",
    },
    {
      media: [
        { src: login_3 },
      ],
      title: "UX 플로우",
      text: "유저 여정과 디버깅 로깅 포인트",
    }
  ]
  },
  {
    id: 3,
    image: imgPovi,
    title: "POVI",
    text: "보이스 → 캐릭터 애니메이션",
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
