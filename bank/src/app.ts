import { connect } from "mongoose";
import express, { Express } from "express";
const app: Express = express();
import cors from "cors";
import { router } from "./routes/all-routes";
import { config } from "dotenv";
import { Dummyrouter } from "./routes/dummy";
import { userRouter } from "./routes/user-routes";
import { transactionRouter } from "./routes/transaction-routes";
config();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(Dummyrouter);
app.use(router);
app.use("/user", userRouter);
app.use("/trasaction", transactionRouter);
const PORT = process.env.BANK_PORT;
connect(process.env.MONGODB_URI!)
  .then(() => {
    console.log("database connection for bank is ok");
    app.listen(4000, () => {
      console.log(`bank server started @${PORT} `);
    });
  })
  .catch((e) => {
    console.log("error on database connection for bank");
    console.log(e);
  });
