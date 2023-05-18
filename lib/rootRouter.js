"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_joi_router_1 = __importDefault(require("koa-joi-router"));
const koa_jwt_1 = __importDefault(require("koa-jwt"));
const koa_joi_router_docs_v2_1 = require("koa-joi-router-docs-v2");
const webhook_1 = __importDefault(require("./webhook"));
const addPrefixMapper_1 = __importDefault(require("./@shared/utils/addPrefixMapper"));
const apiRoutes = [
    ...webhook_1.default
].map((route) => (0, addPrefixMapper_1.default)("")(route));
// Create APP router
const joiRouter = (0, koa_joi_router_1.default)();
// Handle JWT 401 errors
joiRouter.use((ctx, next) => {
    return next().catch((error) => {
        if (error.status === 401 && error.message === "Authentication Error") {
            ctx.status = 401;
            ctx.body = {
                success: false,
                code: "common.errors.unauthorized",
                message: error.originalError ? error.originalError.message : error.message,
            };
        }
        else {
            throw error;
        }
    });
});
// JWT
joiRouter.use((0, koa_jwt_1.default)({
    secret: String(process.env.JWT_SECRET),
}).unless({
    path: [
        // support regex
        new RegExp(`^\/webhook\/*.*\$`),
        new RegExp(`^\/swagger\$`),
        new RegExp(`^\/_api.json\$`),
        '/'
    ],
}));
// Import API routes
joiRouter.route(apiRoutes);
// API Docs (Must be after all routes)
const apiDocGenerator = new koa_joi_router_docs_v2_1.SwaggerAPI();
apiDocGenerator.addJoiRouter(joiRouter);
const spec = apiDocGenerator.generateSpec({
    info: {
        title: "xFly Studio Backend",
        description: "",
        version: "0.0.1",
    },
    basePath: "/"
}, {
    defaultResponses: {
        200: {
            description: "OK",
        },
        500: {
            description: "ERROR",
        },
    },
});
// API Docs JSON
joiRouter.get("/_api.json", async (ctx) => {
    ctx.body = JSON.stringify(spec, null, "  ");
});
// API Docs HTML
joiRouter.get("/swagger", async (ctx) => {
    ctx.body = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>API Docs</title>
    </head>
    <body>
      <redoc spec-url='/_api.json' lazy-rendering></redoc>
      <script src="https://cdn.jsdelivr.net/npm/redoc@2.0.0/bundles/redoc.standalone.js"></script>
    </body>
    </html>
    `;
});
joiRouter.get('/', (ctx) => {
    ctx.body = '逼餔';
});
exports.default = joiRouter;
//# sourceMappingURL=rootRouter.js.map