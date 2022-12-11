"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dotenv_1 = __importDefault(require("dotenv"));
const orders_1 = __importDefault(require("../models/orders"));
const authrization_1 = __importDefault(require("../middlewares/authrization"));
dotenv_1.default.config();
const orderStore = new orders_1.default();
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield orderStore.index();
        if (orders.length === 0) {
            res.json({ message: 'no orders to show' });
        }
        else {
            res.json({ orders });
        }
    }
    catch (err) {
        res.status(400).send(`can't show orders ${err}`);
    }
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield orderStore.show(parseInt(req.params.id));
        res.json({ order });
    }
    catch (err) {
        res.status(400).send(`the required order is not found ${err}`);
    }
});
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield orderStore.delete(parseInt(req.params.id));
        if (order) {
            res.json({ message: 'order is successfully deleted', order });
        }
        else {
            res.json({ message: 'no order to delete' });
        }
    }
    catch (err) {
        res.status(400).send(`can't delete this order ${err}`);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const createdOrder = {
            status: req.body.status,
            quantity: req.body.quantity,
            product_id: req.body.product_id,
            user_id: req.body.user_id,
        };
        const order = yield orderStore.create(createdOrder);
        res.json({ message: 'order is successfully created', order });
    }
    catch (err) {
        res.status(400).send(`can't create this order ${err}`);
    }
});
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedOrder = {
            status: req.body.status,
            quantity: req.body.quantity,
            product_id: req.body.product_id,
            user_id: req.body.user_id,
        };
        const order = yield orderStore.update(updatedOrder);
        res.json({ message: 'order is successfully updated', order });
    }
    catch (err) {
        res.status(400).send(`can't delete this order ${err}`);
    }
});
const orderRoutes = (0, express_1.Router)();
orderRoutes.route('/orders').get(authrization_1.default, index);
orderRoutes.route('/order').post(authrization_1.default, create);
orderRoutes
    .route('/order/:id')
    .get(authrization_1.default, show)
    .delete(authrization_1.default, destroy)
    .patch(authrization_1.default, update);
exports.default = orderRoutes;
