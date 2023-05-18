import JoiRouter from 'koa-joi-router';
import jwt from 'koa-jwt';
import { SwaggerAPI as swaggerAPI } from "koa-joi-router-docs-v2";

import webHookRouter from './webhook'
import addPrefixMapper from './@shared/utils/addPrefixMapper';
const apiRoutes = [
    ...webHookRouter
].map((route) => addPrefixMapper("")(route));

// Create APP router
const joiRouter = JoiRouter();

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
        } else {
            throw error;
        }
    });
});

// JWT
joiRouter.use(
    jwt({
        secret: String(process.env.JWT_SECRET),
    }).unless({
        path: [
            // support regex
            new RegExp(`^\/webhook\/*.*\$`),
            new RegExp(`^\/swagger\$`),
            new RegExp(`^\/_api.json\$`),
            '/'
        ],
    })
);


// Import API routes
joiRouter.route(apiRoutes);

// API Docs (Must be after all routes)
const apiDocGenerator = new swaggerAPI();
apiDocGenerator.addJoiRouter(joiRouter);

const spec = apiDocGenerator.generateSpec(
    {
        info: {
            title: "xFly Studio Backend",
            description: "",
            version: "0.0.1",
        },
        basePath: "/"
    },
    {
        defaultResponses: {
            200: {
                description: "OK",
            },
            500: {
                description: "ERROR",
            },
        },
    }
);

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
})
export default joiRouter;

