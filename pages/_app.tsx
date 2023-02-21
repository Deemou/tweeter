import "../global.css";
import { SWRConfig } from "swr";
import type { AppProps } from "next/app";
import useUser from "@/libs/client/useUser";

function LoginCheck() {
  const { user } = useUser();
  return null;
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) =>
          fetch(url).then((response) => response.json()),
      }}
    >
      <div className="mx-auto w-full max-w-xl">
        <LoginCheck />
        <Component {...pageProps} />
      </div>
    </SWRConfig>
  );
}
