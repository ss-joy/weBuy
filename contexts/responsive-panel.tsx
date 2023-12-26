import { Dispatch, SetStateAction, createContext, useState } from "react";
type ResponsivePanelContext = {
  startAnimation: boolean;
  addAnimation: () => void;
};
type PropType = {
  children: React.ReactNode;
};
export const responsivePanelContext =
  createContext<null | ResponsivePanelContext>(null);
export default function ResponsivePanelContextProvider({
  children,
}: PropType): JSX.Element {
  const [startAnimation, setStartAnimation] = useState<boolean>(false);
  function addAnimation() {
    setStartAnimation((prev) => {
      return !prev;
    });
  }
  return (
    <responsivePanelContext.Provider
      value={{
        startAnimation,
        addAnimation,
      }}
    >
      {children}
    </responsivePanelContext.Provider>
  );
}
