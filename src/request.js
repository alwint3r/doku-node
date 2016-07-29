'use strict';

var request = require('superagent');
var formatBasket = require('./format_basket');

function makeRequest(url, data, done) {
    return request
        .post(url)
        .type('form')
        .send({ data: JSON.stringify(data) })
        .set('Accept', 'application/json')
        .redirects(5)
        .end(function(err, response) {
            if (err) {
                return done(err);
            }

            var body = response.text;

            try {
                body = JSON.parse(response.text);
            } catch (ex) {

            }

            if (body.res_response_code !== '0000') {
                var error = new Error(body.res_response_msg);
                error.status = 500;
                error.code = body.res_response_code;

                return done(error);
            }

            return done(null, body);
        });
};

module.exports = function RequesterFactory(context) {
    return {
        prePayment: function prePayment(data, done) {
            var body = data;
            var url = context.baseUrl + '/payment/PrePayment';
            body.req_basket = formatBasket(body.req_basket);

            return makeRequest(url, body, done);
        },

        payment: function payment(data, done) {
            var body = data;
            var url = context.baseUrl + '/payment/paymentMip';
            body.req_basket = formatBasket(body.req_basket);

            return makeRequest(url, body, done);
        },

        directPayment: function directPayment(data, done) {
            var url = context.baseUrl + '/payment/PaymentMIPDirect';

            return makeRequest(url, data, done);
        },

        generatePayCode: function generatePayCode(data, done) {
            var url = context.baseUrl + '/payment/doGeneratePaymentCode';

            return makeRequest(url, data, done);
        },

        redirectPayment: function redirectPayment(data, done) {
            var url = context.baseUrl + '/payment/doInitiatePayment';

            return makeRequest(url, data, done);
        },

        capture: function capture(data, done) {
            var url = context.baseUrl + '/payment/DoCapture';

            return makeRequest(url, data, done);
        },
    };
};