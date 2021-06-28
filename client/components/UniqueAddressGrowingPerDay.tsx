import { useState } from "react";
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
import statsData from "../../api/data.json";
import { victoryTheme } from "../styles/victory";

const normalizedStatsData = statsData.uniqueAddressGrowingPerDay.map(
  (data) => ({
    a: new Date(data.date),
    b: data.value,
  })
);

export const UniqueAddressGrowingPerDay = () => {
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
    <div>
      <p className="chart-description">
        Number of unique addresses overtime on Stacks
      </p>
      <VictoryChart
        theme={victoryTheme}
        width={600}
        height={470}
        scale={{ x: "time" }}
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
            data: { stroke: "#1DEFC7" },
          }}
          data={normalizedStatsData}
          x="a"
          y="b"
        />
      </VictoryChart>
      <VictoryChart
        theme={victoryTheme}
        padding={{ top: 0, left: 50, right: 50, bottom: 30 }}
        width={600}
        height={100}
        scale={{ x: "time" }}
        containerComponent={
          <VictoryBrushContainer
            brushDimension="x"
            brushDomain={zoomDomain}
            onBrushDomainChange={handleZoom}
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
