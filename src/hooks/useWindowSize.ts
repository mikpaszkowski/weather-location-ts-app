import { useEffect, useLayoutEffect, useState } from "react";

interface WindowSize {
  height: number,
  width: number
}

export const useWindowSize = (): WindowSize => {

  const [windowSize, setWindowSize] = useState<WindowSize>({
    height: 0,
    width: 0
  });

  const handleSize = () => {
    setWindowSize({
      height: window.innerHeight,
      width: window.innerWidth
    });
  };

  useEffect(() => {
    window.addEventListener("resize", handleSize);

    return () => {
      window.removeEventListener("resize", handleSize);
    }
  })

  useLayoutEffect(() => {
    handleSize();
  }, []);


  return windowSize;
};