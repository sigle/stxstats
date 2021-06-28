import { useEffect, useState } from "react";
import { NbTxsPerDay } from "../components/NbTxsPerDay";
import { UniqueAddressGrowingPerDay } from "../components/UniqueAddressGrowingPerDay";

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
      <h1 className="title">STXSTATS</h1>

      <div className="container-grid">
        <div>
          <nav className="navigation">
            <ul>
              <li>
                <a href="#">Number of transactions</a>
              </li>
              <li>
                <a href="#">Unique addresses</a>
              </li>
            </ul>
          </nav>
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
