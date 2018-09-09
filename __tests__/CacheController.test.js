const CacheController = require('../src/Controller/CacheController');

describe('CacheController', async () => {
    let cache;
    describe('set', async () => {
        beforeEach(() => {
            cache = new CacheController();
        })
        it('set value should return success', async () => {
            const success = await cache.set('keytest', 123);
            expect(success).toBeTruthy();
        });

        it('set on exist key should still success', async () => {
            const success = await cache.set('keytest', 123);
            expect(success).toBeTruthy();

            const success2 = await cache.set('keytest', 456);
            expect(success2).toBeTruthy();
        });
    });

    describe('get', async () => {
        beforeEach(() => {
            cache = new CacheController();
        })
        it('get on non exist key', async () => {
            const result = await cache.get('nonexist');
            expect(result).toBeFalsy();
        });

        it('get on exist key', async () => {
            const value = 123;
            const key = 'keytest';
            await cache.set(key, value);
            const result = await cache.get(key);
            expect(result).toBe(value);
        });
    });

    describe('setAndGet', async () => {
        beforeEach(() => {
            cache = new CacheController();
        })
        it('non exist key should set', async () => {
            const value = 123;
            const key = 'keytest';
            const result = await cache.setAndGet(key, value);
            expect(result).toBe(value);
        });

        it('exist key should return get result', async () => {
            const value = 123;
            const key = 'keytest';
            await cache.set(key, value);
            const result = await cache.setAndGet(key, 999);
            expect(result).toBe(value);
        });
    });
});