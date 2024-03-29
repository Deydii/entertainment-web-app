import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Outfit } from 'next/font/google';
import type { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';
import { DataContextProvider } from '../context/dataContext';
import { UserContextProvider } from '../context/userContext';
import '../styles/globals.css';
import 'react-tooltip/dist/react-tooltip.css';

const outfit = Outfit({
  weight: ["300", "500"],
  subsets: ['latin']
});

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const App = ({ Component, pageProps }: AppPropsWithLayout) => {

  const getLayout = Component.getLayout || ((page: ReactElement) => page);

  return (
    <>
      <Head>
        <title>Entertainment web app</title>
        <meta
          name="description"
          content="Entertainment web app"
        />
        <link rel="icon" href="/favicon-32x32.png" />
      </Head>
      <>
        <style jsx global>{`
            html {
              font-family: ${outfit.style.fontFamily};
            }
          `}
        </style>
      </>
      <UserContextProvider>
        <DataContextProvider>
          {getLayout(<Component {...pageProps} />)}
        </DataContextProvider>
      </UserContextProvider>
    </>
  )
}

export default App;