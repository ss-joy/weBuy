import { Schema, model } from "mongoose";
interface ITransaction {
  email: String;
  cost: Number;
  trxId: String;
  productQuantity: String;
  address: String;
  status: String;
}
const TransactionSchema = new Schema<ITransaction>({
  email: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  trxId: {
    type: String,
    required: true,
  },
  productQuantity: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
  },
});

const Transaction = model<ITransaction>("Transaction", TransactionSchema);
export default Transaction;
