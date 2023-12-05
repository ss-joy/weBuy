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

const ubuntuFont = Ubuntu({
  weight: "400",
  style: "normal",
  subsets: ["latin", "cyrillic", "greek"],
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps): JSX.Element {
  return (
    <SessionProvider session={session}>
      <ResponsivePanelContextProvider>
        <CartContextProvider>
          <MainLayout>
            <Head>
              <title>weBuy</title>
              <link
                rel="apple-touch-icon"
                sizes="180x180"
                href="/favicons/apple-touch-icon.png"
              />
              <link
                rel="icon"
                type="image/png"
                sizes="32x32"
                href="/favicons/favicon-32x32.png"
              />
              <link
                rel="icon"
                type="image/png"
                sizes="16x16"
                href="/favicons/favicon-16x16.png"
              />
              <link rel="manifest" href="/favicons/site.webmanifest" />
              <link
                rel="mask-icon"
                href="/favicons/safari-pinned-tab.svg"
                color="#5bbad5"
              />
              <meta name="msapplication-TileColor" content="#da532c" />
              <meta name="theme-color" content="#ffffff"></meta>
            </Head>
            <MainHeader />
            <main className={ubuntuFont.className + " relative"}>
              <SlidePanel />
              <Component {...pageProps} />
            </main>
          </MainLayout>
        </CartContextProvider>
      </ResponsivePanelContextProvider>
    </SessionProvider>
  );
}
