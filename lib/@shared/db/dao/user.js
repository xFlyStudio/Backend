"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDAO = void 0;
const sqlite3orm_1 = require("sqlite3orm");
const User_1 = __importDefault(require("../entities/User"));
const connection_1 = __importDefault(require("../connection"));
async function userDAO() {
    return new sqlite3orm_1.BaseDAO(User_1.default, await (0, connection_1.default)());
}
exports.userDAO = userDAO;
//# sourceMappingURL=user.js.map