import { ScaleValue } from "@stitches/react";

export const stackGap = (value: ScaleValue<"space">) => ({
  $$gap: `$space${value}`
});