const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  email: String,
  cost: Number,
  trxId: String,
  productQuantity: String,
  address: String,
  status: {
    type: String,
    default: "pending",
  },
});

module.exports = mongoose.model("Transaction", TransactionSchema);
