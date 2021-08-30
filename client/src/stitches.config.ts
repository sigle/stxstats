import { createCss } from "@stitches/react";

const gray = {
  gray1: "#fcfcfc",
  gray2: "#f9f9f9",
  gray3: "#f3f3f3",
  gray4: "#ededed",
  gray5: "#e8e8e8",
  gray6: "#e2e2e2",
  gray7: "#dbdbdb",
  gray8: "#c7c7c7",
  gray9: "#737373",
  gray10: "#2f2f2f",
  gray11: "#282828",
  gray12: "#1a1a1a",
};

const grayDark = {
  gray1: "#1a1a1a",
  gray2: "#1c1c1c",
  gray3: "#232323",
  gray4: "#282828",
  gray5: "#2e2e2e",
  gray6: "#343434",
  gray7: "#3e3e3e",
  gray8: "#505050",
  gray9: "#a1a1a1",
  gray10: "#d3d3d3",
  gray11: "#e5e5e5",
  gray12: "#f9f9f9",
};

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
