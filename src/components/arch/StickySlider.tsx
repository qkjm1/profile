import React from "react";
import type { ProfileItem } from "../../components/ProfileSlider";

/** 슬라이더 디자인 그대로 쓰려면
 *  - ProfileSlider에서 쓰던 카드 클래스명을 여기에 맞춰주거나
 *  - 아래 ProfileCard를 그 클래스명으로 맞춰주세요.
 */
function ProfileCard({ item }: { item: ProfileItem }) {
  return (
    <article className="profile-card">
      <div className="profile-card__media">
        <img src={item.avatar} alt={item.name} />
      </div>
      <div className="profile-card__body">
        <h3 className="profile-card__title">{item.name}</h3>
        {item.role && <p className="profile-card__role">{item.role}</p>}
        <p className="profile-card__desc">{item.desc}</p>
        {item.handle?.url && (
          <a
            className="profile-card__link"
            href={item.handle.url}
            target="_blank"
            rel="noreferrer"
          >
            {item.handle.label ?? "more"}
          </a>
        )}
      </div>
    </article>
  );
}

export default function StickySlider({ items }: { items: ProfileItem[] }) {
  return (
    <div className="sticky-slider">
      <div className="sticky-slider__viewport">
        {items.map((it, idx) => (
          <div
            className={`sticky-slide${idx === 0 ? " is-active" : ""}`}
            data-slide-index={idx}
            key={it.id}
          >
            <ProfileCard item={it} />
          </div>
        ))}
      </div>
    </div>
  );
}
