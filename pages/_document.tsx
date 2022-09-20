import Document, { Html, Head, Main, NextScript } from 'next/document';
class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Cairo:wght@600&display=swap"
            rel="stylesheet">
          </link>
          {/* Google Tag Manager (noscript) */}
          <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MQ9LW45"
            height="0" width="0" style={{ display: "none", visibility: "hidden" }}></iframe></noscript>
          {/* End Google Tag Manager (noscript) */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument