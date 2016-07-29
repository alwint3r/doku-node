'use strict';

var expect = require('chai').expect;
var formatBasket = require('../src/format_basket');

describe('formatBasket(data)', function() {
    var data = {
        name: 'Product',
        amount: '1000.00',
        quantity: 2,
        subtotal: '2000.00',
    };

    var dataArray = [
        data,
        {
            name: 'Product2',
            amount: '3000.00',
            quantity: 3,
            subtotal: '9000.00',
        },
    ];

    it('Should process correctly when data is an object', function() {
        var equal = 'Product,1000.00,2,2000.00;';
        var equalArray = equal + 'Product2,3000.00,3,9000.00;';

        expect(formatBasket(data)).to.be.equal(equal);
        expect(formatBasket(dataArray)).to.be.equal(equalArray);
    });

});
