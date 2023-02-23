import "../global.css";
import { SWRConfig } from "swr";
import type { AppProps } from "next/app";
import useUser from "@/libs/client/useUser";
import Header from "@/components/header";

export default function App({ Component, pageProps }: AppProps) {
  const { user } = useUser();
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) =>
          fetch(url).then((response) => response.json()),
      }}
    >
      <div className="h-screen w-full bg-slate-800 py-4">
        <div className="mx-auto w-full max-w-4xl">
          <Header user={user} />
          <Component {...pageProps} />
        </div>
      </div>
    </SWRConfig>
  );
}
