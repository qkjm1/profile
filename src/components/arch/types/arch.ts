// types/arch.ts
export type ArchInfo = {
  id: string;                       // ex) "green-arch"
  header?: string;
  desc?: string;
  link?: { href: string; label: string; bg: string };
  content?: React.ReactNode;        // 있으면 header/desc/link 대신 이걸 렌더
};

export type ArchImage = {
  src: string;
  alt: string;
  z: number;                        // data-index와 동일 (zIndex용)
};
