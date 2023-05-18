"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const addPrefixMapper_1 = __importDefault(require("../../@shared/utils/addPrefixMapper"));
const koa_joi_router_1 = __importDefault(require("koa-joi-router"));
const routes = [];
const joi = koa_joi_router_1.default.Joi;
routes.push({
    method: "get",
    path: "/",
    meta: {
        swagger: {
            summary: "Telegram BOT Webhook",
            tags: ["webhook", "telegram"],
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
        async (ctx) => {
            const resp = {
                webhook: true,
            };
            // 拿到 Webhook 的 JSON 格式資料
            const body = ctx.request.toJSON();
            // 因為不只有 Telegram 可以透過該網址傳訊息，所以要確認訊息格式是否正確
            if (body.message && body.message.chat && body.message.chat.id && body.message.text) {
                // 我們在乎的是訊息內容及訊息來源
                const text = body.message.text;
                const chat_id = body.message.chat.id;
                // 回覆訊息，POST
                await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    // 用 Markdown 格式回傳顛倒的訊息
                    body: JSON.stringify({ chat_id, parse_mode: "MarkdownV2", text: text.split("").reverse().join("") }),
                });
            }
            ctx.body = resp;
        },
    ],
});
exports.default = [...routes].map((route) => (0, addPrefixMapper_1.default)("/telegram")(route));
//# sourceMappingURL=index.js.map