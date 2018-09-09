const ShippingController = require('../src/Controller/ShippingController');
const CacheController = require('../src/Controller/CacheController');

describe('ShippingController', async () => {
    const existShippingId = 'THV5YPH5L3';
    const nonExistShippingId = 'NONEXISTTEST';
    const existOnCache = 'CACHEKEYSHIP'
    describe('getShippingDataById', async () => {
        it('Get with exist shippingId', async () => {
            const result = await ShippingController.getShippingDataById(existShippingId);
            expect(result).toBeTruthy();
            expect(result.id).toBe(existShippingId);
        });

        it('Get with non exist shippingId', async () => {
            const result = await ShippingController.getShippingDataById(nonExistShippingId);
            expect(result).toBeFalsy();
        });

        it('Get with exist shippingId on cache', async () => {
            const cache = new CacheController();
            const from = 'fromtest';
            const to = 'totest';
            const itemDetail = 'detailTest';
            await cache.set(existOnCache, {
                id: existOnCache,
                from,
                to,
                itemDetail,
            });
            const result = await ShippingController.getShippingDataById(existOnCache, cache);
            expect(result).toBeTruthy();
            expect(result.id).toBe(existOnCache);
            expect(result.from).toBe(from);
            expect(result.to).toBe(to);
            expect(result.itemDetail).toBe(itemDetail);
        });
    });

    describe('generateShippingId', async () => {
        it('Should return unique id with length 10', async () => {
            const result = await ShippingController.generateShippingId();
            expect(result).toBeTruthy();
            expect(result.length).toBe(10);
        });

        it('Should return new id on exist shippingId', async () => {
            const cache = new CacheController();
            const existId = 'TH12345678';
            await cache.set(existId, 'test');
            const result = await ShippingController.generateShippingId(cache, existId);
            expect(result).toBeTruthy();
            expect(result.length).toBe(10);
            expect(result).not.toBe(existId);
        })
    });

    describe('createShipping', async () => {
        it('should return id', async () => {
            const cache = new CacheController();
            const model = {
                from: 'from',
                to: 'to',
                itemDetail: 'detail'
            };
            const result = await ShippingController.createShipping(cache, model);
            expect(result).toBeTruthy();
            expect(result.id).toBeTruthy();
            expect(result.from).toBe(model.from);
            expect(result.to).toBe(model.to);
            expect(result.itemDetail).toBe(model.itemDetail);
        })
    });

    describe('validate', async () => {
        it('valid data', async () => {
            const model = {
                from: 'from',
                to: 'to',
                itemDetail: 'detail'
            };
            const result = await ShippingController.validate(model);
            expect(result).toBeTruthy();
        })

        it('invalid data', async () => {
            const model = {
                from: 'from',
                to: 'to'
            };
            const result = await ShippingController.validate(model);
            expect(result).toBeFalsy();
        })
    });
});