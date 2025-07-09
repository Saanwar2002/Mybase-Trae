
"use client";

import React, { useEffect, useState } from 'react';

export function ThemeInitializer({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    if (typeof window !== 'undefined') {
      let themeToApply = localStorage.getItem('theme');

      if (!themeToApply) {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          themeToApply = 'dark';
        } else {
          themeToApply = 'light';
        }
      }

      if (themeToApply === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, []);

  // Prevent hydration mismatch by not rendering until mounted