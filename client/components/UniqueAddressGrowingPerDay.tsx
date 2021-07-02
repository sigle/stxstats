import { useMemo, useState } from "react";
import {
  VictoryChart,
  VictoryZoomContainer,
  VictoryLine,
  VictoryBrushContainer,
  VictoryAxis,
  VictoryVoronoiContainer,
  createContainer,
} from "victory";
import format from "date-fns/format";
import { victoryTheme } from "../styles/victory";

export const UniqueAddressGrowingPerDay = ({ statsData }: any) => {
  const normalizedStatsData = useMemo(
    () =>
      statsData.map((data: any) => ({
        a: new Date(data.date),
        b: data.value,
      })),
    [statsData]
  );

  const [zoomDomain, setZoomDomain] = useState<any>({
    x: [
      new Date(normalizedStatsData[0].a),
      new Date(normalizedStatsData[normalizedStatsData.length - 1].a),
    ],
  });

  const handleZoom = (domain: any) => {
    setZoomDomain(domain);
  };

  const VictoryZoomVoronoiContainer: any = createContainer<
    VictoryZoomContainer,
    VictoryVoronoiContainer
  >("zoom", "voronoi");

  return (
    <div id="unique-addresses">
      <p className="chart-description">Unique addresses over time</p>
      <VictoryChart
        theme={victoryTheme}
        width={600}
        height={470}
        scale={{ x: "time" }}
        padding={{ left: 60, top: 50, right: 20, bottom: 50 }}
        containerComponent={
          <VictoryZoomVoronoiContainer
            zoomDimension="x"
            zoomDomain={zoomDomain}
            onZoomDomainChange={handleZoom}
            labels={({ datum }: any) =>
              `${format(datum.a, "EEEE, MMMM d, yyyy")} - ${
                datum.b
              } unique addresses`
            }
          />
        }
      >
        <VictoryLine
          style={{
            data: { stroke: "#1DEFC7", strokeWidth: 2 },
          }}
          data={normalizedStatsData}
          x="a"
          y="b"
        />
      </VictoryChart>
      <VictoryChart
        theme={victoryTheme}
        padding={{ top: 0, left: 60, right: 20, bottom: 30 }}
        width={600}
        height={100}
        scale={{ x: "time" }}
        containerComponent={
          <VictoryBrushContainer
            brushDimension="x"
            brushDomain={zoomDomain}
            onBrushDomainChange={handleZoom}
            brushStyle={{
              stroke: "transparent",
              fill: "#FF5582",
              fillOpacity: 0.1,
            }}
          />
        }
      >
        <VictoryAxis tickFormat={(x) => format(x, "MMMM")} />
        <VictoryLine
          style={{
            data: { stroke: "#1DEFC7" },
          }}
          data={normalizedStatsData}
          x="a"
          y="b"
        />
      </VictoryChart>
    </div>
  );
};
