import Loading from "@/components/ui/Loading";
import { ecomBackendUrl } from "@/config";
import { UserProducts } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Check, ChevronsUpDown, PenIcon, ViewIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import ProductDeleteModal from "./ProductDeleteModal";
import ViewProductModal from "./ViewProductModal";
import EditProductModal from "./EditProductModal";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib";

type ProductsInventoryProps = {
  userId: string;
};

const ProductsInventory = ({ userId }: ProductsInventoryProps) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const { data, error, refetch, isLoading } = useQuery({
    queryFn: () => {
      return axios.get<UserProducts>(
        `${ecomBackendUrl}/user/${userId}/products`
      );
    },
    queryKey: ["products", userId],
    enabled: userId !== undefined && userId !== null,
    staleTime: 5 * 60 * 1000,
  });
  console.log({ value });
  const products = data?.data.products
    ? data?.data.products.map((prod) => ({
        value: prod.name,
        label: prod.name,
      }))
    : [];

  const content =
    value === ""
      ? data?.data.products.map((prod, i) => {
          return (
            <li
              className="flex gap-5 my-4 items-center rounded-md overflow-hidden pr-2 bg-slate-100"
              key={i}
            >
              <Image
                src={prod.imagePath}
                alt="prod img"
                height={200}
                width={200}
                className="size-[80px]"
              />
              <span>{prod.name}</span>
              <div className="ml-auto flex gap-4">
                <span>{prod.availableCount} units available</span>
                <ViewProductModal productId={prod._id} key={prod._id} />
                <EditProductModal product={prod} />
                <ProductDeleteModal
                  key={i}
                  refetch={refetch}
                  prodName={prod.name}
                  productId={prod._id}
                  userId={userId}
                />
              </div>
            </li>
          );
        })
      : data?.data.products
          .filter((prod) => prod.name === value)
          .map((prod, i) => (
            <>
              <li
                className="flex gap-5 my-4 items-center rounded-md overflow-hidden pr-2 bg-slate-100"
                key={i}
              >
                <Image
                  src={prod.imagePath}
                  alt="prod img"
                  height={200}
                  width={200}
                  className="size-[80px]"
                />
                <span>{prod.name}</span>
                <div className="ml-auto flex gap-4">
                  <span>{prod.availableCount} units available</span>
                  <ViewProductModal productId={prod._id} key={prod._id} />
                  <EditProductModal product={prod} />
                  <ProductDeleteModal
                    key={i}
                    refetch={refetch}
                    prodName={prod.name}
                    productId={prod._id}
                    userId={userId}
                  />
                </div>
              </li>
            </>
          ));

  if (isLoading) return <Loading />;
  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[400px] my-4 justify-between"
          >
            {value
              ? products.find((prod) => prod.value === value)?.label
              : "Search Product"}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[400px] p-0">
          <Command>
            <CommandInput placeholder="Search framework..." className="h-9" />
            <CommandList>
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup>
                {products.map((prod, id) => (
                  <CommandItem
                    key={id}
                    value={prod.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    {prod.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        value === prod.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <ul>{content}</ul>
    </div>
  );
};

export default ProductsInventory;
