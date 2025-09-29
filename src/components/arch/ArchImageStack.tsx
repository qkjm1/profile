// components/arch/ArchImageStack.tsx
import React from "react";
import type { ArchImage } from "./types/arch";

export default function ArchImageStack({ images }: { images: ArchImage[] }) {
  return (
    <div className="arch__right">
      {images.map((img) => (
        <div className="img-wrapper" data-index={img.z} key={img.src}>
          <img src={img.src} alt={img.alt} />
        </div>
      ))}
    </div>
  );
}

