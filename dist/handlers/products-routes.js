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
const products_1 = require("../models/products");
const express_1 = require("express");
const authrization_1 = __importDefault(require("../middlewares/authrization"));
const store = new products_1.Products();
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield store.index();
    res.json({ products });
});
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedProduct = yield store.delete(req.params.id);
    res.json({ deletedProduct, message: 'product deleted successfully' });
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requiredProduct = yield store.show(req.params.id);
    res.json({ requiredProduct });
});
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = {
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
    };
    const updatedProduct = yield store.update(product);
    res.json({ message: "product updated successfully", updatedProduct });
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = {
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
    };
    const createdProduct = yield store.create(product);
    res.json({ message: "product created successfully", createdProduct });
});
const productRoutes = (0, express_1.Router)();
productRoutes.route('/products').get(index).post(authrization_1.default, create);
productRoutes.route('/product').post(authrization_1.default, create);
productRoutes
    .route('/product/:id')
    .get(show)
    .delete(authrization_1.default, destroy)
    .patch(authrization_1.default, update);
exports.default = productRoutes;
