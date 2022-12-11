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
exports.user_uuid = exports.token = void 0;
const supertest_1 = __importDefault(require("supertest"));
const users_1 = require("../models/users");
const server_1 = __importDefault(require("../server"));
const request = (0, supertest_1.default)(server_1.default);
const store = new users_1.Users();
describe('User Model ', () => {
    describe('do methods exist', () => {
        it('index', () => {
            expect(store.index).toBeDefined();
        });
        it('create', () => {
            expect(store.create).toBeDefined();
        });
        it('delete', () => {
            expect(store.delete).toBeDefined();
        });
        it('show', () => {
            expect(store.show).toBeDefined();
        });
        it('authenticate', () => {
            expect(store.authenticate).toBeDefined();
        });
    });
    describe('do methods work correctly', () => {
        it('create method', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield store.create({
                first: 'mahmoud',
                last: 'mohamed',
                password: 'password123',
            });
            expect(res).toEqual(jasmine.objectContaining({
                first: 'mahmoud',
                last: 'mohamed',
            }));
        }));
        it('authenticate with correct data', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield store.authenticate('mahmoud', 'mohamed', 'password123');
            expect(res).toBeDefined();
        }));
        it('authenticate with wrong data', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield store.authenticate('mahmoud', 'mohamed', 'password12kk3');
            expect(res).toBeNull();
        }));
        it('index method', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield store.index();
            expect(res).toEqual([
                jasmine.objectContaining({
                    first: 'mahmoud',
                    last: 'mohamed',
                }),
            ]);
        }));
        it('show method', () => __awaiter(void 0, void 0, void 0, function* () {
            exports.user_uuid = (yield store.index())[0].id;
            const res = yield store.show(exports.user_uuid);
            expect(res).toEqual(jasmine.objectContaining({
                first: 'mahmoud',
                last: 'mohamed',
            }));
        }));
        it('update method', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield store.update({
                first: 'mahmoud',
                last: 'MO',
                password: 'password123',
            });
            expect(res).toEqual(jasmine.objectContaining({
                first: 'mahmoud',
                last: 'MO',
            }));
        }));
        it('delete method', () => __awaiter(void 0, void 0, void 0, function* () {
            exports.user_uuid = (yield store.index())[0].id;
            const res = yield store.delete(exports.user_uuid);
            expect(res).toEqual(jasmine.objectContaining({}));
        }));
    });
    describe('Test API ENDPOINTS', () => {
        it('create  user ', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request.post('/user').send({
                first: 'mahmoud',
                last: 'mohamed',
                password: 'password123',
            });
            expect(res.status).toBe(200);
        }));
        it('authenticate', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request.get('/user/authenticate').send({
                first: 'mahmoud',
                last: 'mohamed',
                password: 'password123',
            });
            expect(res.status).toBe(200);
            exports.token = res.body.data.token;
            console.log(exports.token);
        }));
        it('show all users', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request
                .get(`/users`)
                .set('Authorization', 'Bearer ' + exports.token);
            expect(res.status).toBe(200);
        }));
        it('show specific user', () => __awaiter(void 0, void 0, void 0, function* () {
            exports.user_uuid = (yield store.index())[0].id;
            const res = yield request
                .get(`/user/${exports.user_uuid}`)
                .set('Authorization', 'Bearer ' + exports.token)
                .send({
                id: exports.user_uuid,
            });
            expect(res.status).toBe(200);
        }));
        it('update specific user', () => __awaiter(void 0, void 0, void 0, function* () {
            exports.user_uuid = (yield store.index())[0].id;
            const res = yield request
                .patch(`/user/${exports.user_uuid}`)
                .set('Authorization', 'Bearer ' + exports.token)
                .send({
                first: 'mahmoud',
                last: 'MO',
                password: 'password123',
            });
            expect(res.status).toBe(200);
        }));
        // it("delete specific user",async()=>{
        //     let user_uuid= (await store.index() as unknown as User[])[0].id
        //     const res=  await request.delete(`/user/${user_uuid}`).set("Authorization","Bearer " + token).send({
        //         id:user_uuid
        //     });
        //     expect(res.status).toBe(200)
        // })
    });
});
