import "@/styles/globals.css";
import MainLayout from "@/components/layouts/MainLayout";
import MainHeader from "@/components/ui/MainHeader";
export default function App({ Component, pageProps }) {
  return (
    <MainLayout>
      <MainHeader />
      <Component {...pageProps} />;
    </MainLayout>
  );
}
