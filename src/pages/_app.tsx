import Head from 'next/head';
import { AppProps } from 'next/app';
import { Provider } from 'next-auth/client';
import '../styles/reset.css';
import '../styles/globals.css';
import PrimaryNav from '../components/PrimaryNav';

/**
 * Global wrapper component that holds meta value, shared layout styles, shared components (e.g. primary nav). Each page component is wrapped with this component, via the Component + pageProps NextJS functionality.
 * @param {Component} Component NextJS component
 * @param {pageProps} pageProps NextJS pageProps
 * @returns {function} JSX Function
 */
function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps): JSX.Element {
  return (
    <Provider session={session}>
      <Head>
        <title>Clipboard</title>
        <link rel="shortcut icon" href="/Favicon.svg" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main className="bg-gray-900 min-h-screen h-auto w-screen/10 p-4 pb-48 flex justify-center flex-col leading-loose text-gray-500">
        {/* {session ? (
          <PrimaryNav />
        ) : (
          <div className="bg-gray-900 text-gray-200 place-content-center">
            <a
              className="max-w-3xl w-96 mx-auto flex content-center justify-center"
              href="/api/auth/signin"
              onClick={(e) => {
                e.preventDefault();
                signIn();
              }}
            >
              <HiUser size="24" />
              Log in
            </a>
          </div>
        )} */}
        <div className="max-w-3xl w-96 mx-auto">
          <Component {...pageProps} />
          <PrimaryNav />
        </div>
      </main>
    </Provider>
  );
}

export default MyApp;
