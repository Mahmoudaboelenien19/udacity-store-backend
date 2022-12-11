"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const users_routes_1 = __importDefault(require("./handlers/users_routes"));
const products_routes_1 = __importDefault(require("./handlers/products-routes"));
const ordersRoutes_1 = __importDefault(require("./handlers/ordersRoutes"));
const app = (0, express_1.default)();
const address = '0.0.0.0:3000';
app.use(body_parser_1.default.json());
app.use('/', users_routes_1.default);
app.use('/', products_routes_1.default);
app.use('/', ordersRoutes_1.default);
app.get('/', function (req, res) {
    res.send('Hello there!');
});
app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});
exports.default = app;
