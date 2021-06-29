import { useEffect } from "react";
import Head from "next/head";
import Router from "next/router";
import * as Fathom from "fathom-client";
import "../styles/reset.css";
import "../styles/style.scss";

// Record a pageview when route changes
Router.events.on("routeChangeComplete", () => {
  Fathom.trackPageview();
});

export default function MyApp({ Component, pageProps }: any) {
  // Initialize Fathom when the app loads
  useEffect(() => {
    Fathom.load("AYXWIYLJ", {
      includedDomains: ["stxstats.co"],
    });
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
