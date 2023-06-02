import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Dancing_Script } from "next/font/google";
import Head from "next/head";
import { Router } from "next/router";
import { useEffect, useState } from "react";

const dancingScript = Dancing_Script({ subsets: ["latin"], weight: ["700"] });

export default function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const start = () => setLoading(true);
    const end = () => {
      setLoading(false);
    };

    const lodingStart = Router.events.on("routeChangeStart", start);
    const loadingEnd = Router.events.on("routeChangeComplete", end);
    const loadingEndOnErr = Router.events.on("routeChangeError", end);
    return () => {
      lodingStart;
      loadingEnd;
      loadingEndOnErr;
    };
  }, []);

  return (
    <>
      <Head>
        <title>My Next App</title>
        <meta
          name="description"
          key="description"
          content="News App in NextJS"
        />
      </Head>
      <div className={dancingScript.className}>
        {loading ? "Loading..." : <Component {...pageProps} />}
      </div>
    </>
  );
}
