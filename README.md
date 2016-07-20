Paid On Results API Helper Methods
----------------------------------

_Warning: ALPHA release - unstable API and feature incomplete_

Contains utilities to simplify interaction with the Paid On Results Affiliate Marketing Network APIs.

Provides support for the following data types:

 - Merchants
 - Links

Bear in mind that some calls may take a little while to return if they contain a large data set. This is because we do multiple API calls to get all pages of data, which we then stitch together in the output for your benefit.

## Prerequisites

 - Node.js / NPM

## Install

```
npm i paid-on-results --save
```

## Usage

```
var POR = new PaidOnResults({
  apiKey: '123456',
  affiliateId: '123455'
})
```

### Advertisers

Get a list of all advertisers in the Paid On Results system

```
POR.getAdvertisers()
```

### Links

Get links linked to the websiteId

```
POR.getLinks()
```

### Voucher Codes

Get voucher codes linked to the websiteId

```
POR.getVouchers()
```

### Transactions

Get transactions linked to the websiteId

```
POR.getTransactions()
```

## Test

```
npm test
```
