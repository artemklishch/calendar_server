"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const app = (0, express_1.default)();
// const chartRoutes = require("./routes/charts");
// const { sqLiteConnect } = require("./util/database");
const PORT = 8080;
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, DELETE");
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
