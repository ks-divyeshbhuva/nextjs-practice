import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Dancing_Script } from "next/font/google";

const dancingScript = Dancing_Script({ subsets: ["latin"], weight: ["700"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={dancingScript.className}>
      <Component {...pageProps} />
    </div>
  );
}
