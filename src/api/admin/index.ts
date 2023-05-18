import Router from '@koa/router';
import { Spec } from "koa-joi-router";
import addPrefixMapper from '../../@shared/utils/addPrefixMapper';

const routes: Array<Spec> = [];

const adminRouter = new Router();

adminRouter.get('/', async (ctx, next) => {
    ctx.body = { foo: 'webhook  router' };
    await next();
});

adminRouter.get('/secret2', async (ctx, next) => {
    ctx.body = { foo: 'fooooo' };
    await next();
});

adminRouter.use('./')
export default routes.map((route) => addPrefixMapper("")(route));
