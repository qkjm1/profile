import OuterCarousel, { PanelItem } from "../components/OuterCarousel";

const panels: PanelItem[] = [
 {
    id: 1,
    image: "src/img/physiclick.png",
    title: "PhysiClick",
    text: "webGl·three.js 기반 3D 시뮬레이터",
  },
  {
    id: 2,
    image: "src/img/aniwell_main.png",
    title: "Aniwell",
    text: "반려동물 건강 분석 · 진료기록 OCR/QR 리포트 분석",
    href: "https://your.site/aniwell"
  },
  {
    id: 3,
    image: "src/img/povi.png",
    title: "POVI",
    text: "보이스 → 캐릭터 애니메이션",
    href: "https://your.site/povi"
  },
  {
    id: 4,
    image: "src/img/dashboard.png",
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
        autoplayMs={0}   // 자동 넘김 원하면 3000 등으로
      />
    </main>
  );
}
