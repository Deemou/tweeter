import "../global.css";
import { SWRConfig } from "swr";
import type { AppProps } from "next/app";
import useUser from "@/libs/client/useUser";
import Header from "@/components/header";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) =>
          fetch(url).then((response) => response.json()),
      }}
    >
      <div className="min-h-screen w-full bg-black py-4">
        <div className="mx-auto  w-full max-w-xl">
          <Component {...pageProps} />
        </div>
      </div>
    </SWRConfig>
  );
}
