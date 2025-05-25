"use client";

import React from "react";
import { usePopupBanner } from "../context/PopupBannerContext";

export default function PopupBanner() {
  const { message } = usePopupBanner();

  if (!message) return null;

  return (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded shadow-lg z-50 ${
        message.type === "success"
          ? "bg-green-500 text-white"
          : message.type === "error"
          ? "bg-red-500 text-white"
          : "bg-blue-500 text-white"
      }`}
    >
      {message.text}
    </div>
  );
}
