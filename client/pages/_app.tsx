import "@/styles/globals.css";
import MainLayout from "@/components/layouts/MainLayout";
import MainHeader from "@/components/ui/MainHeader";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import MetaData from "@/components/ui/MetaData";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import store from "@/store/store";

const interFont = Inter({
  weight: ["400", "500", "600", "700", "800", "900"],
  style: "normal",
  subsets: ["latin", "cyrillic", "greek"],
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
          <MainLayout>
            <Head>
              <MetaData />
            </Head>
            <MainHeader />
            <main className={interFont.className}>
              <Component {...pageProps} />
            </main>
          </MainLayout>
        </QueryClientProvider>
      </Provider>
    </SessionProvider>
  );
}
