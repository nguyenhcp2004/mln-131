import { useState, useEffect } from "react";
import { getSetting, setSetting } from "@/lib/idb/settingsIdb";

const AUTO_SEND_KEY = "chat_auto_send_mode";

export function useAutoSendMode() {
  const [isAutoSendEnabled, setIsAutoSendEnabled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getSetting(AUTO_SEND_KEY, false).then((value) => {
      setIsAutoSendEnabled(value);
      setIsLoaded(true);
    });
  }, []);

  const toggleAutoSend = async () => {
    const newValue = !isAutoSendEnabled;
    setIsAutoSendEnabled(newValue);
    await setSetting(AUTO_SEND_KEY, newValue);
  };

  const enableAutoSend = async () => {
    if (!isAutoSendEnabled) {
      setIsAutoSendEnabled(true);
      await setSetting(AUTO_SEND_KEY, true);
    }
  };

  return {
    isAutoSendEnabled,
    isLoaded,
    toggleAutoSend,
    enableAutoSend,
  };
}
