const Koa = require('koa')
const next = require('next')
const Router = require('koa-router')
const helmet = require('koa-helmet')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const mobxReact = require('mobx-react')
mobxReact.useStaticRendering(true)

app.prepare().then(() => {
    const server = new Koa()
    const router = new Router()
    const logger = !dev ? require('koa-pino-logger') : require('koa-logger')

    server.use(helmet())
    server.use(logger())

    router
        .param('value', async (value, ctx, next) => {
            ctx.param = value
            await next()
        })
        .get('/:value', async ctx => {
            console.log(ctx.param)
            await app.render(ctx.req, ctx.res, '/', ctx.query)
            ctx.respond = false
        })

    router.get('*', async ctx => {
        await handle(ctx.req, ctx.res)
        ctx.respond = false
    })

    server.use(async (ctx, next) => {
        ctx.res.statusCode = 200
        await next()
    })

    server.use(router.routes())
    server.listen(port, err => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port}`)
    })
})
