// src/sections/OuterSection.tsx
import type { ArchImage, ArchInfo } from "../components/arch/types/arch";
import me from "@/img/me.png";
import "@/components/arch/css/ArchImageStack.css";
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
import mainVideo_1 from "@/img/aniwell/main1.mp4";
import home from "@/img/aniwell/home.png";
import main from "@/img/aniwell/main.png";
import login_1 from "@/img/aniwell/login_1.png";
import login_2 from "@/img/aniwell/login_2.png";
import login_3 from "@/img/aniwell/login_3.png";
import gall from "@/img/aniwell/AniWell_1.png";
import crew_1 from "@/img/aniwell/AniWell_41.png";
import crew_2 from "@/img/aniwell/crew_1.png";
//
import imgPovi from "@/img/povi.png";
import mainPovi from "@/img/povi/povi_main.png";
import Povivideo from "@/img/povi/video.mp4";

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
        media: [{ src: mainVideo_1, type: "video" }],
        title: "Aniwell",
        text: "- Tailwind CSS\n- AOS (Animate On Scroll): \n일부 요소 페이드/슬라이드 인 애니메이션\n- GSAP + ScrollTrigger/ScrollTo: \n섹션 핀(sticky), 스크롤 동기화, 시퀀스 애니메이션\n- SVG 로고 연출: \n로고 path 드로잉 + 클리핑을 이용한 물결(wave) 충전 이펙트, 필터 텍스처(grain)",
        links: [
          { url: "https://www.figma.com/design/r6bISppwHcxGGB8lh64XYL/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=0-1&t=Ry5drSr1oa2Cf4S7-1", label: "피그마", comment: "피그마 세부 디자인" },
          { url: "https://www.notion.so/22a25b09255c80df9e02f2da4a8238ee" , label: "팀프로젝트 분담&일정", comment: "notion 이용" },
          { url: "https://drive.google.com/file/d/1ol5U_rdCPtEAT-uDrIEij5bwwPwHEdp6/view?usp=sharing" , label: "ppt", comment: "발표ppt" },
        ],
      },
      {
        media: [{ src: mainVideo, type: "video" }],
        title: "Aniwell",
        text: "- Tailwind CSS\n- AOS (Animate On Scroll): \n일부 요소 페이드/슬라이드 인 애니메이션\n- GSAP + ScrollTrigger/ScrollTo: \n섹션 핀(sticky), 스크롤 동기화, 시퀀스 애니메이션\n- SVG 로고 연출: \n로고 path 드로잉 + 클리핑을 이용한 물결(wave) 충전 이펙트, 필터 텍스처(grain)",
      },
      {
        media: [{ src: home }],
        title: "로그인 시 진입하는 화면",
        text: "- Swiper: \n카드 스와이프, 카드 양쪽 블러로 중앙 강조\n- React:\n iframe을 이용해서 아래화면 구성\n- SweetAlert2: \n이용하여 토스트/모달 알림 구현\n - 흐름:\n 카드 중앙 반려동물 선택 > 해당 펫 개인페이지로 이동되도록 결정하는 요소",
        
      },
      {
        media: [{ src: main }],
        title: "각 반려동물의 개인페이지 ",
        text: "- Chart.js: \n사료/물 섭취량 동적 건강지표 시각화\n- Fetch API: \n건강 로그·백신 이벤트/등록/수정/삭제 비동기 호출\n- calendar: \n반려동물 건강 이벤트 등록/수정/삭제, 날짜별 이벤트 뱃지/클릭",
      },
      {
        media: [{ src: login_1 }],
        title: "로그인 화면",
        text: "로그인 혹은 회원가입 클릭시 애니메이션 효과",
      },
      {
        media: [{ src: login_2 }],
        title: "로그인 화면",
        text: "-",
      },
      {
        media: [{ src: login_3 }],
        title: "회원가입 화면",
        text: "입력값에 따라 실시간 유효성 검사",
      },
       {
        media: [{ src: crew_1 }],
        title: "산책모임 메인",
        text: "-",
      },
      {
        media: [{ src: crew_2 }],
        title: "산책모임 세부화면",
        text: "-",
      },
       {
        media: [{ src: gall }],
        title: "반려동물 갤러리",
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
        media: [{ src: mainPovi }],
        title: "음성분석 및 캐릭터 생성 - 애니메이션",
        text: "- 음성을 통한 분석 및 음성을 통한 이미지를 보여주는 서비스 제공\n- Uvicorn (ASGI 서버), FFmpeg(음성 변환 및 영상 처리)\n- Stable Diffusion API (이미지 생성)\n- FFmpeg(실시간 변환/영상 처리)\n- replicate API (ai 영상 생성)",
      },
      {
        media: [{ src: Povivideo, type: "video" }],
        title: "설명",
        text: "- 프롬프트 : \n고정된 카메라, 캐릭터가 정면을 보다가 카메라 기준으로 왼쪽으로 시선을 옮김\n 움직임은 눈 깜빡임 정도와 시선 이동\n 입은 끝까지 닫지않음\n 표정은 중립\n움직임에 흔들림, 깜빡임, 형태변화 없음\n마지막은 캐릭터가 가볍게 미소짓는걸로 끝남\n- /shot_001/keyframes/0001.png를 기준으로 영상을 만들도록 설정"
      },
    ],
  },
  {
    id: 4,
    image: imgDashboard,
    title: "Lingbo Dashboard",
    text: "UTM/QR 실시간 분석 & 알림",
    blocks: [
      {
        media: [{ src: imgDashboard }],
        title: "대시보드",
        text: "웹사이트 및 외부 채널(포스터, 명함, 배너 등)을 통해 공유된 링크/QR 접속 데이터를 수집하여 대시보드 형태로 시각화/분석하고 단축 URL 및 QR 코드를 제공하며, \n클릭 로그를 기반으로 시간대별, 디바이스별, 유입 채널별 통계를 확인 가능.\n이상 징후 탐지(스팸/스크래핑) 및 링크 상태(만료, 404, 리다이렉트 루프) 모니터링 기능 제공.",
      }
    ],
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
