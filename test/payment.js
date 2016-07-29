'use strict';

var expect = require('chai').expect;
var nock = require('nock');

var context = {
    mallId: 'oneMallId',
    sharedKey: 'oneSharedKey',
    baseUrl: 'http://127.0.0.1:8080/fake',
};

var payment = require('../src/request')(context);

describe('Payment HTTP Request', function() {
    var fakeServer;

    before(function() {
        fakeServer = nock(context.baseUrl);
    });

    it('Should call callback with error if transaction is failed', function(done) {
        fakeServer
            .post('/payment/paymentMip')
            .reply(200, {
                res_response_code: '5503',
                res_response_msg: 'Internal server error',
            });

        payment.payment({}, function(err) {
            expect(err).not.to.be.null;
            expect(err.status).to.be.equal(500);
            expect(err.code).to.be.equal('5503');
            expect(err.message).to.be.equal('Internal server error');

            return done();
        });
    });
});
