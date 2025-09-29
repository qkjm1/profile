import React from "react";
import ProfileSlider, { ProfileItem } from "../components/ProfileSlider";

const items: ProfileItem[] = [
  {
    id: "chris",
    name: "Chris Coyier",
    role: "CO-FOUNDER",
    desc: "Chris is a front-end developer and designer...",
    handle: { label: "@chriscoyier", url: "https://twitter.com/chriscoyier" },
    avatar: "/imgs/chris.jpg",
    theme: "sun" // "rose" | "coral" | "cloud"
  },
  {
    id: "chris",
    name: "Chris Coyier",
    role: "CO-FOUNDER",
    desc: "Chris is a front-end developer and designer...",
    handle: { label: "@chriscoyier", url: "https://twitter.com/chriscoyier" },
    avatar: "/imgs/chris.jpg",
    theme: "sun" // "rose" | "coral" | "cloud"
  },
  {
    id: "chris",
    name: "Chris Coyier",
    role: "CO-FOUNDER",
    desc: "Chris is a front-end developer and designer...",
    handle: { label: "@chriscoyier", url: "https://twitter.com/chriscoyier" },
    avatar: "/imgs/chris.jpg",
    theme: "sun" // "rose" | "coral" | "cloud"
  },
  {
    id: "chris",
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
