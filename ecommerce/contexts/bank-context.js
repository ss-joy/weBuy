import { createContext, useState } from "react";

const BankContext = createContext({
  increment: () => {},
  decrement: () => {},
  state: [],
});
export default BankContext;
export function BankContextProvider({ children }) {
  const [connectedToBank, setConnectedToBank] = useState(false);
  const [bankDetails, setBankDetails] = useState({
    name: "",
    email: "",
    amount: "",
  });

  function connectToBannk(id) {
    setConnectedToBank(updateState);
  }
  return (
    <BankContext.Provider
      value={{
        connectToBannk,
        connectedToBank,
        setConnectedToBank,
        bankDetails,
        setBankDetails,
      }}
    >
      {children}
    </BankContext.Provider>
  );
}
