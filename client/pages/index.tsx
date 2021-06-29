import { useEffect, useState } from "react";
import Image from "next/image";
import stxStatsLogo from "../public/images/stx_stats_logo.svg";
import sigleLogo from "../public/images/sigle_logo.svg";
import twitterLogo from "../public/images/twitter.svg";
import discordLogo from "../public/images/discord.svg";
import githubLogo from "../public/images/github.svg";
import { NbTxsPerDay } from "../components/NbTxsPerDay";
import { UniqueAddressGrowingPerDay } from "../components/UniqueAddressGrowingPerDay";
import { Menu } from "../components/Menu";

// TODO add fathom
// TODO custom victory theme is breaking the popover
// TODO SEO twitter tags
// TODO improve README

const Home = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <div className="container">
        <div className="logo">
          <Image
            height={52}
            width={104}
            src={stxStatsLogo}
            alt="Stx stats logo"
          />
        </div>

        <h1 className="title">Get the latest data from Stacks 2.0</h1>
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
            <NbTxsPerDay />
            <UniqueAddressGrowingPerDay />
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
                <Image
                  height={48}
                  width={108}
                  src={sigleLogo}
                  alt="Sigle logo"
                />
              </a>
            </div>
            <div>
              <a
                className="social-icon"
                href="https://twitter.com/sigleapp"
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  height={16}
                  width={16}
                  src={twitterLogo}
                  alt="Twitter logo"
                />
              </a>
              <a
                className="social-icon"
                href="https://discord.gg/X2Dbz3xbrs"
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  height={16}
                  width={16}
                  src={discordLogo}
                  alt="Discord logo"
                />
              </a>
              <a
                className="social-icon"
                href="https://github.com/sigle/stxstats"
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  height={16}
                  width={16}
                  src={githubLogo}
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

export default Home;
