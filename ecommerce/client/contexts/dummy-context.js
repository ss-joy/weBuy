import { createContext, useReducer, useState } from "react";

const DummyContext = createContext({
  increment: () => {},
  decrement: () => {},
  state: [],
});
export default DummyContext;
const initialState = [
  {
    id: "649ec34f265db8f1465837a2",
    quantity: 0,
  },
  {
    id: "649ec5a4265db8f1465837a3",
    quantity: 0,
  },
  {
    id: "649ec6d4265db8f1465837a4",
    quantity: 0,
  },
];
export function Sei({ children }) {
  const [state, setState] = useState(initialState);
  function increment(id) {
    console.log("inc");
    const updateState = state.map((e) => {
      if (id === e.id) {
        return {
          ...e,
          quantity: e.quantity + 1,
        };
      }

      return {
        ...e,
      };
    });
    setState(updateState);
  }
  function decrement(id) {
    const updateState = state.map((e) => {
      if (id === e.id) {
        return {
          ...e,
          quantity: e.quantity - 1,
        };
      }

      return {
        ...e,
      };
    });
    setState(updateState);
  }
  return (
    <DummyContext.Provider
      value={{
        increment,
        decrement,
        state,
      }}
    >
      {children}
    </DummyContext.Provider>
  );
}
