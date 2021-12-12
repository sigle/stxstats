import { styled } from "../stitches.config";

export const Button = styled("button", {
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "$2",

  variants: {
    size: {
      md: {
        py: "$2",
        pr: "$4",
        pl: "$4",
        m: "$1",
        br: "$1",
      },
    },
    color: {
      gray: {
        color: "$gray11",
        "&:hover": {
          backgroundColor: "$gray4",
        },
        "&:active": {
          backgroundColor: "$gray5",
        },
      },
    },
  },
  defaultVariants: {
    size: "md",
    color: "gray",
  },
});