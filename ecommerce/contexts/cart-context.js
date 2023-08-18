import { createContext, useState } from "react";

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
  function incrementProduct(id) {
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
  function decrementProduct(id) {
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
        incrementProduct,
        decrementProduct,
        state,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
