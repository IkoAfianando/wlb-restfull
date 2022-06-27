import * as Koa from 'koa'
import { DefaultState, DefaultContext, ParameterizedContext } from 'koa';
import * as Router from 'koa-router'
import 'colors'
import { connectWithDB } from './entities'
import { start } from 'repl';
const port = 8080

const startApp = async () => {

    const app: Koa<DefaultState, DefaultContext> = new Koa()

    await connectWithDB(app)

    const router: Router = new Router()

    router.get('/', async (ctx: ParameterizedContext<DefaultContext, DefaultState>) => {
        ctx.body = { msg: "Hello World Welcome to Indonesia" }
    })

    app.use(router.routes()).use(router.allowedMethods())

    app.listen(port, () =>
        console.log(`Server is running on port ${port} go to http://localhost:${port}`.green)
    )
}

startApp()