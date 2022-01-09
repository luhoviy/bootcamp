import { ErrorHandlerMiddleware } from "./core/common/error-handler";
import { AppRouter } from "./core/app.router";
import express from "express";
import path from "path";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const distPath = path.resolve("..", "dist");
const { DB_URL, PORT } = process.env;

app.use(morgan("tiny"));
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.static(distPath));
app.use("/api", AppRouter);
app.use(ErrorHandlerMiddleware);

app.get("*", (req: express.Request, res: express.Response) => {
  res.sendFile(path.resolve(distPath, "index.html"));
});

const startApp = async () => {
  try {
    await mongoose.connect(DB_URL);
    app.listen(PORT, () => console.log(`Application has started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

startApp();
