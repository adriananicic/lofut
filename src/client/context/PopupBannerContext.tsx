import { createContext, useContext, useState, ReactNode } from "react";

export type BannerType = "success" | "error" | "info";

interface BannerMessage {
  type: BannerType;
  text: string;
}

interface PopupBannerContextType {
  message: BannerMessage | null;
  showMessage: (msg: BannerMessage) => void;
  clearMessage: () => void;
}

const PopupBannerContext = createContext<PopupBannerContextType | undefined>(
  undefined
);

export const PopupBannerProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState<BannerMessage | null>(null);

  const showMessage = (msg: BannerMessage) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 4000);
  };

  const clearMessage = () => setMessage(null);

  return (
    <PopupBannerContext.Provider value={{ message, showMessage, clearMessage }}>
      {children}
    </PopupBannerContext.Provider>
  );
};

export const usePopupBanner = () => {
  const context = useContext(PopupBannerContext);
  if (!context)
    throw new Error("usePopupBanner must be used within PopupBannerProvider");
  return context;
};
