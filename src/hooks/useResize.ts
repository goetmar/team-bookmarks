import { useCallback, useState } from "react";

type Resize = {
  width: number | string;
  enableResize: () => void;
};

const useResize = (initialWidth?: number | string): Resize => {
  const [width, setWidth] = useState<number | string>(initialWidth || 0);

  const enableResize = useCallback(() => {
    document.addEventListener("mousemove", resize);
    document.addEventListener("mouseup", disableResize);
  }, []);

  const disableResize = useCallback(() => {
    document.removeEventListener("mousemove", resize);
    document.removeEventListener("mouseup", disableResize);
  }, []);

  const resize = useCallback((e: MouseEvent) => {
    const newWidth = e.clientX + 1;
    setWidth(newWidth + "px");
  }, []);

  return { width, enableResize };
};

export default useResize;
