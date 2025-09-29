import React from "react";
import ProfileSlider, { ProfileItem } from "../components/ProfileSlider";

const items: ProfileItem[] = [
  {
    id: "chris-1",
    name: "Chris Coyier",
    role: "CO-FOUNDER",
    desc: "Chris is a front-end developer and designer...",
    handle: { label: "@chriscoyier", url: "https://twitter.com/chriscoyier" },
    avatar: "/imgs/chris.jpg",
    theme: "sun" // "rose" | "coral" | "cloud"
  },
  {
    id: "chris-2",
    name: "Chris Coyier",
    role: "CO-FOUNDER",
    desc: "Chris is a front-end developer and designer...",
    handle: { label: "@chriscoyier", url: "https://twitter.com/chriscoyier" },
    avatar: "/imgs/chris.jpg",
    theme: "sun" // "rose" | "coral" | "cloud"
  },
  {
    id: "chris-3",
    name: "Chris Coyier",
    role: "CO-FOUNDER",
    desc: "Chris is a front-end developer and designer...",
    handle: { label: "@chriscoyier", url: "https://twitter.com/chriscoyier" },
    avatar: "/imgs/chris.jpg",
    theme: "sun" // "rose" | "coral" | "cloud"
  },
  {
    id: "chris-4",
    name: "Chris Coyier",
    role: "CO-FOUNDER",
    desc: "Chris is a front-end developer and designer...",
    handle: { label: "@chriscoyier", url: "https://twitter.com/chriscoyier" },
    avatar: "/imgs/chris.jpg",
    theme: "sun" // "rose" | "coral" | "cloud"
  },
];

export default function ProfilesSection() {
 return <ProfileSlider items={items} fullscreen colorfulBg={false} />;
}
