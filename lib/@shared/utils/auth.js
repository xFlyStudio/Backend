"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = process.env.JWT_SIGN_SECRET;
class JWT {
    static async verify(token) {
        return new Promise((resolve, reject) => {
            jsonwebtoken_1.default.verify(token, secret, function (err, decoded) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(decoded);
                }
            });
        });
    }
}
exports.JWT = JWT;
//# sourceMappingURL=auth.js.map