import { useEffect, useState } from "react";
import { NbTxsPerDay } from "../components/NbTxsPerDay";

const Home = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div style={{ margin: "auto", maxWidth: 600, marginTop: 80 }}>
      <NbTxsPerDay />
    </div>
  );
};

export default Home;
