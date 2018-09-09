const ShippingService = require('../Service/ShippingService');

/**
 * Shipping routes
 * @param {*} router 
 */
const shipping = (router) => {
    router.get('/shipping/:shippingId', ShippingService.getShipping);
    router.post('/shipping', ShippingService.postShipping);
};

module.exports = shipping;