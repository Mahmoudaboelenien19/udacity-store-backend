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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authrization_1 = __importDefault(require("../middlewares/authrization"));
const users_1 = require("../models/users");
const store = new users_1.Users();
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield store.index();
    res.json({ data: result });
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = {
            first: req.body.first,
            last: req.body.last,
            password: req.body.password,
        };
        const result = yield store.create(newUser);
        console.log("token");
        const token = jsonwebtoken_1.default.sign({ newUser }, process.env.TOKEN_SECRET);
        console.log(token);
        res.json({ message: 'user created successfully', data: { result, token } });
    }
    catch (err) {
        res.json({ message: `can't create user please fill all inputs` });
    }
});
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = {
        first: req.body.first,
        last: req.body.last,
        password: req.body.password,
    };
    const result = yield store.update(user);
    res.json({ message: 'user updated successfully', result });
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield store.show(req.params.id);
    res.json({ data: result });
});
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield store.delete(req.params.id);
    res.json({ data: result, message: 'user deleted successfully' });
});
const authenticate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = {
        first: req.body.first,
        last: req.body.last,
        password: req.body.password,
    };
    // const result = await store.authenticate(user.first, user.last, user.password);
    const token = jsonwebtoken_1.default.sign({ user }, process.env.TOKEN_SECRET);
    res.json({
        data: {
            user, token
        },
    });
});
const routes = (0, express_1.Router)();
routes.route('/user/authenticate').get(authenticate);
routes.route('/user').post(create);
routes.route("/users").get(authrization_1.default, index);
routes
    .route('/user/:id')
    .get(authrization_1.default, show)
    .delete(authrization_1.default, destroy)
    .patch(authrization_1.default, update);
exports.default = routes;
