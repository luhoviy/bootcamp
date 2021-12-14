import express from "express";
import path from "path";
import { ErrorHandler } from "./core/error-handler.js";
import { AppRouter } from "./core/app.router.js";

const app = express();
const distPath = path.resolve("..", "dist");
const PORT = process.PORT || 3000;

app.use(express.json());
app.use(express.static(distPath));
app.use("/api", AppRouter);
app.use(ErrorHandler);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(distPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Application has started on port ${PORT}`);
});
