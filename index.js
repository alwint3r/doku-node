'use strict';

module.exports = function Factory(config) {
    var context = config;

    if (!config.mallId) {
        throw new Error('mallId must be provided!');
    }

    if (!config.sharedKey) {
        throw new Error('sharedKey must be provided!');
    }

    context.baseUrl = config.isProduction
        ? 'https://pay.doku.com/api'
        : 'http://staging.doku.com/api';

    return {
        words: require('./src/words')(context),
        formatBasket: require('./src/format_basket'),
    };
};
