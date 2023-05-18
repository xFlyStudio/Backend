import addPrefixMapper from '../@shared/utils/addPrefixMapper';
import { Context } from 'koa';
import koaJoiRouter, { Spec } from "koa-joi-router";

import DiscordRouter from './discord'
import TelegramRouter from './telegram'

const routes: Array<Spec> = [
    ...DiscordRouter,
    ...TelegramRouter
];
const joi = koaJoiRouter.Joi;

export interface IWebhookBaseResponse {
    webhook: boolean;
}

routes.push({
    method: "get",
    path: "/",
    meta: {
        swagger: {
            summary: "Webhook測試節點",
            tags: ["webhook"],
        },
    },
    validate: {
        /*
        params: {
            eventID: joi.number().required(),
        },*/
        output: {
            200: {
                body: {
                    webhook: joi.boolean().required(),
                },
            },
        },
    },
    handler: [
        async (ctx: Context) => {
            const resp: IWebhookBaseResponse = {
                webhook: true,
            }
            ctx.body = resp;
        },
    ],
});



export default [...routes].map((route) => addPrefixMapper("/webhook")(route));
