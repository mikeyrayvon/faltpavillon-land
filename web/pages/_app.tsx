import { useEffect } from "react";
import { useRouter } from "next/router";
import "styles/globals.css";
import * as gtag from "utils/gtag";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ConfigContext } from "utils/context";

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router]);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>
      <ConfigContext.Provider
        value={{
          ...pageProps.config,
        }}
      >
        <Component {...pageProps} />
      </ConfigContext.Provider>
    </>
  );
};

export default App;
