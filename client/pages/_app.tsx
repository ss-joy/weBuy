import "@/styles/globals.css";
import MainLayout from "@/components/layouts/MainLayout";
import MainHeader from "@/components/ui/MainHeader";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import type { AppProps } from "next/app";
import { Inter, Roboto } from "next/font/google";
import MetaData from "@/components/ui/MetaData";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import store from "@/store/store";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const robotoFont = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  style: "normal",
  subsets: ["latin"],
});

const queryClient = new QueryClient();

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps): JSX.Element {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools />
          <MainLayout>
            <Head>
              <MetaData />
            </Head>
            <MainHeader />
            <main className={`${robotoFont.className} pt-[110px]`}>
              <Component {...pageProps} />
            </main>
          </MainLayout>
        </QueryClientProvider>
      </Provider>
    </SessionProvider>
  );
}
