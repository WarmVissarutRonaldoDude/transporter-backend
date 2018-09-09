
/**
 * Class represent shipping detail model
 */
class ShippingDetailModel {
    static fields () {
        return {
            from: 'string',
            to: 'string',
            itemDetail: 'string'
        };
    }
};

module.exports = ShippingDetailModel;