import { useCallback, useState } from "react";

type Resize = {
  width: number | string;
  enableResize: () => void;
};

const getLocalWidth = (): number | null => {
  const localDrawerWidth = localStorage.getItem("drawerWidth");
  return localDrawerWidth !== null
    ? Number(JSON.parse(localDrawerWidth))
    : null;
};

const setLocalWidth = (width: number) => {
  localStorage.setItem("drawerWidth", JSON.stringify(width));
};

const useResize = (initialWidth?: number | string): Resize => {
  const [width, setWidth] = useState<number | string>(
    getLocalWidth() ?? initialWidth ?? 0
  );

  const resize = useCallback((e: MouseEvent) => {
    const newWidth = e.clientX + 1;
    setWidth(newWidth + "px");
    setLocalWidth(newWidth);
  }, []);

  const disableResize = useCallback(() => {
    document.removeEventListener("mousemove", resize);
    document.removeEventListener("mouseup", disableResize);
  }, [resize]);

  const enableResize = useCallback(() => {
    document.addEventListener("mousemove", resize);
    document.addEventListener("mouseup", disableResize);
  }, [resize, disableResize]);

  return { width, enableResize };
};

export default useResize;
