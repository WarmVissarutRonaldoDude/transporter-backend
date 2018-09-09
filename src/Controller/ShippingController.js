const { getMockShippingDataById } = require('../../lib/utils');
const ShippingDetailModel = require('../Model/ShippingDetailModel');
const faker = require('faker');

class ShippingController {
    static async generateShippingId(cache, forceId = null) {
        const generate = () => {
            return `TH${faker.random.alphaNumeric(8)}`.toUpperCase();
        }
        let result = forceId || generate();
        if (cache) {
            let cacheId = await cache.get(result);
            // Generate new if exist;
            while (cacheId) {
                result = generate();
                cacheId = await cache.get(result);
            }
        }
        return result;
    }

    static async getShippingDataById(id, cache) {
        let result = getMockShippingDataById(id);
        if (!result && cache) {
            result = await cache.get(id);
        }
        return result;
    }

    static async createShipping(cache, shippingData) {
        const id = await ShippingController.generateShippingId(cache);
        // Cache it
        const result = await cache.set(id, shippingData);
        if (result) {
            return Object.assign(shippingData, { id });
        }
        return null;
    }

    static validate(model) {
        let result = false;

        if (model) {
            const ShippingModelFields = ShippingDetailModel.fields();
            let foundAllKey = true;
            Object.keys(ShippingModelFields).forEach((key) => {
                if (!model[key]) {
                    foundAllKey = false;
                }
            });
            result = foundAllKey;
        }

        return result;
    }
}

module.exports = ShippingController;