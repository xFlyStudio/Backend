import Router from '@koa/router';
const userRouter = new Router();

userRouter.get('/:id', async (ctx, next) => {
    const id = ctx.params.id;
    ctx.body = { userID: id };
    await next();
});

export default userRouter