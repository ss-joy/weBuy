const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(require("./routes/all-routes"));
mongoose
  .connect(
    "mongodb+srv://userOne:12345@cluster1.exfjbjn.mongodb.net/we-bank?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(4000, () => {
      console.log("bank started @4000");
    });
  })
  .catch((e) => {
    console.log(e);
  });
