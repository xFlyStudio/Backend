"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const koa_logger_1 = __importDefault(require("koa-logger"));
const consola_1 = require("consola");
const rootRouter_1 = __importDefault(require("./rootRouter"));
const cors_1 = __importDefault(require("@koa/cors"));
const koa_response_time_1 = __importDefault(require("koa-response-time"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const logger = consola_1.consola.create({
    defaults: {
        tag: "server",
    },
});
const environment = process.env.NODE_ENV || "production";
const port = process.env.PORT || 3000;
async function init() {
    const app = new koa_1.default();
    /*
    // 若 APP 在 Reverse Proxy 下運行，則標記為 Proxy
    if (usingReverseProxy) {
        app.proxy = true;
        app.proxyIpHeader = process.env.APP_REAL_IP_HEADER ? process.env.APP_REAL_IP_HEADER : "cf-connecting-ip";
    }
*/
    // Global Error Handler
    if (environment != "development") {
        app.use(async (ctx, next) => {
            try {
                await next();
            }
            catch (error) {
                logger.error(`Unexcepted error occurred. Path: ${ctx.path}, Method: ${ctx.method}, Source: ${ctx.ip}`);
                logger.error(error);
                ctx.status = error ? error.status || 500 : 500;
                ctx.body = {
                    success: false,
                    code: "common.errors.unexcepted",
                    message: "Unexcepted error occurred",
                };
            }
        });
        // 若為開發環境則輸出 Request 紀錄
        if (environment == "development") {
            app.use((0, koa_logger_1.default)());
        }
    }
    // 啟動伺服器
    app.use((0, cors_1.default)())
        .use((0, koa_response_time_1.default)())
        .use((0, koa_bodyparser_1.default)())
        .use(rootRouter_1.default.middleware());
    console.log(`app listening on ${port}`);
    app.listen(port);
}
init();
//# sourceMappingURL=index.js.map