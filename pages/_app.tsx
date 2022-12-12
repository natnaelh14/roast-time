import '../styles/globals.css';
import Layout from 'components/Layout/Layout';
import fetchJson from 'utils/fetchJson';
import { UserSessionContextProvider } from 'contexts/UserSessionContext';
import { ColorSchemeContextProvider } from 'contexts/ColorSchemeContext';
import Script from 'next/script';
import TagManager from 'react-gtm-module';
import { SWRConfig } from 'swr';
import { Analytics } from '@vercel/analytics/react';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  if (process.browser) {
    TagManager.initialize({
      gtmId: 'GTM-MQ9LW45',
    });
  }

  return (
    <div className="m-6">
      <SWRConfig
        value={{
          refreshInterval: 30000,
          fetcher: fetchJson,
          onError: (err) => {
            console.error(err);
          },
        }}>
        <UserSessionContextProvider>
          <ColorSchemeContextProvider>
            <Layout>
              <Component {...pageProps} />
              <Analytics />
            </Layout>
          </ColorSchemeContextProvider>
        </UserSessionContextProvider>
      </SWRConfig>
      {/* Google Tag Manager */}
      <Script strategy="afterInteractive" id="google-tag-manager">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-MQ9LW45');`}
      </Script>
      {/* Google Maps API */}
      <script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOLE_MAPS_API_KEY}&libraries=places`}></script>
    </div>
  );
}

export default MyApp;
