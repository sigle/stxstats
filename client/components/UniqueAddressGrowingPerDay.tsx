import { useCallback, useMemo } from "react";
import format from "date-fns/format";
import { withParentSize } from "@visx/responsive";
import {
  WithParentSizeProps,
  WithParentSizeProvidedProps,
} from "@visx/responsive/lib/enhancers/withParentSize";
import { scaleTime, scaleLinear } from "@visx/scale";
import { Bar } from "@visx/shape";
import { localPoint } from "@visx/event";
import { max, extent, bisector } from "d3-array";
import { useTooltip, useTooltipInPortal } from "@visx/tooltip";
import AreaChart from "./AreaChart";
import { accentColor, accentColorDark, tooltipStyles } from "../styles/visx";

interface StatsData {
  value: number;
  date: string;
}

interface NormalizedStatsData {
  value: number;
  date: string;
  dailyIncrease?: number;
}

const getDate = (d: StatsData) => new Date(d.date);
const getStockValue = (d: StatsData) => d.value;
const bisectDate = bisector<StatsData, Date>((d) => new Date(d.date)).left;

interface UniqueAddressGrowingPerDayProps extends WithParentSizeProps {
  statsData: StatsData[];
}

const UniqueAddressGrowingPerDay = ({
  statsData,
  parentHeight: height,
  parentWidth: width,
}: UniqueAddressGrowingPerDayProps & WithParentSizeProvidedProps) => {
  const normalizedStatsData = useMemo<NormalizedStatsData[]>(() => {
    return statsData.map((data, index) =>
      statsData[index - 1]
        ? {
            ...data,
            dailyIncrease: data.value - statsData[index - 1].value,
          }
        : data
    );
  }, [statsData]);

  const margin = {
    top: 20,
    left: 60,
    bottom: 20,
    right: 20,
  };

  const innerWidth = width! - margin.left - margin.right;
  const innerHeight = height! - margin.top - margin.bottom;

  const xMax = Math.max(width! - margin.left - margin.right, 0);
  const yMax = Math.max(innerHeight! - 10, 0);

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
        domain: [320000, max(statsData, getStockValue) || 0],
        nice: true,
      }),
    [yMax, statsData]
  );

  const {
    tooltipOpen,
    tooltipTop,
    tooltipLeft,
    hideTooltip,
    showTooltip,
    tooltipData,
  } = useTooltip<NormalizedStatsData>();

  const { containerRef, TooltipInPortal } = useTooltipInPortal({
    detectBounds: true,
    scroll: true,
  });

  const handleTooltip = useCallback(
    (
      event: React.TouchEvent<SVGRectElement> | React.MouseEvent<SVGRectElement>
    ) => {
      let { x } = localPoint(event) || { x: 0 };
      // Count the graph margin in
      x = x - margin.left;

      const x0 = dateScale.invert(x);
      const index = bisectDate(normalizedStatsData, x0, 1);
      const d0 = normalizedStatsData[index - 1];
      const d1 = normalizedStatsData[index];
      let d = d0;
      if (d1 && getDate(d1)) {
        d =
          x0.valueOf() - getDate(d0).valueOf() >
          getDate(d1).valueOf() - x0.valueOf()
            ? d1
            : d0;
      }

      showTooltip({
        tooltipData: d,
        tooltipLeft: x,
        tooltipTop: stockValueScale(getStockValue(d)),
      });
    },
    [showTooltip, stockValueScale, dateScale]
  );

  return (
    <>
      <svg ref={containerRef} width={width} height={height}>
        <AreaChart
          data={statsData}
          width={width!}
          margin={margin}
          yMax={yMax}
          xScale={dateScale}
          yScale={stockValueScale}
          gradientColor={accentColor}
        >
          <Bar
            width={innerWidth}
            height={innerHeight}
            fill="transparent"
            rx={14}
            onTouchStart={handleTooltip}
            onTouchMove={handleTooltip}
            onMouseMove={handleTooltip}
            onMouseLeave={() => hideTooltip()}
          />

          {tooltipData && (
            <g>
              <circle
                cx={tooltipLeft}
                cy={tooltipTop! + 1}
                r={4}
                fill="black"
                fillOpacity={0.1}
                stroke="black"
                strokeOpacity={0.1}
                strokeWidth={2}
                pointerEvents="none"
              />
              <circle
                cx={tooltipLeft}
                cy={tooltipTop}
                r={4}
                fill={accentColorDark}
                stroke="white"
                strokeWidth={2}
                pointerEvents="none"
              />
            </g>
          )}
        </AreaChart>
      </svg>

      {tooltipOpen && tooltipData && (
        <TooltipInPortal
          key={Math.random()}
          top={tooltipTop! - 40}
          left={tooltipLeft! + 26}
          style={tooltipStyles}
        >
          <div className="tooltip">
            <p className="tooltip-date">
              {format(new Date(tooltipData.date), "EEEE, MMMM d, yyyy")}
            </p>
            <p className="tooltip-text">{tooltipData.value} unique addresses</p>
            {tooltipData ? (
              <p className="tooltip-text">
                {tooltipData.dailyIncrease} daily increase
              </p>
            ) : null}
          </div>
        </TooltipInPortal>
      )}
    </>
  );
};

const enhancedUniqueAddressGrowingPerDay = withParentSize<
  UniqueAddressGrowingPerDayProps
>(UniqueAddressGrowingPerDay);

export { enhancedUniqueAddressGrowingPerDay as UniqueAddressGrowingPerDay };
