import { useEffect } from "react";
import Head from "next/head";
import Router from "next/router";
import { NextSeo } from "next-seo";
import * as Fathom from "fathom-client";
import "../styles/reset.css";
import "../styles/style.scss";

// Record a pageview when route changes
Router.events.on("routeChangeComplete", () => {
  Fathom.trackPageview();
});

const title = "Stx stats";
const description = "Get the latest data from Stacks 2.0.";

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
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          type: "website",
          url: "https://www.stxstats.co",
          title: title,
          description: description,
          locale: "en_EN",
          images: [
            {
              url: "/images/twitter_share.png",
              width: 1012,
              height: 506,
              alt: `Hero image`,
            },
          ],
          site_name: "stxstats.co",
        }}
        twitter={{
          handle: "@sigleapp",
          site: "www.sigle.io",
          cardType: "summary_large_image",
        }}
      />
      <Component {...pageProps} />
    </>
  );
}
