import "@/styles/globals.css";
import MainLayout from "@/components/layouts/MainLayout";
import MainHeader from "@/components/ui/MainHeader";
import { Provider } from "next-auth/client";
import { CartContextProvider } from "@/contexts/cart-context";

export default function App({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <CartContextProvider>
        <MainLayout>
          <MainHeader />
          <Component {...pageProps} />
        </MainLayout>
      </CartContextProvider>
    </Provider>
  );
}
