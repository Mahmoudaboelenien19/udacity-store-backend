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
const supertest_1 = __importDefault(require("supertest"));
const database_1 = __importDefault(require("../database"));
const orders_1 = __importDefault(require("../models/orders"));
const server_1 = __importDefault(require("../server"));
const productsSpec_1 = require("./productsSpec");
const usersSpec_1 = require("./usersSpec");
const request = (0, supertest_1.default)(server_1.default);
const store = new orders_1.default();
describe('orders model', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const conn = yield database_1.default.connect();
        const sql = 'ALTER SEQUENCE orders_id_seq RESTART WITH 1;';
        yield conn.query(sql);
        conn.release();
    }));
    describe('do models exist', () => {
        it('create', () => {
            expect(store.create).toBeDefined();
        });
        it('index', () => {
            expect(store.index).toBeDefined();
        });
        it('show', () => {
            expect(store.show).toBeDefined();
        });
        it('update', () => {
            expect(store.update).toBeDefined();
        });
        it('delete', () => {
            expect(store.delete).toBeDefined();
        });
    });
    describe('do method work correctly', () => {
        it('test create an order', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield store.create({
                status: 'active',
                quantity: 100,
                product_id: productsSpec_1.product_uuid,
                user_id: usersSpec_1.user_uuid,
            });
            expect(res).toEqual(jasmine.objectContaining({
                status: 'active',
                quantity: 100,
                product_id: productsSpec_1.product_uuid,
                user_id: usersSpec_1.user_uuid,
            }));
        }));
    });
    it('test update an order', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield store.update({
            status: 'complete',
            quantity: 100,
            product_id: productsSpec_1.product_uuid,
            user_id: usersSpec_1.user_uuid,
        });
        expect(res).toEqual(jasmine.objectContaining({
            status: 'complete',
            quantity: 100,
            product_id: productsSpec_1.product_uuid,
            user_id: usersSpec_1.user_uuid,
        }));
    }));
    it('test index an order', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield store.index();
        expect(res).toEqual([
            jasmine.objectContaining({
                id: 1,
                status: 'complete',
                quantity: 100,
                product_id: productsSpec_1.product_uuid,
                user_id: usersSpec_1.user_uuid,
            }),
        ]);
    }));
    it('test show an order', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield store.show(1);
        expect(res).toEqual(jasmine.objectContaining({
            status: 'complete',
            quantity: 100,
            product_id: productsSpec_1.product_uuid,
            user_id: usersSpec_1.user_uuid,
        }));
    }));
    it('test delete an order', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield store.delete(1);
        expect(res).toEqual(jasmine.objectContaining({}));
    }));
    describe('test orders EndPoints', () => {
        it('create', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request
                .post('/order')
                .send({
                status: 'active',
                quantity: 100,
                product_id: productsSpec_1.product_uuid,
                user_id: usersSpec_1.user_uuid,
            })
                .set('Authorization', 'Bearer ' + usersSpec_1.token);
            expect(res.status).toBe(200);
        }));
        it('update', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request
                .patch(`/order/1`)
                .send({
                status: 'complete',
                quantity: 100,
                product_id: productsSpec_1.product_uuid,
                user_id: usersSpec_1.user_uuid,
            })
                .set('Authorization', 'Bearer ' + usersSpec_1.token);
            expect(res.status).toBe(200);
        }));
        it('index', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request
                .get(`/orders`)
                .set('Authorization', 'Bearer ' + usersSpec_1.token);
            expect(res.status).toBe(200);
        }));
        it('show', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request
                .get(`/order/1`)
                .send({
                id: 1,
            })
                .set('Authorization', 'Bearer ' + usersSpec_1.token);
            expect(res.status).toBe(200);
        }));
        it('delete', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request
                .delete(`/order/1`)
                .send({
                id: 1,
            })
                .set('Authorization', 'Bearer ' + usersSpec_1.token);
            expect(res.status).toBe(200);
        }));
    });
});
