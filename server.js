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

// add ctx.query when adding params
const injectParams = params => page => async ctx =>
    await app.render(ctx.req, ctx.res, page, Object.assign(ctx.query, params))

// if you don't need to injectParams
// and you want to just render page
const actualPage = injectParams({})

// parse :id to query obj
// @NOTE DO NOT USE ?id=str FOR THIS ENDPOINT
// IT WILL BE OVERWRITTEN WITH :id
const parseParamId = async (id, ctx, next) => {
    ctx.query = Object.assign(ctx.query, { id })
    await next()
}
// parse :username to query obj
// @NOTE DO NOT USE ?username=str FOR THIS ENDPOINT
// IT WILL BE OVERWRITTEN WITH :username
const parseParamUsername = async (username, ctx, next) => {
    ctx.query = Object.assign(ctx.query, { username })
    await next()
}

app.prepare().then(() => {
    const server = new Koa()
    const router = new Router()
    const logger = !dev ? require('koa-pino-logger') : require('koa-logger')

    server.use(helmet())
    server.use(logger())

    router.get('/subscribe', actualPage('/subscribe'))
    router.get('/admin', actualPage('/admin'))
    router.get('/signin', actualPage('/signin'))
    router.get('/edit', actualPage('/edit'))
    router.get('/welcome', actualPage('/welcome'))
    router.get('/brands', actualPage('/brands'))
    router.get('/about', actualPage('/about'))

    router.get('/contact', injectParams({ view: 'contact' })('/support'))
    router.get('/careers', injectParams({ view: 'careers' })('/support'))
    router.get('/guidelines', injectParams({ view: 'guidelines' })('/support'))
    router.get('/terms', injectParams({ view: 'terms' })('/support'))
    router.get('/support', injectParams({ view: 'support' })('/support'))
    router.param('id', parseParamId).get('/t/:id', actualPage('/thing'))
    router.param('id', parseParamId).get('/r/:id', actualPage('/repost'))
    router.param('id', parseParamId).get('/s/:id', actualPage('/story'))
    router
        .param('username', parseParamUsername)
        .get('/:username', actualPage('/profile'))

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
