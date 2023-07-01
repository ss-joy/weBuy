import "@/styles/globals.css";
import MainLayout from "@/components/layouts/MainLayout";
import MainHeader from "@/components/ui/MainHeader";
import { Provider } from "next-auth/client";

export default function App({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <MainLayout>
        <MainHeader />
        <Component {...pageProps} />;
      </MainLayout>
    </Provider>
  );
}
