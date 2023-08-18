// import { Inter } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })
import { useContext } from "react";
import DummyContext from "@/contexts/cart-context";

import WelcomePage from "@/components/home/WelcomePage";
export default function Home() {
  const { decrement, state, increment } = useContext(DummyContext);
  return (
    <>
      <WelcomePage />
    </>
  );
}
