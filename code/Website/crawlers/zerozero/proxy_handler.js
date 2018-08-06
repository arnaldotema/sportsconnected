const logger = require('../../logging');

const proxies = [undefined, 'http://81.163.43.14:41258'];
const users = {
    undefined: 'e7782ea7ec0825c9cbdc2b1393285507',
    'http://81.163.43.14:41258':'40aea8c640e27156acdc6dea7d0f39f8'
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

const crawl = function (err, res, done) {
    if( res.$(".g-recaptcha").length > 0){
        logger.error("Proxy failed at request: " + res.options.uri + " with PROXY: " + res.options.proxy);
        res.options.proxyFailCallback(err, res, done);
    }
    else{
        res.options.successCallback(err, res, done);
    }
}

const getSession = function() {
    let proxy = proxies[getRandomInt(proxies.length)];
    let user = users[proxy]

    return {
        proxy: proxies[getRandomInt(proxies.length)],
        user: user
    };
}

module.exports = {
    crawl: crawl,
    getSession: getSession
}