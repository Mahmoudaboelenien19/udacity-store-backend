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
const database_1 = __importDefault(require("../database"));
class Orders {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM orders;';
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error('unable to show orders' + err);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM orders WHERE id=($1);';
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error('unable to show the required order' + err);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'DELETE FROM orders WHERE id=($1) RETURNING *;';
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error('unable to delete the required order' + err);
            }
        });
    }
    create(order) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'INSERT INTO orders (status,quantity,product_id,user_id) VALUES($1,$2,$3,$4) RETURNING *;';
                const result = yield conn.query(sql, [
                    order.status,
                    order.quantity,
                    order.product_id,
                    order.user_id,
                ]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error('unable to create the required order' + err);
            }
        });
    }
    update(order) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'UPDATE orders set status=($1),quantity=($2), product_id=($3), user_id=($4) RETURNING * ;';
                const result = yield conn.query(sql, [
                    order.status,
                    order.quantity,
                    order.product_id,
                    order.user_id,
                ]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error('unable to create the required order' + err);
            }
        });
    }
}
exports.default = Orders;
