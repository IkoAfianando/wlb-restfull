import Koa from 'koa'
import { DefaultState, DefaultContext, ParameterizedContext } from 'koa';
import Router from 'koa-router'
import 'colors'
const port = 3000

const app: Koa<DefaultState, DefaultContext> = new Koa()

const router: Router = new Router()

router.get('/', async (ctx: ParameterizedContext<DefaultContext, DefaultState>) => {
    ctx.body = { msg: "Hello World" }
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(port, () =>
    console.log(`Server is running on port ${port} go to http://localhost:${port}`.green)
)