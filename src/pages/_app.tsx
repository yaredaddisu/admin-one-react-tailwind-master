import { useEffect } from 'react';
import { useRouter } from 'next/router';
import React from 'react';
import Script from 'next/script';
import type { AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { store } from '../stores/store';
import '../css/main.css';

export type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();

  useEffect(() => {
    // Check if the user is logged in
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    // If a user tries to access the login page and they are already logged in, redirect them to the dashboard
    if (router.pathname === '/login' && token) {
      router.push('/dashboard');
    }

    // If the user is not logged in and they try to access a protected page, redirect them to the login page
    if (!token && router.pathname !== '/login') {
      router.push('/login');
    }
  }, [router.pathname]);

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);

  const title = `Admin One React Tailwind free`;
  const description = 'Admin One - free React Next Tailwind dashboard with TypeScript and dark mode';
  const url = 'https://justboil.github.io/admin-one-react-tailwind/';
  const image = `https://static.justboil.me/templates/one/repo-tailwind-react.png`;
  const imageWidth = '1920';
  const imageHeight = '960';

  return (
    <Provider store={store}>
      {getLayout(
        <>
          <Head>
            <meta name="description" content={description} />
            <meta property="og:url" content={url} />
            <meta property="og:site_name" content="JustBoil.me" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:image:type" content="image/png" />
            <meta property="og:image:width" content={imageWidth} />
            <meta property="og:image:height" content={imageHeight} />
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image:src" content={image} />
            <meta property="twitter:image:width" content={imageWidth} />
            <meta property="twitter:image:height" content={imageHeight} />
            <link rel="icon" href="/admin-one-react-tailwind/favicon.png" />
          </Head>

          <Script src="https://www.googletagmanager.com/gtag/js?id=UA-130795909-1" strategy="afterInteractive" />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'UA-130795909-1');
            `}
          </Script>

          <Component {...pageProps} />
        </>
      )}
    </Provider>
  );
}

export default MyApp;
