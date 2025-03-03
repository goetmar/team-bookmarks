import { useCallback, useEffect, useState } from "react";

type Resize = {
  width: number | string;
  enableResize: () => void;
};

const useResize = (initialWidth: number | string): Resize => {
  const [isResizing, setIsResizing] = useState(false);
  const [width, setWidth] = useState<number | string>(initialWidth);

  const enableResize = useCallback(() => {
    setIsResizing(true);
  }, []);

  const disableResize = useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = useCallback(
    (e: MouseEvent) => {
      if (isResizing) {
        const newWidth = e.clientX + 1;
        setWidth(newWidth + "px");
      }
    },
    [isResizing]
  );

  useEffect(() => {
    console.log("effect");
    if (isResizing) {
      document.addEventListener("mousemove", resize);
      document.addEventListener("mouseup", disableResize);
    }

    return () => {
      document.removeEventListener("mousemove", resize);
      document.removeEventListener("mouseup", disableResize);
    };
  }, [isResizing]);

  return { width, enableResize };
};

export default useResize;
