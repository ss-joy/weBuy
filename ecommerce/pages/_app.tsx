import "@/styles/globals.css";
import MainLayout from "@/components/layouts/MainLayout";
import MainHeader from "@/components/ui/MainHeader";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";

import type { AppProps } from "next/app";
import CartContextProvider from "@/contexts/cart-context";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps): JSX.Element {
  return (
    <SessionProvider session={session}>
      <CartContextProvider>
        <MainLayout>
          <Head>
            <title>weBuy</title>
          </Head>
          <MainHeader />
          <Component {...pageProps} />
        </MainLayout>
      </CartContextProvider>
    </SessionProvider>
  );
}
