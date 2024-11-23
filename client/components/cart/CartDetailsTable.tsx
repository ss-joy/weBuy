import React, { useMemo } from "react";
import { useTable } from "react-table";
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
import { ExternalLinkIcon } from "lucide-react";
import ProductImage from "@/components/cart/ProductImage";
type Product = {
  productId: string;
  productQuantity: number;
  productPrice: number;
  productSellerId: string;
};

type CartDetailsTableProps = {
  products: Product[];
};

const COLUMNS = [
  {
    Header: "Name",
    Footer: "Name",
    accessor: "productId",
  },
  {
    Header: "Quantity",
    Footer: "Quantity",
    accessor: "productQuantity",
  },
  {
    Header: "Price(Each)",
    Footer: "Price",
    accessor: "productPrice",
  },
];

function CartDetailsTable({ products }: CartDetailsTableProps): JSX.Element {
  const columns = useMemo(() => {
    return COLUMNS;
  }, []);
  const memoData = useMemo(() => {
    return products;
  }, []);
  console.log("products---", products);
  const {
    getTableProps,
    getTableBodyProps,
    footerGroups,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    //columns
    // @ts-ignore
    columns: columns,

    //rows or data
    data: memoData,
  });
  function calulcateTotalPrice(products: Product[]): number {
    const totalPrice = products.reduce((prev, curr) => {
      return prev + curr.productQuantity * curr.productPrice;
    }, 0);

    return totalPrice;
  }
  return (
    <div>
      <Table {...getTableProps()}>
        <TableCaption>List of all your orders.</TableCaption>
        <TableHeader>
          {headerGroups.map((headerGroup) => {
            return (
              <TableRow
                className="xl:text-xl"
                {...headerGroup.getHeaderGroupProps()}
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      className="text-slate-700"
                      {...header.getHeaderProps()}
                    >
                      {header.render("Header")}
                    </TableHead>
                  );
                })}
              </TableRow>
            );
          })}
        </TableHeader>

        <TableBody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <TableRow className="xl:text-xl" {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <TableCell {...cell.getCellProps()}>
                      {cell.column.id === "productId" ? (
                        <ProductImage key={cell.value} productId={cell.value} />
                      ) : (
                        cell.render("Cell")
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell className="text-right xl:text-xl" colSpan={2}>
              Total
            </TableCell>
            <TableCell className="text-right xl:text-xl">
              {calulcateTotalPrice(products)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}

export default CartDetailsTable;
