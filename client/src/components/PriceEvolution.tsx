import { useCallback, useMemo } from 'react';
import format from 'date-fns/format';
import { withParentSize } from '@visx/responsive';
import {
  WithParentSizeProps,
  WithParentSizeProvidedProps,
} from '@visx/responsive/lib/enhancers/withParentSize';
import { scaleTime, scaleLinear } from '@visx/scale';
import { Bar } from '@visx/shape';
import { localPoint } from '@visx/event';
import { max, extent, bisector } from 'd3-array';
import { useTooltip, useTooltipInPortal } from '@visx/tooltip';
import AreaChart from './AreaChart';
import { accentOrange, accentOrangeDark, tooltipStyles } from '../styles/visx';
import { Tooltip, TooltipDate, TooltipText } from './TooltipChart';
import { useTheme } from 'next-themes';

interface PriceEvolutionData {
  value: number;
  date: string;
}

const getDate = (d: PriceEvolutionData) => new Date(d.date);
const getStockValue = (d: PriceEvolutionData) => d.value;
const bisectDate = bisector<PriceEvolutionData, Date>(
  (d) => new Date(d.date)
).left;

interface PriceEvolutionProps extends WithParentSizeProps {
  priceEvolution: PriceEvolutionData[];
}

const PriceEvolution = ({
  priceEvolution,
  parentHeight: height,
  parentWidth: width,
}: PriceEvolutionProps & WithParentSizeProvidedProps) => {
  const { theme } = useTheme();

  const margin = {
    top: 20,
    left: 50,
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
        domain: extent(priceEvolution, getDate) as [Date, Date],
      }),
    [xMax, priceEvolution]
  );
  const stockValueScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [yMax, 0],
        domain: [0, max(priceEvolution, getStockValue) || 0],
        nice: true,
      }),
    [yMax, priceEvolution]
  );

  const {
    tooltipOpen,
    tooltipTop,
    tooltipLeft,
    hideTooltip,
    showTooltip,
    tooltipData,
  } = useTooltip<PriceEvolutionData>();

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
      const index = bisectDate(priceEvolution, x0, 1);
      const d0 = priceEvolution[index - 1];
      const d1 = priceEvolution[index];
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
          data={priceEvolution}
          width={width!}
          margin={margin}
          yMax={yMax}
          xScale={dateScale}
          yScale={stockValueScale}
          gradientColor={theme === 'dark' ? accentOrangeDark : accentOrange}
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
                fill={'#F76808'}
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
          <Tooltip>
            <TooltipDate>
              {format(new Date(tooltipData.date), 'EEEE, MMMM d, yyyy')}
            </TooltipDate>
            <TooltipText>{`$${tooltipData.value}`}</TooltipText>
          </Tooltip>
        </TooltipInPortal>
      )}
    </>
  );
};

const enhancedPriceEvolution =
  withParentSize<PriceEvolutionProps>(PriceEvolution);

export { enhancedPriceEvolution as PriceEvolution };
