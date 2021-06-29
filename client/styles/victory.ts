import { VictoryTheme } from "victory";

const fontFamily = '"Lato", sans-serif';
const whiteColor = "#f1f1f1";

export const victoryTheme = Object.assign(VictoryTheme.material, {
  axis: {
    style: {
      tickLabels: {
        fill: whiteColor,
        fontFamily,
        fontSize: 12,
        padding: 10,
      },
    },
  },
});
