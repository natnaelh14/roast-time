import '../styles/globals.css'
import type { AppProps } from 'next/app';
import Layout from 'components/Layout/Layout';
import Script from 'next/script';
import TagManager from 'react-gtm-module';
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from "@mantine/core";
import { useLocalStorage } from '@mantine/hooks';
import { SWRConfig } from "swr";
import fetchJson from 'utils/fetchJson';
import { UserSessionContextProvider } from 'contexts/UserSessionContext';

function MyApp({ Component, pageProps }: AppProps) {
  // eslint-disable-next-line
  if (process.browser) {
    TagManager.initialize({
      gtmId: "GTM-MQ9LW45",
    });
  }

  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <div className='m-6'>
      <UserSessionContextProvider>
        <SWRConfig
          value={{
            fetcher: fetchJson,
            onError: (err) => {
              console.error(err);
            },
          }}
        >
          <ColorSchemeProvider
            colorScheme={colorScheme}
            toggleColorScheme={toggleColorScheme}
          >
            <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </MantineProvider>
          </ColorSchemeProvider>
        </SWRConfig>
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
      {/* End Google Tag Manager */}
      {/* Flowbite Datepicker */}
      <Script src="https://unpkg.com/flowbite@1.5.3/dist/datepicker.js"></Script>
    </div>
  )
}

export default MyApp
