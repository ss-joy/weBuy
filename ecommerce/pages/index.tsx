import { useContext } from "react";
import DummyContext from "@/contexts/cart-context";

import WelcomePage from "@/components/home/WelcomePage";
export default function Home(): JSX.Element {
  const { decrement, state, increment } = useContext(DummyContext);
  return (
    <>
      <WelcomePage />
    </>
  );
}
