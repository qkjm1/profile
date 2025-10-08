// types/arch.ts
export type ArchInfo = {
  id: string;                       // ex) "green-arch"
  header?: string;
  desc?: string;
  link?: { href: string; label: string; bg: string };
  content?: React.ReactNode;        // 있으면 header/desc/link 대신 이걸 렌더
};

// 기존 ArchImage에 텍스트 필드만 옵션으로 추가
export type ArchImage = {
  src: string;
  alt?: string;
  z?: number;             // z-index 용 (선택)
  name?: string;          // ⬅️ 추가
  school?: string;        // ⬅️ 추가
  email?: string;         // ⬅️ 추가
};
// types.ts (또는 ProfileItem이 선언된 파일)
export type HandleLink = {
  url: string;          // 'https://velog.io/@qkjm1' | 'mailto:...'
  label: string;        // 'GitHub' | 'Velog' | 'Email'
  aria?: string;        // 접근성용 라벨(선택)
};

export type ProfileItem = {
  id: string;
  name: string;
  role?: string;
  avatar?: string;
  desc?: string;

  // ⬇️ 기존 단일도 호환되게 두고
  handle?: HandleLink;
  // ⬇️ 멀티 링크는 여기로
  handles?: HandleLink[];
};
