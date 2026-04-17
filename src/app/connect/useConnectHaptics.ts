"use client";

import { useCallback } from "react";
import { useWebHaptics } from "web-haptics/react";

/**
 * Shared haptic helpers for the Connect flow.
 * - tapOption: subtle single tap for selecting a radio/checkbox option
 * - tapNudge: firmer nudge for larger actions like card/button taps
 */
export function useConnectHaptics() {
  const { trigger } = useWebHaptics();

  const tapOption = useCallback(() => {
    trigger(15);
  }, [trigger]);

  const tapNudge = useCallback(() => {
    trigger("nudge");
  }, [trigger]);

  return { tapOption, tapNudge };
}
