import addPrefixMapper from "../../@shared/utils/addPrefixMapper";
import { Context } from "koa";
import koaJoiRouter, { Spec } from "koa-joi-router";

const routes: Array<Spec> = [];
const joi = koaJoiRouter.Joi;

export interface IWebhookBaseResponse {
    webhook: boolean;
}

const handler = async (ctx: Context) => {
    const resp: IWebhookBaseResponse = {
        webhook: true,
    }
    ctx.body = resp;
}

routes.push({
    method: "get",
    path: "/",
    meta: {
        swagger: {
            summary: "Discord BOT Webhook",
            tags: ["webhook", "discord"],
        },
    },
    validate: {
        output: {
            200: {
                body: {
                    webhook: joi.boolean().required(),
                },
            },
        },
    },
    handler: [
        handler
    ],
});

export default [...routes].map((route) => addPrefixMapper("/discord")(route));
