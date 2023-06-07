import { NextFunction, Request, Response } from "express";
import express from "express";
import helmet from "helmet";
import calendarRoutes from "./routes/calendar";

const app = express();
const { sqLiteConnect } = require("./util/database");
const PORT = 8080;

export type QueryMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;
app.use(helmet());
app.use(express.json());
app.use(<QueryMiddleware>function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use(calendarRoutes);

sqLiteConnect(() => {
  app.listen(PORT, () => {
    console.log(`The app is listening on port ${PORT}`);
  });
});
