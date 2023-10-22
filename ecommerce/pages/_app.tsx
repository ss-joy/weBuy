import "@/styles/globals.css";
import MainLayout from "@/components/layouts/MainLayout";
import MainHeader from "@/components/ui/MainHeader";
import { SessionProvider } from "next-auth/react";

import { CartContextProvider } from "@/contexts/cart-context";
import Head from "next/head";
import { BankContextProvider } from "@/contexts/bank-context";
import type { AppProps } from "next/app";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps): JSX.Element {
  return (
    <SessionProvider session={session}>
      <BankContextProvider>
        <CartContextProvider>
          <MainLayout>
            <Head>
              <title>weBuy</title>
            </Head>
            <MainHeader />
            <Component {...pageProps} />
          </MainLayout>
        </CartContextProvider>
      </BankContextProvider>
    </SessionProvider>
  );
}
