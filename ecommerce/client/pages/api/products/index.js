import connectToDB from "@/utils/database";

import Product from "@/models/product-model";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await connectToDB();
    } catch (err) {
      console.log("error connecting to databse from api folder");
      console.log(err);
    }
    const products = await Product.find({}).exec();
    if (!products) {
      return res.status(404).json({ msg: "no products found on DB" });
    }
    return res.status(200).json(products);
  }
}
