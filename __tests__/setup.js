require('dotenv').config();

jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

beforeAll(async () => {
    process.env.NODE_ENV = 'test';
})

afterAll(async () => {
    await new Promise(resolve => setTimeout(resolve, 100));
})