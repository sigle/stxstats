import { NbTxsPerDay } from "../components/NbTxsPerDay";
import { UniqueAddressGrowingPerDay } from "../components/UniqueAddressGrowingPerDay";
import { Menu } from "../components/Menu";

const Home = ({ statsData }: any) => {
  return (
    <>
      <div className="container">
        <div className="logo">
          <img
            height={52}
            width={104}
            src={"/images/stx_stats_logo.svg"}
            alt="Stx stats logo"
          />
        </div>

        <h1 className="title">
          Get the latest data from Stacks 2.0 blockchain
        </h1>
        <p className="subtitle">
          A project made by{" "}
          <a href="https://www.sigle.io/" target="_blank" rel="noreferrer">
            Sigle
          </a>
        </p>

        <div className="container-grid">
          <div>
            <Menu />
          </div>
          <div className="chart">
            <div style={{ position: "relative", height: 500 }}>
              <div
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  left: 0,
                  top: 0,
                }}
              >
                <NbTxsPerDay statsData={statsData.nbTxsPerDay} />
              </div>
            </div>

            <UniqueAddressGrowingPerDay
              statsData={statsData.uniqueAddressGrowingPerDay}
            />
          </div>
        </div>
      </div>

      <div className="footer">
        <div className="container">
          <div className="padding">
            <div className="credit">
              <p className="made-by">
                A project made with{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="heart"
                  viewBox="0 0 20 20"
                  fill="#CF0000"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>{" "}
                by
              </p>
              <a href="https://www.sigle.io/" target="_blank" rel="noreferrer">
                <img
                  height={48}
                  width={108}
                  src={"/images/sigle_logo.svg"}
                  alt="Sigle logo"
                />
              </a>
              <p className="support">
                If you like it consider giving us a{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="hsl(50 100% 48.5%)"
                  className="star"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>{" "}
                on{" "}
                <a
                  href="https://github.com/sigle/stxstats"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
              </p>
            </div>
            <div>
              <a
                className="donation"
                href="https://explorer.stacks.co/address/SP6FRH7STC0G94N3PQ9BAGWF3W61R5BCEEEZB11A?chain=mainnet"
                target="_blank"
                rel="noreferrer"
              >
                Donate
              </a>
              <a
                className="social-icon"
                href="https://twitter.com/sigleapp"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  height={16}
                  width={16}
                  src={"/images/twitter.svg"}
                  alt="Twitter logo"
                />
              </a>
              <a
                className="social-icon"
                href="https://discord.gg/X2Dbz3xbrs"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  height={16}
                  width={16}
                  src={"/images/discord.svg"}
                  alt="Discord logo"
                />
              </a>
              <a
                className="social-icon"
                href="https://github.com/sigle/stxstats"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  height={16}
                  width={16}
                  src={"/images/github.svg"}
                  alt="Github logo"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export async function getStaticProps() {
  const res = await fetch(process.env.API_URL!);
  const statsData = await res.json();

  return {
    props: {
      statsData,
    },
  };
}

export default Home;
