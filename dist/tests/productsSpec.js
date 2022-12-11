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
exports.product_uuid = void 0;
const supertest_1 = __importDefault(require("supertest"));
const products_1 = require("../models/products");
const server_1 = __importDefault(require("../server"));
const usersSpec_1 = require("./usersSpec");
const request = (0, supertest_1.default)(server_1.default);
const store = new products_1.Products();
describe('test product methods', () => {
    it('create method', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(store.index).toBeDefined();
    }));
    it('show method', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(store.show).toBeDefined();
    }));
    it('update method', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(store.update).toBeDefined();
    }));
    it('index method', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(store.index).toBeDefined();
    }));
    it('delete method', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(store.delete).toBeDefined();
    }));
    describe('do method work correctlly', () => {
        it('create method', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield store.create({
                name: 'BMW',
                price: 1000000,
                category: 'cars',
            });
            expect(res).toEqual(jasmine.objectContaining({
                name: 'BMW',
                price: 1000000,
                category: 'cars',
            }));
        }));
        it('index method', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield store.index();
            expect(res).toEqual([
                jasmine.objectContaining({
                    name: 'BMW',
                    price: 1000000,
                    category: 'cars',
                }),
            ]);
        }));
        it('show method', () => __awaiter(void 0, void 0, void 0, function* () {
            exports.product_uuid = (yield store.index())[0]
                .id;
            const res = yield store.show(exports.product_uuid);
            expect(res).toEqual(jasmine.objectContaining({
                name: 'BMW',
                price: 1000000,
                category: 'cars',
            }));
        }));
        it('update method', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield store.update({
                name: 'BMW',
                price: 1200000,
                category: 'cars',
            });
            expect(res).toEqual(jasmine.objectContaining({
                name: 'BMW',
                price: 1200000,
                category: 'cars',
            }));
        }));
        it('delete method', () => __awaiter(void 0, void 0, void 0, function* () {
            exports.product_uuid = (yield store.index())[0]
                .id;
            const res = yield store.delete(exports.product_uuid);
            expect(res).toEqual(jasmine.objectContaining({}));
        }));
    });
    describe('test product endpoints', () => {
        it('test create product ', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request
                .post('/product')
                .send({
                name: 'BMW',
                price: 1000000,
                category: 'cars',
            })
                .set('Authorization', 'Bearer ' + usersSpec_1.token);
            expect(res.status).toBe(200);
        }));
        it('show all products', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request.get('/products');
            expect(res.status).toBe(200);
        }));
        it('show specific product', () => __awaiter(void 0, void 0, void 0, function* () {
            exports.product_uuid = (yield store.index())[0]
                .id;
            const res = yield request.get(`/product/${exports.product_uuid}`).send({
                id: exports.product_uuid,
            });
            expect(res.status).toBe(200);
        }));
        it('update specific product', () => __awaiter(void 0, void 0, void 0, function* () {
            exports.product_uuid = (yield store.index())[0]
                .id;
            const res = yield request
                .get(`/product/${exports.product_uuid}`)
                .set('Authorization', 'Bearer ' + usersSpec_1.token)
                .send({
                name: 'BMW',
                price: 1200000,
                category: 'cars',
            });
            expect(res.status).toBe(200);
        }));
        // it("delete specific product",async()=>{
        //      product_uuid= (await store.index() as unknown as Product[])[0].id as string
        //     const res=await request.delete(`/product/${product_uuid}`).set("Authorization","Bearer " + token)
        //     expect(res.status).toBe(200)
        // })
    });
});
