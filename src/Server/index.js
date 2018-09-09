const Core = require('./core');

const DEFAULT_SERVER_PORT = '6485';

const start = (routes, port) => {
    const core = new Core(routes);
    const listenPort = port || DEFAULT_SERVER_PORT;
    core.listen(listenPort);
}

module.exports = {
    start,
}