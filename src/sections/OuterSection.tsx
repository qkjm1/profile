import OuterCarousel, { PanelItem } from "../components/OuterCarousel";
import imgPhysiclick from "@/img/physiclick.png";
import imgAniwell from "@/img/aniwell_main.png";
import imgPovi from "@/img/povi.png";
import imgDashboard from "@/img/dashboard.png";

const panels: PanelItem[] = [
  {
    id: 1,
    image: imgPhysiclick,
    title: "PhysiClick",
    text: "webGl·three.js 기반 3D 시뮬레이터",
  },
  {
    id: 2,
    image: imgAniwell,
    title: "Aniwell",
    text: "반려동물 건강 분석 · 진료기록 OCR/QR 리포트 분석",
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
