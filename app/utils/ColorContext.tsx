// utils/ColorContext.tsx
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

const ColorContext = createContext<string>("");

export const useColor = () => useContext(ColorContext);

export const ColorProvider = ({ children }: { children: ReactNode }) => {
  const [color, setColor] = useState<string>("");

  useEffect(() => {
    const getRandomColor = (): string => {
      const colors: string[] = [
        "#2a235d",
        "#501819",
        "#013b17",
        "#422800",
        "#511a00",
        "#4f1823",
      ];
      const randomIndex: number = Math.floor(Math.random() * colors.length);
      return colors[randomIndex];
    };

    setColor(getRandomColor());
  }, []);

  return (
    <ColorContext.Provider value={color}>{children}</ColorContext.Provider>
  );
};
