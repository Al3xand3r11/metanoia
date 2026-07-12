import { FaYoutube, FaSpotify, FaInstagram, FaTiktok } from "react-icons/fa";
import type { IconType } from "react-icons";

export const marqueeText =
  "(meh-tuh-NOY-uh): a deep shift in your mind, heart, and spirit — a turning point back to your light.";

// Video files for mobile background
export const mobileVideos = [
  "/eyes.mov",
  "/laying.mov",
  "/beach.mov",
  "/outside.mov",
  "/water.mov",
];

export interface SocialLink {
  href: string;
  label: string;
  Icon: IconType;
}

export const socialLinks: SocialLink[] = [
  {
    href: "https://www.youtube.com/@itscleoplus",
    label: "YouTube",
    Icon: FaYoutube,
  },
  {
    href: "https://open.spotify.com/artist/2eg5AuNNcwQYMtoZQNTH4p",
    label: "Spotify",
    Icon: FaSpotify,
  },
  {
    href: "https://www.instagram.com/itscleoplus/",
    label: "Instagram",
    Icon: FaInstagram,
  },
  {
    href: "https://www.tiktok.com/@itscleoplus",
    label: "TikTok",
    Icon: FaTiktok,
  },
];
