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
import React, { useMemo } from "react";
import { useTable } from "react-table";
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
  console.log(orderItem);
  return totalPrice;
}
function OrderTable({ orderItem }: OrderTableProps): JSX.Element {
  const columns = useMemo(() => {
    return COLUMNS;
  }, []);
  const memoData = useMemo(() => {
    return orderItem;
  }, []);
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
  return (
    <div>
      {/* <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => {
            return (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th {...header.getHeaderProps()}>
                      {header.render("Header")}
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          {footerGroups.map((footerGroup) => {
            return (
              <tr {...footerGroup.getFooterGroupProps()}>
                {footerGroup.headers.map((footer) => {
                  return (
                    <td {...footer.getFooterProps()}>
                      {footer.render("Footer")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tfoot>
      </table> */}

      {/* shad cn version */}
      <Table {...getTableProps()}>
        <TableCaption>A list of your orders.</TableCaption>
        <TableHeader>
          {headerGroups.map((headerGroup) => {
            return (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
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
              <TableRow {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <TableCell {...cell.getCellProps()}>
                      {cell.render("Cell")}
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
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell className="text-right">
              {calulcateTotalPrice(orderItem)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}

export default OrderTable;
