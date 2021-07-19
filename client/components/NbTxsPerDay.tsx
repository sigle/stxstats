import { useMemo, useState } from "react";
import format from "date-fns/format";
import { withParentSize } from "@visx/responsive";
import {
  WithParentSizeProps,
  WithParentSizeProvidedProps,
} from "@visx/responsive/lib/enhancers/withParentSize";
import { LinearGradient } from "@visx/gradient";
import { scaleTime, scaleLinear } from "@visx/scale";
import { GridRows, GridColumns } from "@visx/grid";
import { AreaClosed } from "@visx/shape";
import { Group } from "@visx/group";
import { max, extent, bisector } from "d3-array";
import { curveMonotoneX } from "@visx/curve";
import { AxisLeft, AxisBottom, AxisScale } from "@visx/axis";
import AreaChart from "./AreaChart";

const background = "#3b6978";
const background2 = "#204051";
const accentColor = "#1DEFC7";
const accentColorDark = "#75daad";

const chartSeparation = 30;

const getDate = (d: any) => new Date(d.date);
const getStockValue = (d: any) => d.value;
const bisectDate = bisector<any, Date>((d: any) => new Date(d.date)).left;

interface NbTxsPerDayProps extends WithParentSizeProps {
  statsData: any;
}

const NbTxsPerDay = ({
  statsData,
  parentHeight: height,
  parentWidth: width,
}: NbTxsPerDayProps & WithParentSizeProvidedProps) => {
  const margin = {
    top: 20,
    left: 50,
    bottom: 20,
    right: 20,
  };

  const compact = false;

  const innerHeight = height! - margin.top - margin.bottom;
  const topChartBottomMargin = compact
    ? chartSeparation / 2
    : chartSeparation + 10;
  const topChartHeight = 0.8 * innerHeight - topChartBottomMargin;
  const bottomChartHeight = innerHeight - topChartHeight - chartSeparation;

  const xMax = Math.max(width! - margin.left - margin.right, 0);
  const yMax = Math.max(topChartHeight, 0);

  // scales
  const dateScale = useMemo(
    () =>
      scaleTime<number>({
        range: [0, xMax],
        domain: extent(statsData, getDate) as [Date, Date],
      }),
    [xMax, statsData]
  );
  const stockValueScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [yMax, 0],
        domain: [0, max(statsData, getStockValue) || 0],
        nice: true,
      }),
    [yMax, statsData]
  );

  return (
    <div id="number-of-txs">
      {/* <p className="chart-description">Transactions per day</p> */}

      <svg width={width} height={height}>
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill="url(#area-background-gradient)"
          rx={14}
        />

        <AreaChart
          data={statsData}
          width={width!}
          margin={{ ...margin }}
          yMax={yMax}
          xScale={dateScale}
          yScale={stockValueScale}
          gradientColor={accentColor}
        />

        {/* <LinearGradient
          id="area-background-gradient"
          from={background}
          to={background2}
        />
        <LinearGradient
          id="area-gradient"
          from={accentColor}
          to={accentColor}
          toOpacity={0.1}
        /> */}

        {/* <GridRows
          left={margin.left}
          scale={stockValueScale}
          width={innerWidth}
          strokeDasharray="1,3"
          stroke={accentColor}
          strokeOpacity={0}
          pointerEvents="none"
        />
        <GridColumns
          top={margin.top}
          scale={dateScale}
          height={innerHeight}
          strokeDasharray="1,3"
          stroke={accentColor}
          strokeOpacity={0.2}
          pointerEvents="none"
        /> */}

        {/* <AreaClosed
          data={statsData}
          x={(d) => dateScale(getDate(d)) ?? 0}
          y={(d) => stockValueScale(getStockValue(d)) ?? 0}
          yScale={stockValueScale}
          strokeWidth={1}
          stroke="url(#area-gradient)"
          fill="url(#area-gradient)"
          curve={curveMonotoneX}
        /> */}
        {/* <Bar
          x={margin.left}
          y={margin.top}
          width={innerWidth}
          height={innerHeight}
          fill="transparent"
          rx={14}
          onTouchStart={handleTooltip}
          onTouchMove={handleTooltip}
          onMouseMove={handleTooltip}
          onMouseLeave={() => hideTooltip()}
        /> */}
      </svg>
    </div>
  );
};

const enhancedNbTxsPerDay = withParentSize<NbTxsPerDayProps>(NbTxsPerDay);

export { enhancedNbTxsPerDay as NbTxsPerDay };
