"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const addPrefixMapper_1 = __importDefault(require("../../@shared/utils/addPrefixMapper"));
const koa_joi_router_1 = __importDefault(require("koa-joi-router"));
const routes = [];
const joi = koa_joi_router_1.default.Joi;
const handler = async (ctx) => {
    const resp = {
        webhook: true,
    };
    ctx.body = resp;
};
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
exports.default = [...routes].map((route) => (0, addPrefixMapper_1.default)("/discord")(route));
//# sourceMappingURL=index.js.map