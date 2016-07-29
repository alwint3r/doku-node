'use strict';

var _ = require('lodash');

function format(basket) {
    return [
        basket.name,
        basket.amount,
        basket.quantity,
        basket.subtotal,
    ].join(',');
}

module.exports = function formatBasket(data) {
    var result = '';

    if (_.isArray(data)) {
        _.each(data, function (datum) {
            result = result + format(datum) + ';';
        });
    } else if (_.isObject(data)) {
        result = format(data) + ';';
    } else {
        result = data;
    }

    return result;
};
