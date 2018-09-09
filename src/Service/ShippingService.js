const ShippingController = require('../Controller/ShippingController');

class ShippingService {
    // GET Method for track shipping
    static async getShipping(ctx) {
        const result = {
            success: false,
            developerMessage: 'Failed'
        };

        if (ctx.params) {
            const { shippingId } = ctx.params;
            if (shippingId) {
                const shippingData = await ShippingController.getShippingDataById(shippingId, ctx.cache);
                if (shippingData) {
                    result.success = true;
                    result.developerMessage = 'Success';
                    result.shippingId = shippingId;
                    result.shippingData = shippingData;
                }
            }
        }

        ctx.json(result);
    }

    // POST Method for update shipping/tracking details
    static async postShipping(ctx) {
        const result = {
            success: false,
            developerMessage: 'Failed'
        };

        if (ShippingController.validate(ctx.request.body)) {
            const create = await ShippingController.createShipping(ctx.cache, ctx.request.body)
            if (create) {
                result.success = true;
                result.developerMessage = 'Success';
                result.shippingId = create.id;
            } else {
                result.success = false;
                result.developerMessage = 'Failed';
            }
        }
        ctx.json(result);
    }
}

module.exports = ShippingService;