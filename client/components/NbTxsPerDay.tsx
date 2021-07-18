import { useMemo, useState } from "react";
import format from "date-fns/format";
import { withParentSize } from "@visx/responsive";
import {
  WithParentSizeProps,
  WithParentSizeProvidedProps,
} from "@visx/responsive/lib/enhancers/withParentSize";

interface NbTxsPerDayProps extends WithParentSizeProps {
  statsData: any;
}

const NbTxsPerDay = ({
  statsData,
  parentHeight: height,
  parentWidth: width,
}: NbTxsPerDayProps & WithParentSizeProvidedProps) => {
  console.log({ height });

  return (
    <div id="number-of-txs">
      <p className="chart-description">Transactions per day</p>
      <svg width={width} height={height}>
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill="url(#area-background-gradient)"
          rx={14}
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
        />
        <GridRows
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
        />
        <AreaClosed<AppleStock>
          data={stock}
          x={(d) => dateScale(getDate(d)) ?? 0}
          y={(d) => stockValueScale(getStockValue(d)) ?? 0}
          yScale={stockValueScale}
          strokeWidth={1}
          stroke="url(#area-gradient)"
          fill="url(#area-gradient)"
          curve={curveMonotoneX}
        />
        <Bar
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
