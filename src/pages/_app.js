import Head from 'next/head';
import '../styles/reset.css';
import '../styles/globals.css';
import PrimaryNav from '../components/PrimaryNav';

/**
 *
 * @param {compoonent} Component NextJS component
 * @param {pageProps} pageProps NextJS pageProps
 * @returns {function} JSX Function
 */
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Clipboard</title>
        <link rel="shortcut icon" href="/Favicon.svg" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <PrimaryNav />
      <main className="bg-yellow-200 min-h-screen h-auto w-screen/10 p-4 pb-32 flex justify-center">
        <div className="max-w-3xl w-96 mx-auto">
          <Component {...pageProps} />
        </div>
      </main>
    </>
  );
}

export default MyApp;
