import Document, { Html, Head, Main, NextScript } from 'next/document';
import { getCssText } from '../stitches.config';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" type="image/png" href="/images/favicon.png" />
          <style
            id="stitches"
            dangerouslySetInnerHTML={{ __html: getCssText() }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
