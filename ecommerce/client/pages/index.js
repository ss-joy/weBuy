// import Image from 'next/image'
// import { Inter } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })
import MainHeader from "@/components/ui/MainHeader";
import WelcomePage from "@/components/home/WelcomePage";
export default function Home() {
  return (
    <>
      <MainHeader />
      <WelcomePage />
    </>
  );
}
