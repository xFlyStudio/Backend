import Koa from 'koa';
import koaLogger from "koa-logger";
import { consola } from 'consola';
import routes from './rootRouter';

import koaCORS from "@koa/cors";
import koaRepsonseTime from "koa-response-time";
import koaBodyParser from "koa-bodyparser";

const logger = consola.create({
    defaults: {
        tag: "server",
    },
});

const environment = process.env.NODE_ENV || "production";
const port = process.env.PORT || 3000;
async function init() {

    const app = new Koa();
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
            } catch (error: any) {
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
            app.use(koaLogger());
        }


    }
    // 啟動伺服器
    app.use(koaCORS())
        .use(koaRepsonseTime())
        .use(koaBodyParser())
        .use(routes.middleware());


    console.log(`app listening on ${port}`)
    app.listen(port);
}
init();
