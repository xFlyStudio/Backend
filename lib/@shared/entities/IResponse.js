"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IResponseSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.IResponseSchema = joi_1.default.object({
    success: joi_1.default.required()
});
//# sourceMappingURL=IResponse.js.map