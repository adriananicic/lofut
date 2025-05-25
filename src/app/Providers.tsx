"use client";

import React from "react";
import { PopupBannerProvider } from "@/client/context/PopupBannerContext";
import PopupBanner from "@/client/components/PopupBanner";
import GlobalNav from "@/client/components/GlobalNav";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PopupBannerProvider>
      <PopupBanner />
      <GlobalNav />
      {children}
    </PopupBannerProvider>
  );
}
