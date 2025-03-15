import React, { Fragment } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";

import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import ProductCard from "./ProductCard";
import {
  decreaseCartItemQuantity,
  deleteProductFromCart,
  increaseCartItemQuantity,
} from "@/store/features/cart/cartSlice";
type Product = {
  productId: string;
  productQuantity: number;
  productPrice: number;
  productSellerId: string;
};

type CartDetailsTableProps = {
  products: Product[];
};

function CartDetailsTable({ products }: CartDetailsTableProps): JSX.Element {
  function calulcateTotalPrice(products: Product[]): number {
    const totalPrice = products.reduce((prev, curr) => {
      return prev + curr.productQuantity * curr.productPrice;
    }, 0);
    return totalPrice;
  }

  const { cartItems } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  function handlePlusIconClick(
    productId: string,
    productPrice: number,
    productSellerId: string
  ) {
    dispatch(
      increaseCartItemQuantity({ productId, productPrice, productSellerId })
    );
  }
  function handleMinusIconClick(productId: string) {
    dispatch(decreaseCartItemQuantity({ productId }));
  }
  function handleDeleteIconClick(productId: string) {
    dispatch(deleteProductFromCart({ productId }));
  }

  return (
    <div>
      <Table className="border shadow-md rounded-md select-none">
        <TableCaption>Your Cart</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Product</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="text-right">Total selected</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cartItems.map((ci) => (
            <Fragment key={ci.productId}>
              <TableRow>
                <TableCell className="border">
                  <ProductCard productId={ci.productId} />
                </TableCell>
                <TableCell className="text-center">
                  {ci.productPrice}$ per unit
                </TableCell>
                <TableCell className="text-center">
                  {ci.productQuantity} units
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <PlusIcon
                    className="mx-auto stroke-green-500 hover:cursor-pointer"
                    onClick={() =>
                      handlePlusIconClick(
                        ci.productId,
                        ci.productPrice,
                        ci.productSellerId
                      )
                    }
                  />
                </TableCell>
                <TableCell>
                  <MinusIcon
                    className="mx-auto stroke-orange-500 hover:cursor-pointer"
                    onClick={() => handleMinusIconClick(ci.productId)}
                  />
                </TableCell>
                <TableCell className="border">
                  <TrashIcon
                    className="mx-auto stroke-red-500 hover:cursor-pointer"
                    onClick={() => handleDeleteIconClick(ci.productId)}
                  />
                </TableCell>
              </TableRow>
            </Fragment>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell className="text-right">
              ${calulcateTotalPrice(cartItems)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}

export default CartDetailsTable;
