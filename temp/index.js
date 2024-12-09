const { Schema, model, connect, Types } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
  },
});

const User = model("User", userSchema);

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  sellerId: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  imagePath: {
    type: String,
    required: true,
  },
  sellCount: {
    type: Number,
    default: 0,
  },
  productCategory: {
    type: String,
    required: true,
  },
});

const Product = model("Product", productSchema);

async function getAllProds() {
  const data = await Product.find({}).populate("sellerId");
  console.log(data);
  return data;
}

async function con() {
  await connect(
    "mongodb+srv://mongo_user:12345@cluster1.exfjbjn.mongodb.net/prod_we_buy?retryWrites=true&w=majority"
  );
  getAllProds();
}
con();
