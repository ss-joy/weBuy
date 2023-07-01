import Product from "@/models/product-model";
import connectToDB from "@/utils/database";
export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await connectToDB();
    } catch (err) {
      res
        .status(500)
        .json({ msg: "error happened on the server connecting to DB" });
      return;
    }
    // console.log(req.query.productId);
    const product = await Product.findOne({
      _id: req.query.productId,
    });
    if (!product) {
      return res.status(404).json({ msg: "no products found on DB" });
    }
    res.status(200).json({
      product: product,
    });
  }
}
