const logger = require('../../logging');

const proxies = ["http://34.213.199.191:80", "http://18.188.165.157:80", undefined];

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

const crawl = function (err, res, done) {
    if(res.$(".zztext").length > 0){
        logger.error("Proxy failed at request: " + res.options.uri);
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