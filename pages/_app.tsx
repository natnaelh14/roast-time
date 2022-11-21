import '../styles/globals.css';
import Layout from 'components/Layout/Layout';
import fetchJson from 'utils/fetchJson';
import { UserSessionContextProvider } from 'contexts/UserSessionContext';
import { ColorSchemeContextProvider } from 'contexts/ColorSchemeContext';
import Script from 'next/script';
import TagManager from 'react-gtm-module';
import { SWRConfig } from 'swr';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  if (process.browser) {
    TagManager.initialize({
      gtmId: 'GTM-MQ9LW45',
    });
  }

  return (
    <div className="m-6">
      <UserSessionContextProvider>
        <ColorSchemeContextProvider>
          <SWRConfig
            value={{
              refreshInterval: 30000,
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
      <Script strategy="afterInteractive" id="google-tag-manager">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-MQ9LW45');`}
      </Script>
      <Script src="https://unpkg.com/flowbite@1.5.3/dist/flowbite.js"></Script>
      {/* Flowbite Datepicker */}
      <Script src="https://unpkg.com/flowbite@1.5.3/dist/datepicker.js"></Script>
      <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCWVX5Acjm18xS-MfYc-ZgCTojbVUP6vhc&libraries=places"></script>
    </div>
  );
}

export default MyApp;
