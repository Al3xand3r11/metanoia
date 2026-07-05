"use client";

import { useEffect, useState } from "react";
import MobileHome from "@/app/components/home/MobileHome";
import DesktopHome from "@/app/components/home/DesktopHome";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile ? <MobileHome /> : <DesktopHome />;
}
