import { useEffect, useRef } from "react";

function useResponsiveFontSize() {
  const elementRef = useRef(null);

  useEffect(() => {
    console.log(elementRef);
    const adjustFontSize = () => {
      if (elementRef.current) {
        const { offsetWidth } = elementRef.current;
        const screenWidth = window.innerWidth;
        const fontSize =
          Math.max(1.5, (screenWidth / offsetWidth) * 2.5) + "rem";
        elementRef.current.style.fontSize = fontSize;
      }
    };

    adjustFontSize();
    window.addEventListener("resize", adjustFontSize);

    return () => window.removeEventListener("resize", adjustFontSize);
  }, []);

  return elementRef;
}

export default useResponsiveFontSize;
