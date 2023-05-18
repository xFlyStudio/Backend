"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = __importDefault(require("@koa/router"));
const userRouter = new router_1.default();
userRouter.get('/:id', async (ctx, next) => {
    const id = ctx.params.id;
    ctx.body = { userID: id };
    await next();
});
exports.default = userRouter;
//# sourceMappingURL=index.js.map