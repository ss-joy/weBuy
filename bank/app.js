const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(require("./routes/all-routes"));
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(4000, () => {
      console.log("bank started @4000");
    });
  })
  .catch((e) => {
    console.log(e);
  });
