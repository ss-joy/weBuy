import "@/styles/globals.css";
import MainLayout from "@/components/layouts/MainLayout";
import MainHeader from "@/components/ui/MainHeader";
import { Provider } from "next-auth/client";
import { CartContextProvider } from "@/contexts/cart-context";
import Head from "next/head";
import { BankContextProvider } from "@/contexts/bank-context";

export default function App({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
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
    </Provider>
  );
}
