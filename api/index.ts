import { ErrorHandler } from "./core/error-handler";
import { AppRouter } from "./core/app.router";
import express from "express";
import path from "path";

const app = express();
const distPath = path.resolve("..", "dist");
const PORT = 3000;

app.use(express.json());
app.use(express.static(distPath));
app.use("/api", AppRouter);
app.use(ErrorHandler);

app.get("*", (req: express.Request, res: express.Response) => {
  res.sendFile(path.resolve(distPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Application has started on port ${PORT}`);
});
