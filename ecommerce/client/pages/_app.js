import "@/styles/globals.css";
import MainLayout from "@/components/layouts/MainLayout";
import MainHeader from "@/components/ui/MainHeader";
import { Provider } from "next-auth/client";
import DummyContext from "@/contexts/dummy-context";
import { Sei } from "@/contexts/dummy-context";
export default function App({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Sei>
        <MainLayout>
          <MainHeader />
          <Component {...pageProps} />
        </MainLayout>
      </Sei>
    </Provider>
  );
}
