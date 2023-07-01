/***
 *
 *
 * MUST FIX WHY THIS COMPONENT WONT WORK
 */

import { createContext, useReducer, useState } from "react";

const CartContext = createContext({
  increment: () => {},
  decrement: () => {},
  state: [],
});
export default CartContext;
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

export function CartContextProvider({ children }) {
  const [state, setState] = useState(initialState);
  function increment(id) {
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
    <CartContext.Provider
      value={{
        increment,
        decrement,
        state,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
