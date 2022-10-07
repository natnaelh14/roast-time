import '../styles/globals.css'
import { useState, useEffect } from "react";
import type { AppProps } from 'next/app';
import Layout from 'components/Layout/Layout';
import Script from 'next/script';
import TagManager from 'react-gtm-module';
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from "@mantine/core";
import theme from 'theme';
import { setLocalStorage, getLocalStorage } from 'utils/storage';
import { SessionProvider } from 'next-auth/react';


function MyApp({ Component, pageProps }: AppProps) {
  // eslint-disable-next-line
  if (process.browser) {
    TagManager.initialize({
      gtmId: "GTM-MQ9LW45",
    });
  }

  const [colorScheme, setColorScheme] = useState<ColorScheme>(() => getLocalStorage("color-theme"));
  const toggleColorScheme = (value?: ColorScheme) => {
    if (colorScheme === "dark") {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
    setColorScheme(colorScheme === "dark" ? "light" : "dark");
    setLocalStorage("color-theme", colorScheme)
  }

  useEffect(() => {
    if (!colorScheme) {
      setLocalStorage("color-theme", "dark")
      setColorScheme("dark")
    }
    // else {
    //   if (colorScheme === "dark") {
    //     document.documentElement.classList.remove('dark');
    //   } else {
    //     document.documentElement.classList.add('dark');
    //   }
    // }
  }, [colorScheme])
  // if (colorScheme === "dark") {
  //   window.document.documentElement.classList.remove('dark');
  // } else {
  //   window.document.documentElement.classList.add('dark');
  // }

  return (
    <div className='m-6'>
      <SessionProvider session={pageProps.session}>
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          <MantineProvider theme={theme}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </MantineProvider>
        </ColorSchemeProvider>
      </SessionProvider>
      {/* <Script
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
      /> */}
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
