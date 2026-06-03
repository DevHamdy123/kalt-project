"use client";

import React, { createContext, useContext, useState } from "react";

type SidebarContextType = {
  isOpen: boolean;
  toggle: () => void;
};

const SidebarContext = createContext<SidebarContextType>({
  isOpen: false,
  toggle: () => {},
});

export const useSidebar = () => useContext(SidebarContext);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SidebarContext.Provider
      value={{ isOpen, toggle: () => setIsOpen(!isOpen) }}
    >
      {children}
    </SidebarContext.Provider>
  );
}
