const NodeCache = require( "node-cache" );

class CacheController {
    constructor() {
        this.cache = new NodeCache();
    }

    async set(key, value) {
        return this.cache.set(key, value);
    }

    async get(key) {
        return this.cache.get(key);
    }

    /**
     * set on unset key
     * @param {String} key 
     * @param {*} value 
     */
    async setAndGet(key, value) {
        const result = await this.get(key);
        if (!result) {
            await this.set(key, value);
            return value;
        }
        return result;
    }
}

module.exports = CacheController;