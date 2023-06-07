import { NextFunction, Request, Response } from "express";
import express from 'express'
import helmet from 'helmet'

const app = express();
// const chartRoutes = require("./routes/charts");
// const { sqLiteConnect } = require("./util/database");
const PORT = 8080;

// const hostName =
//   process.env.NODE_ENV === "development"
//     ? `http://localhost:${port}`
//     : `http://localhost:${port}`; // TODO: it has to be changes when deployed

export type QueryMiddleware = (
  req: Request,
  res: Response,
  next?: NextFunction
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
  if (next) {
    next();
  }
});
// app.use(chartRoutes);

// sqLiteConnect(() => {
//   app.listen(PORT, () => {
//     console.log(`The app is listening on port ${PORT}`);
//   });
// });
app.listen(PORT, () => {
  console.log(`The app is listening on port ${PORT}`);
});
