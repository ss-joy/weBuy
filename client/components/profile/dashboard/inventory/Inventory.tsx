import { ecomBackendUrl } from "@/config";
import { Product } from "@/types/products-type";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import AddProduct from "./AddProduct";
import Loading from "@/components/ui/Loading";
import ProductsInventory from "./ProductsInventory";

type InventoryProps = {
  userId: string | undefined;
};

const Inventory = ({ userId }: InventoryProps) => {
  return (
    <div>
      <AddProduct userId={userId as string} />
      <ProductsInventory userId={userId as string} />
    </div>
  );
};

export default Inventory;
