import "@/styles/globals.css";
import MainLayout from "@/components/layouts/MainLayout";
import MainHeader from "@/components/ui/MainHeader";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import type { AppProps } from "next/app";
import CartContextProvider from "@/contexts/cart-context";
import { Ubuntu } from "next/font/google";
import SlidePanel from "@/components/ui/animations/SlidePanel";
import ResponsivePanelContextProvider from "@/contexts/responsive-panel";
import MetaData from "@/components/ui/MetaData";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const ubuntuFont = Ubuntu({
  weight: "400",
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
      <QueryClientProvider client={queryClient}>
        <ResponsivePanelContextProvider>
          <CartContextProvider>
            <MainLayout>
              <Head>
                <MetaData />
              </Head>
              <MainHeader />
              <main className={ubuntuFont.className}>
                <SlidePanel />
                <Component {...pageProps} />
              </main>
            </MainLayout>
          </CartContextProvider>
        </ResponsivePanelContextProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
