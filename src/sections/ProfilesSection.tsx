import React from "react";
import ProfileSlider, { ProfileItem } from "../components/ProfileSlider";

const items: ProfileItem[] = [
  {
    id: "1",
    name: "Green Cityscape",
    role: "PROJECT",
    desc: "Vibrant streets with vertical gardens and solar buildings...",
    handle: { label: "@read-more", url: "#" },
    avatar: "https://res.cloudinary.com/dbsuruevi/image/upload/v1757093052/cu8978xjlsjjpjk52ta0.webp",
    theme: "coral",
  },
  {
    id: "2",
    name: "Blue Urban Oasis",
    role: "PROJECT",
    desc: "Azure façades, clean energy, smart transit—urban wildlife friendly.",
    handle: { label: "@open", url: "#" },
    avatar: "https://res.cloudinary.com/dbsuruevi/image/upload/v1757093053/trh7c8ufv1dqfrofdytd.webp",
    theme: "cloud",
  },
  {
    id: "3",
    name: "Fluid Architecture",
    role: "R&D",
    desc: "Solar-harnessed desert refuge with fluid forms and glowing interiors.",
    handle: { label: "@details", url: "#" },
    avatar: "https://res.cloudinary.com/dbsuruevi/image/upload/v1757093052/aw6qwur0pggp5r03whjq.webp",
    theme: "rose",
  },
  {
    id: "4",
    name: "Martian Arches",
    role: "CONCEPT",
    desc: "Ethereal arcs over tranquil waters under a Martian sunset.",
    handle: { label: "@case", url: "#" },
    avatar: "https://res.cloudinary.com/dbsuruevi/image/upload/v1757093053/sqwn8u84zd1besgl0zpd.webp",
    theme: "sun",
  },
];

export default function ProfilesSection() {
 return <ProfileSlider items={items} fullscreen colorfulBg={false} />;
}