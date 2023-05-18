"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const addPrefixMapper_1 = __importDefault(require("../@shared/utils/addPrefixMapper"));
const koa_joi_router_1 = __importDefault(require("koa-joi-router"));
const discord_1 = __importDefault(require("./discord"));
const telegram_1 = __importDefault(require("./telegram"));
const routes = [
    ...discord_1.default,
    ...telegram_1.default
];
const joi = koa_joi_router_1.default.Joi;
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
        async (ctx) => {
            const resp = {
                webhook: true,
            };
            ctx.body = resp;
        },
    ],
});
exports.default = [...routes].map((route) => (0, addPrefixMapper_1.default)("/webhook")(route));
//# sourceMappingURL=index.js.map