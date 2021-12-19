import { ErrorHandler } from "./core/common/error-handler";
import { AppRouter } from "./core/app.router";
import express from "express";
import path from "path";
import mongoose from "mongoose";

const app = express();
const distPath = path.resolve("..", "dist");
const PORT = 3000;
const DB_URL = "mongodb+srv://user:test123@cluster0.ttm0a.mongodb.net/Bootcamp?retryWrites=true&w=majority";

app.use(express.json());
app.use(express.static(distPath));
app.use("/api", AppRouter);
app.use(ErrorHandler);

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
