'use strict';

var expect = require('chai').expect;
var _ = require('lodash');

var creds = {
    mallId: 'oneMallId',
    sharedKey: 'oneSharedKey',
};

var words = require('../src/words')(creds);
var crypto = require('crypto');

function wordsCurrency(data, raw) {
    var str = [
        data.amount,
        creds.mallId,
        creds.sharedKey,
        data.invoice,
        data.currency,
    ].join('');

    if (raw)
        return str;

    return crypto
        .createHash('sha1')
        .update(str)
        .digest('hex');
}

describe('Words', function() {
    var data = {
        amount: '10000.00',
        currency: '360',
        invoice: 'invoice' + Date.now(),
    };

    describe('When currency is defined', function() {
        it('Should output the same result as straightforward function', function() {
            expect(words.raw(data)).to.be.equal(wordsCurrency(data, true));
            expect(words.hashed(data)).to.be.equal(wordsCurrency(data));
        });
    });
});

