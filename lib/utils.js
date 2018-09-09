const mockShippingData = require('../config/mockShippingData.json');

const getMockShippingDataById = (id) => {
    return mockShippingData[id] || null;
}

module.exports = {
    getMockShippingDataById
}