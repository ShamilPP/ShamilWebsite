"use client";

import dynamic from "next/dynamic";

const Site = dynamic(() => import("@/components/Site"), { ssr: false });

export default function Page() {
  return <Site />;
}
