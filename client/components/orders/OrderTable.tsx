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
import Link from "next/link";
import React, { useMemo } from "react";
import { useTable } from "react-table";
import ProductImage from "../cart/ProductImage";
const COLUMNS = [
  {
    Header: "Product Id",
    Footer: "Product Id",
    accessor: "productId",
  },
  {
    Header: "Product Price",
    Footer: "Product Price",
    accessor: "productPrice",
  },
  {
    Header: "Product Quantity",
    Footer: "Product Quantity",
    accessor: "productQuantity",
  },
];
type OrderItem = {
  productId: string;
  productQuantity: number;
  productPrice: number;
  _id: string;
};
type OrderTableProps = {
  orderItem: OrderItem[];
};
function calulcateTotalPrice(orderItem: OrderItem[]): number {
  const totalPrice = orderItem.reduce((prev, curr) => {
    return prev + curr.productQuantity * curr.productPrice;
  }, 0);
  return totalPrice;
}
function OrderTable({ orderItem }: OrderTableProps): JSX.Element {
  const columns = useMemo(() => {
    return COLUMNS;
  }, []);
  const memoData = useMemo(() => {
    return orderItem;
  }, []);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      //columns
      // @ts-ignore
      columns: columns,

      //rows or data
      data: memoData,
    });
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
                    <TableHead {...header.getHeaderProps()}>
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
                      {/* {cell.render("Cell")} */}
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
        {/* <TableFooter>
          {footerGroups.map((footerGroup) => {
            return (
              <TableRow {...footerGroup.getFooterGroupProps()}>
                {footerGroup.headers.map((footer) => {
                  return (
                    <TableCell {...footer.getFooterProps()}>
                      {footer.render("Footer")}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableFooter> */}
        <TableFooter>
          <TableRow>
            <TableCell className="text-right xl:text-xl" colSpan={2}>
              Total
            </TableCell>
            <TableCell className="text-right xl:text-xl">
              {calulcateTotalPrice(orderItem)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}

export default OrderTable;
