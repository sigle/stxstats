import { useEffect, useState } from "react";
import Image from "next/image";
import profilePic from "../public/images/stx_stats_logo.png";
import { NbTxsPerDay } from "../components/NbTxsPerDay";
import { UniqueAddressGrowingPerDay } from "../components/UniqueAddressGrowingPerDay";
import { Menu } from "../components/Menu";

// TODO add fathom
// TODO mobile css
// TODO custom victory theme is breaking the popover

const Home = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="container">
      <div className="logo">
        <Image height={52} width={104} src={profilePic} alt="Stx stats logo" />
      </div>

      <h1 className="title">Get the latest data from Stacks 2.0</h1>
      <p className="subtitle">
        A project made by{" "}
        <a href="https://www.sigle.io/" target="_blank">
          Sigle
        </a>
      </p>

      <div className="container-grid">
        <div>
          <Menu />
        </div>
        <div className="chart">
          <NbTxsPerDay />
          <UniqueAddressGrowingPerDay />
        </div>
      </div>
    </div>
  );
};

export default Home;
