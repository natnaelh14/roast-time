import Document, { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';
class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Cairo:wght@600&display=swap"
            rel="stylesheet">
          </link>
          <Script
            strategy="afterInteractive"
            id='darkThemeToggle'
            dangerouslySetInnerHTML={{
              __html: `
              if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark')
            }
            `
            }}
          />
          {/* Google Tag Manager */}
          <Script
            strategy="afterInteractive"
            id='darkThemeToggle'
            dangerouslySetInnerHTML={{
              __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-MQ9LW45');
            `
            }}
          />
          {/* End Google Tag Manager */}
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