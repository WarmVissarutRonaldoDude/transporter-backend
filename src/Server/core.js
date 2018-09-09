
const Router = require('koa-router');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const CacheController = require('../Controller/CacheController');
const globalCache = new CacheController();
/**
 * Core server
 */
class Core {
    constructor(routes) {
        const router = new Router();
        this.app = new Koa();

        // Only JSON for now.
        this.app.use(bodyParser({
            enableTypes: [ 'json' ],
            jsonLimit: '1mb'
        }));

        this.app.use(this.json);
        this.app.use(this.cache);
        this.app.use(cors());

        routes(router);
        this.app.use(router.routes())
            .use(router.allowedMethods());

    }

    async cache(ctx, next) {
        ctx.cache = globalCache;
        await next();
    }

    async json(ctx, next) {
        ctx.json = (payload, status = 200) => {
            ctx.type = 'application/json';
            ctx.status = status;
            ctx.body = payload;
        };
        await next();
    }

    listen(port) {
      this.app  .listen(port, (err) => {
        if (err) {
            console.log(`Listen on port ${port} error : `, err);
        }
        console.log(`Listen on port -> ${port}`);
      })
    }
}

module.exports = Core;