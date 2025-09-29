// components/arch/ArchInfoBlock.tsx
import React from "react";
import type { ArchInfo } from "./types/arch";

export default function ArchInfoBlock({ item }: { item: ArchInfo }) {
  return (
    <div className="arch__info" id={item.id}>
      {item.content ? (
        item.content
      ) : (
        <div className="content">
          {item.header && <h2 className="header">{item.header}</h2>}
          {item.desc && <p className="desc">{item.desc}</p>}
          {item.link && (
            <a className="link" href={item.link.href} style={{ backgroundColor: item.link.bg }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" fill="none">
                <path
                  fill="#121212"
                  d="M5 2c0 1.105-1.895 2-3 2a2 2 0 1 1 0-4c1.105 0 3 .895 3 2ZM11 3.5c0 1.105-.895 3-2 3s-2-1.895-2-3a2 2 0 1 1 4 0ZM6 9a2 2 0 1 1-4 0c0-1.105.895-3 2-3s2 1.895 2 3Z"
                />
              </svg>
              <span>{item.link.label}</span>
            </a>
          )}
        </div>
      )}
    </div>
  );
}
