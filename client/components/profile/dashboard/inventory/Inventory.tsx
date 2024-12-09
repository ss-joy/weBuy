import { ecomBackendUrl } from "@/config";
import { Product } from "@/types/products-type";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import AddProduct from "./AddProduct";
import Loading from "@/components/ui/Loading";
import ProductsInventory from "./ProductsInventory";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type InventoryProps = {
  userId: string | undefined;
};

const Inventory = ({ userId }: InventoryProps) => {
  return (
    <div>
      <Tabs defaultValue="addProduct" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="addProduct">Add New Product</TabsTrigger>
          <TabsTrigger value="inventory">Product Inventory</TabsTrigger>
        </TabsList>
        <TabsContent value="addProduct">
          <AddProduct userId={userId as string} />
        </TabsContent>
        <TabsContent value="inventory">
          <ProductsInventory userId={userId as string} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Inventory;
