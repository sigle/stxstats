import { createCss } from "@stitches/react";
import { gray, grayDark } from "@radix-ui/colors";

// TODO remove unused colors

export const { styled, css, global, keyframes, getCssString, theme } =
  createCss({
    theme: {
      colors: {
        ...gray,
      },
      fonts: {
        lato: "'Lato', sans-serif",
        merri: "'Merriweather', serif",
      },
      space: {
        1: "4px",
        2: "8px",
        3: "12px",
        4: "16px",
        5: "20px",
        6: "24px",
        7: "28px",
        8: "32px",
        9: "36px",
        10: "40px",
      },
      sizes: {
        1: "4px",
        2: "8px",
        3: "12px",
        4: "16px",
        5: "20px",
        6: "24px",
        7: "28px",
        8: "32px",
        9: "36px",
        10: "40px",
      },
      fontSizes: {
        1: "12px",
        2: "14px",
        3: "16px",
        4: "21px",
        5: "24px",
        6: "30px",
        7: "36px",
        8: "48px",
        9: "72px",
      },
      radii: {
        1: "4px",
        2: "6px",
        3: "8px",
        4: "12px",
        round: "50%",
      },
    },
    media: {
      sm: "(min-width: 640px)",
      md: "(min-width: 768px)",
      lg: "(min-width: 1024px)",
      xl: "(min-width: 1280px)",
      "2xl": "(min-width: 1536px)",
    },
    utils: {
      p: () => (value: any) => ({
        paddingTop: value,
        paddingBottom: value,
        paddingLeft: value,
        paddingRight: value,
      }),
      pt: () => (value: any) => ({
        paddingTop: value,
      }),
      pr: () => (value: any) => ({
        paddingRight: value,
      }),
      pb: () => (value: any) => ({
        paddingBottom: value,
      }),
      pl: () => (value: any) => ({
        paddingLeft: value,
      }),
      px: () => (value: any) => ({
        paddingLeft: value,
        paddingRight: value,
      }),
      py: () => (value: any) => ({
        paddingTop: value,
        paddingBottom: value,
      }),

      m: () => (value: any) => ({
        marginTop: value,
        marginBottom: value,
        marginLeft: value,
        marginRight: value,
      }),
      mt: () => (value: any) => ({
        marginTop: value,
      }),
      mr: () => (value: any) => ({
        marginRight: value,
      }),
      mb: () => (value: any) => ({
        marginBottom: value,
      }),
      ml: () => (value: any) => ({
        marginLeft: value,
      }),
      mx: () => (value: any) => ({
        marginLeft: value,
        marginRight: value,
      }),
      my: () => (value: any) => ({
        marginTop: value,
        marginBottom: value,
      }),

      br: () => (value: any) => ({
        borderRadius: value,
      }),
    },
  });

export const darkTheme = theme("dark-theme", {
  colors: {
    ...grayDark,
  },
});
