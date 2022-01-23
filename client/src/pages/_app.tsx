import { useEffect } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { NextSeo } from 'next-seo';
import { ThemeProvider } from 'next-themes';
import * as Fathom from 'fathom-client';
import '../styles/fonts.scss';
import '../styles/tailwind.css';
import { globalCss, darkTheme } from '../stitches.config';

const globalStyles = globalCss({
  body: {
    backgroundColor: '$gray1',
    color: '$gray10',
    fontFamily: '$lato !important',
  },
});

// Record a pageview when route changes
Router.events.on('routeChangeComplete', () => {
  Fathom.trackPageview();
});

const title = 'STX Stats';
const description =
  'Get the latest on-chain stats for the Stacks (STX) blockchain. Transactions count, unique addresses count, transactions fees...';

export default function MyApp({ Component, pageProps }: any) {
  globalStyles();

  // Initialize Fathom when the app loads
  useEffect(() => {
    Fathom.load('AYXWIYLJ', {
      includedDomains: ['www.stxstats.co'],
      url: 'https://louse.sigle.io/script.js',
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
          type: 'website',
          url: 'https://www.stxstats.co',
          title: title,
          description: description,
          locale: 'en_EN',
          images: [
            {
              url: 'https://www.stxstats.co/images/twitter_share.png',
              width: 1012,
              height: 506,
              alt: `Hero image`,
            },
          ],
          site_name: 'stxstats.co',
        }}
        twitter={{
          handle: '@sigleapp',
          site: 'www.sigle.io',
          cardType: 'summary_large_image',
        }}
      />
      <ThemeProvider
        disableTransitionOnChange
        attribute="class"
        value={{ light: 'light-theme', dark: darkTheme.toString() }}
        defaultTheme={darkTheme.toString()}
      >
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
