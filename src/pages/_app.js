import Head from 'next/head';
import '../styles/reset.css';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>Clipboard</title>
        <link rel="shortcut icon" href="/Favicon.svg" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="bg-yellow-200 h-screen p-4 max-w-4xl">
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
