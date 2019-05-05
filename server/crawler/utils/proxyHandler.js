const logger = require('../../logging');

const proxies = [undefined]; //, 'http://115.78.123.57:60562'];

// proxy value is 'zzptremember'
const users = {
    undefined: '66fd97ac-b649-45d5-b33a-459b2e10e978',
    'http://115.78.123.57:60562':'78b832a7-0e1a-4b24-bcd6-a1a7a92e4488'
};

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

exports.crawl = function (err, res, done) {
    if( res.$(".g-recaptcha").length > 0){
        logger.error("Proxy failed at request: " + res.options.uri + " with PROXY: " + res.options.proxy);
        res.options.proxyFailCallback(err, res, done);
    }
    else{
        res.options.successCallback(err, res, done);
    }
};

exports.getSession = function() {
    const proxy = proxies[getRandomInt(proxies.length)];
    const user = users[proxy];

    return {
        proxy: proxies[getRandomInt(proxies.length)],
        user: user
    };
};