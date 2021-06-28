import { useEffect, useState } from "react";
import {
  VictoryChart,
  VictoryZoomContainer,
  VictoryLine,
  VictoryBrushContainer,
  VictoryAxis,
} from "victory";
import format from "date-fns/format";
import statsData from "../../api/data.json";

const normalizedStatsData = statsData.map((data) => ({
  a: new Date(data.date),
  b: data.value,
}));

const Home = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [zoomDomain, setZoomDomain] = useState<any>({
    x: [
      new Date(normalizedStatsData[0].a),
      new Date(normalizedStatsData[normalizedStatsData.length - 1].a),
    ],
  });

  const handleZoom = (domain: any) => {
    setZoomDomain(domain);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  // console.log(normalizedStatsData);

  return (
    <div style={{ margin: "auto", maxWidth: 600 }}>
      <VictoryChart
        width={600}
        height={470}
        scale={{ x: "time" }}
        containerComponent={
          <VictoryZoomContainer
            zoomDimension="x"
            zoomDomain={zoomDomain}
            onZoomDomainChange={handleZoom}
          />
        }
      >
        <VictoryLine
          style={{
            data: { stroke: "tomato" },
          }}
          data={normalizedStatsData}
          x="a"
          y="b"
        />
      </VictoryChart>
      <VictoryChart
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
            data: { stroke: "tomato" },
          }}
          data={normalizedStatsData}
          x="a"
          y="b"
        />
      </VictoryChart>
    </div>
  );
};

export default Home;
