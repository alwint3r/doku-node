'use strict';

var expect = require('chai').expect;
var Doku = require('../');

describe('Factory(config)', function() {
    it('Should throw exception when either mallId or sharedKey is not provided in config', function() {
        var configs = [
            {},
            { mallId: 'oneHellMallId' },
            { sharedKey: 'oneHellSharedKey' },
            { sharedKey: 'oneHellSharedKey', mallId: 'oneHellMallId' },
        ];

        var fn = function(i) {
            return Doku(configs[i]);
        }

        expect(fn.bind(null, 0)).to.throw(Error);
        expect(fn.bind(null, 0)).to.throw(/mallId/);
        expect(fn.bind(null, 1)).to.throw(Error);
        expect(fn.bind(null, 1)).to.throw(/sharedKey/);
        expect(fn.bind(null, 2)).to.throw(Error);
        expect(fn.bind(null, 2)).to.throw(/mallId/);
        expect(fn.bind(null, 3)).not.to.throw(Error);
    });

    it('Should have words object', function() {
        var doku = Doku({
            mallId: 'oneMallId',
            sharedKey: 'oneSharedKey',
        });

        expect(doku.words).to.be.an('object');
        expect(doku.words.raw).to.be.a('function');
        expect(doku.words.hashed).to.be.a('function');
    });

    it('Should have formatBasket function', function() {
        var doku = Doku({
            mallId: 'oneMallId',
            sharedKey: 'oneSharedKey',
        });

        expect(doku.formatBasket).to.be.a('function');
    });
});