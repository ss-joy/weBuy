import { CategoriesType } from "@/components/products/ProductsCategory";
import { createContext, useState } from "react";
type ProductCategoryContextType = {
  productCategory: "";
  updateCategory: (x: CategoriesType) => void;
};
type ProductCategoryContextProviderProps = {
  children: React.ReactNode;
};
export const productCategoryContext = createContext<ProductCategoryContextType>(
  {
    productCategory: "",
    updateCategory: (x: CategoriesType) => {},
  }
);

export default function ProductCategoryContextProvider({
  children,
}: ProductCategoryContextProviderProps) {
  const [productCategory, setProductCategory] = useState<CategoriesType>("");
  console.log("context category", productCategory);
  function updateCategory(cat: CategoriesType) {
    setProductCategory((prev) => {
      if (cat === prev) {
        return "";
      } else if (prev === "") {
        return cat;
      } else if (prev != cat) {
        return cat;
      } else return "";
    });
  }
  return (
    <productCategoryContext.Provider
      value={{
        //@ts-ignore
        productCategory,
        updateCategory,
      }}
    >
      {children}
    </productCategoryContext.Provider>
  );
}
