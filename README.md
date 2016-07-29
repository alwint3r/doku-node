DOKU Integration Module
=======================

## Options

* `mallId` - (*String*, **required**) - This value is given by DOKU.
* `sharedKey` - (*String*, **required**) - This value is given by DOKU.
* `isProduction` - (*Boolean*) - indicates that whether you are using productin environment or not. Default to `false`.

## Usage

```js
var opts = {
    mallId: 'oneMallId',
    sharedKey: 'oneSharedKey',
};

var Doku = require('dokupayment')(opts);
```

## APIs

* `.payment.payment(data, callback)`
* `.payment.prePayment(data, callback)`
* `.payment.directPayment(data, callback)`
* `.payment.generatePayCode(data, callback)`
* `.payment.redirectPayment(data, callback)`
* `.payment.capture(data, callback)`
* `.words.raw(data)`
* `.words.hashed(data)`
* `.formatBasket(data)`
