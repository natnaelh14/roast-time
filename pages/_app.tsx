import '../styles/globals.css'
import type { AppProps } from 'next/app';
import Layout from 'components/Layout/Layout';
import Script from 'next/script';
import TagManager from 'react-gtm-module';
import { SWRConfig } from "swr";
import fetchJson from 'utils/fetchJson';
import { UserSessionContextProvider } from 'contexts/UserSessionContext';
import { ColorSchemeContextProvider } from 'contexts/ColorSchemeContext';

function MyApp({ Component, pageProps }: AppProps) {
  // eslint-disable-next-line
  if (process.browser) {
    TagManager.initialize({
      gtmId: "GTM-MQ9LW45",
    });
  }

  return (
    <div className='m-6'>
      <UserSessionContextProvider>
        <ColorSchemeContextProvider>
          <SWRConfig
            value={{
              fetcher: fetchJson,
              onError: (err) => {
                console.error(err);
              },
            }}
          >
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </SWRConfig>
        </ColorSchemeContextProvider>
      </UserSessionContextProvider>
      {/* Google Tag Manager */}
      <Script
        strategy="afterInteractive"
        id='google-tag-manager'>
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-MQ9LW45');`}
      </Script>
      <Script src="../path/to/flowbite/dist/flowbite.js"></Script>
      {/* Flowbite Datepicker */}
      <Script src="https://unpkg.com/flowbite@1.5.3/dist/datepicker.js"></Script>
    </div>
  )
}

export default MyApp
