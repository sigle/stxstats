import { styled } from "../stitches.config";

export const Heading = styled("p", {
  fontWeight: 700,

  variants: {
    size: {
      lg: {
        fontSize: "$4",
      },
      xl: {
        fontSize: "$5",
      },
      "2xl": {
        fontSize: "$6",
        letterSpacing: "-0.3px",
      },
      "3xl": {
        fontSize: "$7",
        letterSpacing: "-0.3px",
      },
      "4xl": {
        fontSize: "$8",
        letterSpacing: "-0.3px",
      },
      "5xl": {
        fontSize: "$9",
        letterSpacing: "-0.3px",
      },
    },
  },
});
