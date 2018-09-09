require('dotenv').load();

const { start } = require('./Server');
const routes = require('./Routes');

start(routes, process.env.PORT);