import { Axis } from "@visx/axis";
import { curveNatural } from "@visx/curve";
import { LinearGradient } from "@visx/gradient";
import { scaleLinear } from "@visx/scale";
import { LinePath } from "@visx/shape";
import { Text } from "@visx/text";

export default function ExampleChart() {
  const height = 400;
  const width = 500;
  const padding = 55;

  

  const xScale = scaleLinear({
    domain: [1, 10],
    range: [0 + padding, width - padding]
  });

  const yScale = scaleLinear({
    domain: [0, 50],
    range: [height - padding, padding * 2]
  });

  const colors = {
    white: "#FFFFFF",
    black: "#1B1B1B",
    gray: "#98A7C0",
    darkGray: "#2A2A2A",
    accent: "#40FEAE",
    darkAccent: "#256769"
  };

  const data = [
    [1, 0],
    [2, 10],
    [3, 30],
    [4, 5],
    [5, 16],
    [6, 23],
    [7, 48],
    [8, 43],
    [9, 38],
    [10, 0]
  ];

  return (
    <svg height={height} width={width}>
     {/*  <rect
        x={0}
        y={0}
        width={width}
        height={height}
        style={{
          fill: colors.black
        }}
        rx={14}
      /> */}

      <LinearGradient
        id="background-gradient"
        from={colors.darkAccent}
        to={colors.black}
      />

      <LinePath
        data={data}
        x={(d) => xScale(d[0])}
        y={(d) => yScale(d[1])}
        fill="url('#background-gradient')"
        curve={curveNatural}
      />

      <LinearGradient
        id="line-gradient"
        from={colors.accent}
        to={colors.darkAccent}
      />
      

      <LinePath
        data={data}
        x={(d) => xScale(d[0])}
        y={(d) => yScale(d[1])}
        stroke="url('#line-gradient')"
        strokeWidth={3}
        curve={curveNatural}
        markerEnd="url(#marker-circle)"
      />

    </svg>
  );
}
