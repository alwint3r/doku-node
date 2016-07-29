'use strict';

var crypto = require('crypto');

function preGenerate(context, data) {
    return [
        data.amount,
        context.mallId,
        context.sharedKey,
        data.invoice,
    ];
}

function generateRaw(context, data) {
    if (data.device_id) {
        if (data.pairing_code) {
            return preGenerate(context, data).concat([
                data.currency,
                data.token,
                data.pairing_code,
                data.device_id,
            ]).join('');
        } else {
            return preGenerate(context, data).concat([
                data.currency,
                data.device_id,
            ]).join('');
        }
    } else if (data.pairing_code) {
        return preGenerate(context, data).concat([
            data.currency,
            data.token,
            data.pairing_code,
        ]).join('');
    } else if (data.currency) {
        return preGenerate(context, data).concat([
            data.currency,
        ]).join('');
    } else {
        return preGenerate(context, data).join('');
    }
}

function makeSha1Hash(data) {
    return crypto
        .createHash('sha1')
        .update(data)
        .digest('hex');
}

module.exports = function(context) {
    return {
        raw: function raw(data) {
            return generateRaw(context, data);
        },

        hashed: function hashed(data) {
            return makeSha1Hash(generateRaw(context, data));
        },
    };
};
