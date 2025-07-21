import { useCallback, useEffect } from "react";
import { generateTypeCheck } from "../types/types";

type OptionalConfig = Pick<KeyboardEvent, "altKey" | "ctrlKey" | "shiftKey"> & {
  shortcutTarget: HTMLElement;
};

type CodeConfig = { code: KeyboardEvent["code"]; key?: never };
type KeyConfig = { key: KeyboardEvent["key"]; code?: never };

type ShortcutConfig = Partial<OptionalConfig> & (CodeConfig | KeyConfig);

type ShortcutAction = (e: KeyboardEvent) => void;

const isKeyBoardEvent = generateTypeCheck<Event, KeyboardEvent>([
  "key",
  "code",
]);

export default function useKeyboardShortcut(
  shortcutAction: ShortcutAction,
  config: ShortcutConfig
) {
  const targetElement = config.shortcutTarget || document;

  const eventHandler = useCallback(
    (e: Event) => {
      if (!isKeyBoardEvent(e)) throw new Error("Not a KeyboardEvent");
      const { code, key, ctrlKey, altKey, shiftKey } = e;
      if (config.code && config.code !== code) return;
      if (config.key && config.key !== key) return;
      if (config.ctrlKey && !ctrlKey) return;
      if (config.shiftKey && !shiftKey) return;
      if (config.altKey && !altKey) return;

      shortcutAction(e);
    },
    [shortcutAction, config]
  );

  useEffect(() => {
    targetElement.addEventListener("keydown" as const, eventHandler);
    return () => targetElement.removeEventListener("keydown", eventHandler);
  }, [document, eventHandler]);
}
