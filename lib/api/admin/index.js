"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = __importDefault(require("@koa/router"));
const addPrefixMapper_1 = __importDefault(require("../../@shared/utils/addPrefixMapper"));
const routes = [];
const adminRouter = new router_1.default();
adminRouter.get('/', async (ctx, next) => {
    ctx.body = { foo: 'webhook  router' };
    await next();
});
adminRouter.get('/secret2', async (ctx, next) => {
    ctx.body = { foo: 'fooooo' };
    await next();
});
adminRouter.use('./');
exports.default = routes.map((route) => (0, addPrefixMapper_1.default)("")(route));
//# sourceMappingURL=index.js.map