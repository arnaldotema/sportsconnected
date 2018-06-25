const logger = require('../../logging');

const proxies = ["http://66.119.180.101:80", undefined];

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

const crawl = function (err, res, done) {
    if(res.$(".zztext").length > 0){
        logger.error("Proxy failed at request: " + res.options.uri + " with PROXY: " + res.options.proxy);
        res.options.proxyFailCallback(err, res, done);
    }
    else{
        res.options.successCallback(err, res, done);
    }
}

const getProxy = function() {
    return proxies[getRandomInt(proxies.length)];
}

module.exports = {
    crawl: crawl,
    getProxy: getProxy
}