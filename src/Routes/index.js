const shippingRoute = require('./shipping');

module.exports = (router) => {
    // Landing route
    router.get('/', (ctx) => ctx.json({ appName: 'Transporter Backend' }));

    shippingRoute(router);
};