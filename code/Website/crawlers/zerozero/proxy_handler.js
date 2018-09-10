const logger = require('../../logging');

const proxies = [undefined, 'http://139.162.235.163:31028'];
const users = {
    undefined: '39e5d204642dada7bb08924de2713108',
    'http://139.162.235.163:31028':'a1d92f9f89ae4731f45de6205f48ba80'
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