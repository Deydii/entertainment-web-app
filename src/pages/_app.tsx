import { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/globals.css';

const App = ({ Component, pageProps }: AppProps) => {
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
      <Component {...pageProps} />
    </>
  )
}

export default App;