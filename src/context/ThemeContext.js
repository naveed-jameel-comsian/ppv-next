"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [isFixedTop, setIsFixedTop] = useState(false);
  const [openSubMenuIndex, setOpenSubMenuIndex] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);


  const toggleSubMenu = (index, event) => {
    event.preventDefault();
    setOpenSubMenuIndex(openSubMenuIndex === index ? null : index);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    const popupMobileMenu = document.querySelector(".popup_mobile_menu");
    if (popupMobileMenu) {
      if (!isMobileMenuOpen) {
        popupMobileMenu.classList.add("show_menu");
      } else {
        popupMobileMenu.classList.remove("show_menu");
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <ThemeContext.Provider
      value={{
        isFixedTop,
        openSubMenuIndex,
        setOpenSubMenuIndex,
        toggleSubMenu,
        toggleMobileMenu,
        showScrollTop,
        scrollToTop,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
