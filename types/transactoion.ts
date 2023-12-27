import { ApiResponse } from "./apiResponse";

export type SingleTransaction = {
  trxId: string;
  total_cost: number;
  ecom_user_id: string;
  email: string;
  trx_date: Date;
  transactionsItemsLists: {
    productId: string;
    productPrice: number;
    productQuantity: number;
  }[];
};

export interface TransactionsList extends ApiResponse {
  data?: SingleTransaction[];
}
