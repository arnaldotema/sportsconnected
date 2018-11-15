const logger = require('../../logging');

const proxies = [undefined]; //, 'http://115.78.123.57:60562'];

// proxy value is 'zzptremember'
const users = {
    undefined: '78b832a7-0e1a-4b24-bcd6-a1a7a92e4488',
    'http://115.78.123.57:60562':'08998fc8-b50c-41b8-aa72-c52dd2c424a3'
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

/*
 * Detecta certos erros no pedido e automaticamente muda de proxy (Caso haja mais proxies disponíveis)
 */
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