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
exports.Users = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const database_1 = __importDefault(require("../database"));
const { SALT_ROUNDS, BCRYPT_PASSWORD } = process.env;
const hashPassword = (password) => {
    const salt = parseInt(SALT_ROUNDS);
    return bcrypt_1.default.hashSync(password + BCRYPT_PASSWORD, salt);
};
dotenv_1.default.config();
class Users {
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'INSERT INTO users (first,last,password) VALUES($1,$2,$3) RETURNING id,first,last;';
                const result = yield conn.query(sql, [
                    user.first,
                    user.last,
                    hashPassword(user.password),
                ]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error('failed to create');
            }
        });
    }
    update(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'UPDATE users set first= ($1),last=($2),password=($3) RETURNING id,first,last;';
                const result = yield conn.query(sql, [
                    user.first,
                    user.last,
                    hashPassword(user.password),
                ]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error('failed to update');
            }
        });
    }
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT id,first,last FROM users;';
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error('failed');
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT id,first,last FROM users WHERE id=($1);';
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error('failed');
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'DELETE FROM users WHERE id=($1) RETURNING id,first,last;';
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error('failed');
            }
        });
    }
    authenticate(first, last, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'SELECT password FROM users WHERE first=($1) AND last =($2) ;';
            const conn = yield database_1.default.connect();
            const result = yield conn.query(sql, [first, last]);
            if (result.rows.length) {
                const user = result.rows[0];
                const check = bcrypt_1.default.compareSync(password + BCRYPT_PASSWORD, user.password);
                if (check) {
                    return user;
                }
            }
            return null;
        });
    }
}
exports.Users = Users;
