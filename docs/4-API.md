# API reference

Below is a reference for the `phoenixd` API, up-to-date for version `0.6.0`.

## Security

⚠️ This API must be secured. It gives access to your funds. You are responsible for securing it. Specifically, this API should not be accessible from the outside world.

The API uses a Basic authentication scheme. Passwords are generated on first start (see `~/.phoenix/phoenix.conf`).

**Primary password**

`http-password` is the primary password and gives access to all the API endpoints.

**Secondary password**

`http-password-limited-access` is less sensitive than the primary password, but it must still not be shared, as other attacks are possible, e.g. resource exhaustion by creating millions of invoices, etc...

The following enpoints are not available with this secondary password: `payinvoice`, `payoffer`, `paylnaddress`, `lnurlpay`, `lnurlauth`, `sendtoaddress`, `closechannel`, `export`.

## Create Bolt11 invoice

**Endpoint**

`POST /createinvoice`

**Description**

Creates a Bolt11 invoice with a description.

A Bolt11 invoice is a non-reusable, expirable payment request for Lightning, well suited for a retail payment flow. It can only be paid once.

**Parameters**

- `description` the description of the invoice (max. 128 characters).
  - or instead `descriptionHash` sha256 hash of a description.
- `amountSat` (optional) the amount requested by the invoice, in satoshi. If not set, the invoice can be paid by any amount.
- `expirySeconds` (optional) the invoice expiry in seconds, by default 3600 (1 hour).
- `externalId` (optional) a custom identifier. Use that to link the invoice to an external system.
- `webhookUrl` (optional) a webhook url that will be notified when this specific payment has been received. This notification is done in addition to the [#webhook](normal webhooks) defined in the configuration.

**Code example**

```sh
$ curl -X POST http://localhost:9740/createinvoice \
    -u :<phoenixd_api_password> \
    -d description='my first invoice' \
    -d amountSat=100 \
    -d externalId=foobar \
    -d webhookUrl='https://my.webhook.net'
```

**Response**

```json
{
  "amountSat": 100,
  "paymentHash": "f419207c9edde9021ebfb6bd0df6bd0a6606ecaf935357cc2f362e30835c3765",
  "serialized": "lntb1u1pjlsjnqpp57svjqly7mh5sy84lk67sma4apfnqdm90jdf40np0xchrpq6uxajscqpjsp592kp0fs2ssgpq9h54tsfaj5w34287v8fezgaw6cr56f076c05glq9q7sqqqqqqqqqqqqqqqqqqqsqqqqqysgqdq6d4ujqenfwfehggrfdemx76trv5mqz9grzjqwfn3p9278ttzzpe0e00uhyxhned3j5d9acqak5emwfpflp8z2cnflcyamh4dcuhwqqqqqlgqqqqqeqqjqnjpjvnv0p3wvwc6vhzkkgm8kl9r837x4p9qupk5ln5tqlm7prrlsy5xd8cf5agae64f53dvm9el0z5hvgcnta4stgmrg7zwfah0nqrqph4ts8l"
}
```

## Create Bolt12 offer

**Endpoint**

`POST /createoffer`

**Description**

Creates a Bolt12 offer with an optional description and amount.

An offer is a static and reusable payment request that does not expire. It can be paid many times. It's well suited for donations or tips.

Note: a `getoffer` call is also available but it is deprecated. This `getoffer` endpoint returns an offer, but always the same one. `createoffer` should be used instead.

**Parameters**

- description (optional) the description of the offer (max. 128 characters).
- amountSat (optional) the amount requested by the offer, in satoshi. If not set, the offer can be paid by any amount.

**Code example**

```sh
$ curl -X POST http://localhost:9740/createoffer \
    -u :<phoenixd_api_password> \
    -d description='an offer for Pierre' \
    -d amountSat=100
```

**Response**

```
lno1qgsyxjtl6luzd9t3pr62xr7eemp6awnejusgf6gw45q75vcfqqqqqqqgqvqcdgq2zdskugr0venx2u3qvehhygzsd9jhyun9zrhq8yecsj40r443pquhuhh7tjrteukce2xj7uqwm2vahys5lsn39vf5q2fyfxsw6xn824393en87nre87xcectkgcj85trcu5hn9r9703645qsrxtcq785whraquh5atw89w5scg707fz23405ygk7jn9uek3tkmvdqqvc8yz8xm2yme6hjx3x02csmq6pfzaejqr3kzg7u8am96txu95z8am8zgvfvfcnzk27ylwk43ut48xv2vrkhqtj3wes32glw5ft5h7f4p8ytwey4cqjsks55zcmr3hka0p8e50thjqpjytmt5wsa4ylhavdmewv7jmj2ppy9daujfmfvpmnw9cf75cymjffzh2nafn883vsqr3a8u2l797mayh3p
```

## Get Lightning address

**Endpoint**

`GET /getlnaddress`

**Description**

Gets a BIP-353 Lightning address from the LSP. Only works if you have a channel.

Note you can also use third-party services or self-host the address.
**Code example**

```sh
$ curl http://localhost:9740/getlnaddress \
    -u :<phoenixd_api_password>
```

**Response**

```
₿purplecrocus03@phoenixwallet.me
```

## Pay Bolt11 invoice

**Endpoint**

`POST /payinvoice`

**Description**

Pays a BOLT11 Lightning invoice. A 0.4% fee applies. Response includes the internal paymentId for that payment.

**Parameters**

- `amountSat` optional amount in satoshi. If unset, will pay the amount requested in the invoice
- `invoice` BOLT11 invoice

**Code example**

```sh
$ curl -X POST http://localhost:9740/payinvoice \
    -u :<phoenixd_api_password> \
    -d amountSat=1 \
    -d invoice=lntb10n1pjl3pmlpp5jkrt9qvl83knc0sg0xztjlw0fd6t40725hdyh3pq0arudswvw8sqcqpjsp5zsc4phrg5v6nl84wkd9vuqzlva22j2qwll28v37y9jgjs7ap2dxs9q7sqqqqqqqqqqqqqqqqqqqsqqqqqysgqdq4xysyymr0vd4kzcmrd9hx7mqz9grzjqwfn3p9278ttzzpe0e00uhyxhned3j5d9acqak5emwfpflp8z2cnfl6h8msfh3505gqqqqlgqqqqqeqqjq6f8fhkj0uma7m68arjj3m5gn339xh3m5fn4qj9r9xu550686m0y8kadeahnn02ucmyq9nfsj0vl5vhpl6g7h6fs8xa8wu2qr3yc6a2gp4h32vu
```

**Response**

```json
{
    "recipientAmountSat": 1,
    "routingFeeSat": 4,
    "paymentId": "961d413c-91ca-4f3d-9d91-760a08405901",
    "paymentHash": "9586b2819f3c6d3c3e087984b97dcf4b74babfcaa5da4bc4207f47c6c1cc71e0",
    "paymentPreimage": "6a3e65d9a05113864c9c27e430cc99751359ccbfa8fd5869aea46405df657986"
}
```

**Pay Bolt12 offer**

**Endpoint**

`POST /payoffer`

**Description**

Pays a BOLT12 Lightning offer. A 0.4% fee applies. Response includes the internal paymentId for that payment.

**Parameters**

- `amountSat` optional amount in satoshi. If unset, will pay the amount requested in the invoice
- `offer` BOLT12 offer
- `message` an optional message for the recipient

**Code example**

```sh
$ curl -X POST http://localhost:9740/payoffer \
    -u :<phoenixd_api_password> \
    -d amountSat=123 \
    -d offer=lno1qgsyxjtl6luzd9t3pr62xr...9ry9zqagt0ktn4wwvqg52v9ss9ls22sqyqqestzp2l6decpn87pq96udsvx \
    -d message='👋 Hello!'
```

**Response**

```json
{
  "recipientAmountSat": 123,
  "routingFeeSat": 4,
  "paymentId": "889c26f1-3028-4fae-9bd9-130c6e93542f",
  "paymentHash": "54ed3cadcd102a475f7e7bd25a89223b46514df72c01c4fa9880aed7a795eb16",
  "paymentPreimage": "09820bd4915f91ab21377879d5182c1bcf35feabdda5933266a99b4126f32b9b"
}
```

## Pay Lightning address

**Endpoint**

`POST /paylnaddress`

**Description**

Pays an email-like Lightning address, either based on BIP-353 or LNURL. A 0.4% fee applies. Response includes the internal paymentId for that payment.
Parameters

- `amountSat` optional amount in satoshi. If unset, will pay the amount requested in the invoice
- `address` BOLT11 invoice
- `message` an optional message for the recipient

**Code example**

```sh
$ curl -X POST http://localhost:9740/paylnaddress \
    -u :<phoenixd_api_password> \
    -d amountSat=123 \
    -d address=flashybugle70@testnet.phoenixwallet.me \
    -d message='👋 Hello!'
```

**Response**

```json
{
  "recipientAmountSat": 123,
  "routingFeeSat": 4,
  "paymentId": "a9b1b8f8-bfdb-4299-9979-18e616bc9259",
  "paymentHash": "bfa554308df2f397cd23ba724316660aaa398b2044b3e4e15ed79b8f2b278679",
  "paymentPreimage": "dc4a8e059599d464d9ea10dfc0ffe6ad23a898c897c42dad973716e85c26a920"
}
```

## Pay on-chain

**Endpoint**

`POST /sendtoaddress`

**Description**

Sends part of your current balance to a Bitcoin address. The spliced channel is not closed and remains active. Returns the transaction id if the splice was successful.

**Parameters**

- `amountSat` amount in satoshi
- `address` Bitcoin address where funds will be sent
- `feerateSatByte` fee rate in satoshi per vbyte

**Code example**

```sh
$ curl -X POST http://localhost:9740/sendtoaddress \
  -u :<phoenixd_api_password> \
  -d amountSat=100000 \
  -d address=tb1qwnp38xc5qh35ch9l5p6a3r7kwupj9rw5a4jn3y \
  -d feerateSatByte=12
```

**Response**

```
05a28b4972560655eeedaaf72c4d8e9f1a285e47e2d347734853b5e49ae9ead0
```

## Bump fee

**Endpoint**

`POST /bumpfee`

**Description**

Makes all your unconfirmed transactions use a higher fee rate, using CPFP. Returns the ID of the child transaction.

**Parameters**

- `feerateSatByte` fee rate, in satoshi per vbyte.

**Code example**

```sh
$ curl -X POST http://localhost:9740/bumpfee \
  -u :<phoenixd_api_password> \
  -d feerateSatByte=11
```

**Response**

```
758b3df67c62c9cd9ebbde1ff6eaadc1c51f94d5b1a3efb2548236b9a6f1c659
```

## List incoming payments

**Endpoint**

`GET /payments/incoming`

**Description**

Lists incoming payments.


**Parameters**

- `from`: start timestamp in millis from epoch, default 0
- `to`: end timestamp in millis from epoch, default now
- `limit`: number of payments in the page, default 20
- `offset`: page offset, default 0
- `all`: also return unpaid invoices
- `externalId`: only include payments that use this external id.

**Code example**

```sh
$ curl 'http://localhost:9740/payments/incoming?all=true&limit=3&offset=2' \
	-u :<phoenixd_api_password>
```

**Response**

```json
[
  {
    "type": "incoming_payment",
    "subType": "lightning",
    "paymentHash": "b02a9a090c7a5ae7af39f4c8398629fd596d348a452a48d290a8e250bcdd7f31",
    "preimage": "d4ffb9d35c4f85bc2a11d09d7a35ef5799f19dcacd66740fc6b470c1b7e5ab9f",
    "externalId": "some_custom_id",
    "description": "foobar",
    "invoice": "lntb1u1pnm73qvpp5kq4f5zgv0fdw0tee7nyrnp3fl4vk6dy2g54y355s4r39p0xa0ucscqzyssp5ljhykmd6a4ykvt683scnqd37umgy87x4nel4nc7gnhjahd86dvvq9q7sqqqqqqqqqqqqqqqqqqqsqqqqqysgqdq2vehk7cnpwgmqz9gxqyz5vqrzjqwfn3p9278ttzzpe0e00uhyxhned3j5d9acqak5emwfpflp8z2cnflaaxc6fnra0gcqqqqlgqqqqqeqqjqfrjwg5t3rg3k9mlnrsp0mglghr670hfwcunr5umyhjv4uegas6a3q7y9s3kg3a22ejmkgw9t98j0mhuz93ffkprtjtqx8mn068v3qasqhvlm9k",
    "isPaid": true,
    "receivedSat": 100,
    "fees": 0,
    "completedAt": 1740588077020,
    "createdAt": 1740588044198
  },
  {
    "type": "incoming_payment",
    "subType": "lightning",
    "paymentHash": "b215bf7745a7d5250be2535b723dd881368c4c4dbd44819cbb0ca7d2d02ee140",
    "preimage": "2ddcc7fd888f5c524e69c2a6e5ddd89a701b60c73746697568d438aa1cdbdafa",
    "isPaid": true,
    "receivedSat": 352,
    "fees": 0,
    "payerKey": "02da45cf516282e6959e48c26d6ed5f98bf7c32248193439bd1d22de81ae897426",
    "completedAt": 1738677427800,
    "createdAt": 1738677427800
  },
  {
    "type": "incoming_payment",
    "subType": "lightning",
    "paymentHash": "9d1f404813f02b86ef177cffd2405f76010fafa98728d0c6ba57ba66f3736f7f",
    "preimage": "1bd574c090c1214299449a6a0a23a7dc906b310b6e2d2afcabeb2d707205abb9",
    "isPaid": true,
    "receivedSat": 100000,
    "fees": 0,
    "payerKey": "02da45cf516282e6959e48c26d6ed5f98bf7c32248193439bd1d22de81ae897426",
    "completedAt": 1738676523881,
    "createdAt": 1738676523881
  }
]
```

## Get incoming payment

**Endpoint**

`GET /payments/incoming/{paymentHash}`
**Code Example**

```sh
$ curl http://localhost:9740/payments/incoming/b02a9a090c7a5ae7af39f4c8398629fd596d348a452a48d290a8e250bcdd7f31 \
	-u :<phoenixd_api_password>
```

**Response**

```json
{
  "type": "incoming_payment",
  "subType": "lightning",
  "paymentHash": "b02a9a090c7a5ae7af39f4c8398629fd596d348a452a48d290a8e250bcdd7f31",
  "preimage": "d4ffb9d35c4f85bc2a11d09d7a35ef5799f19dcacd66740fc6b470c1b7e5ab9f",
  "externalId": "some_custom_id",
  "description": "foobar",
  "invoice": "lntb1u1pnm73qvpp5kq4f5zgv0fdw0tee7nyrnp3fl4vk6dy2g54y355s4r39p0xa0ucscqzyssp5ljhykmd6a4ykvt683scnqd37umgy87x4nel4nc7gnhjahd86dvvq9q7sqqqqqqqqqqqqqqqqqqqsqqqqqysgqdq2vehk7cnpwgmqz9gxqyz5vqrzjqwfn3p9278ttzzpe0e00uhyxhned3j5d9acqak5emwfpflp8z2cnflaaxc6fnra0gcqqqqlgqqqqqeqqjqfrjwg5t3rg3k9mlnrsp0mglghr670hfwcunr5umyhjv4uegas6a3q7y9s3kg3a22ejmkgw9t98j0mhuz93ffkprtjtqx8mn068v3qasqhvlm9k",
  "isPaid": true,
  "receivedSat": 100,
  "fees": 0,
  "completedAt": 1740588077020,
  "createdAt": 1740588044198
}
```

## List outgoing payments

**Endpoint**

`GET /payments/outgoing`

**Description**

Lists outgoing payments.

**Parameters**

- `from`: start timestamp in millis from epoch, default 0
- `to`: end timestamp in millis from epoch, default now
- `limit`: number of payments in the page, default 20
- `offset`: page offset, default 0
- `all`: also return payments that have failed

**Code example**

```sh
$ curl 'http://localhost:9740/payments/outgoing?all=true&limit=3&offset=2' \
	-u :<phoenixd_api_password>
```

**Response**

```json
[
  {
    "type": "outgoing_payment",
    "subType": "auto_liquidity",
    "paymentId": "7ad2ac96-1ff9-47ae-9013-b02203c55b93",
    "txId": "53d85c7e1c5c667f5358666bafd0bce78295d6a87946f984133c9d8efe0b357d",
    "isPaid": true,
    "sent": 26850,
    "fees": 26850000,
    "completedAt": 1728565522629,
    "createdAt": 1728565522382
  },
  {
    "type": "outgoing_payment",
    "subType": "lightning",
    "paymentId": "9c020753-795c-40a9-b30e-b898b2ba80f5",
    "paymentHash": "8125523666c317232342a6c01cc1f22a00affa958428eb9b8d7dc174fd4c2ddf",
    "preimage": "0d9074340788444faca4a64d587febaac8bfb4cb811aabdf7ad2a2671647e425",
    "isPaid": true,
    "sent": 5,
    "fees": 4004,
    "completedAt": 1738348590680,
    "createdAt": 1738348589678
  },
  {
    "type": "outgoing_payment",
    "subType": "lightning",
    "paymentId": "dddfb160-f5dc-4930-b0d9-bc7a2ebf7b21",
    "paymentHash": "9727389e1c776f4efb315c4effae02affcb723883d13433ea74cc9e3f2034a93",
    "preimage": "e21f2f734d298a28fb77474ba11510c425566203daa0f9820706d6bfa75e4faa",
    "isPaid": true,
    "sent": 8,
    "fees": 4016,
    "invoice": "lntb1pne6xpnpp5junn38suwah5a7e3t380ltsz4l7twgug85f5x048fny78usrf2fscqzyssp5d4wueagg7fjetanym9gl0hpu244nclvxv72nmzlj0z2q4lpewsws9q7sqqqqqqqqqqqqqqqqqqqsqqqqqysgqdqqmqz9gxqyjw5qrzjqwfn3p9278ttzzpe0e00uhyxhned3j5d9acqak5emwfpflp8z2cnflcrt90lceflpuqqqqlgqqqqqeqqjq3nk0es2ahydaf9uz32kryn0wsgek0dmzfddy7nr7f007pn5nzdv83jnf3s7u7cvfxq6j4zd3khz86vzam7gfdq38f8earlc6u7fz5wcppg66jj",
    "completedAt": 1738348627503,
    "createdAt": 1738348626053
  }
]
```

## Get outgoing payment

**Endpoint**

`GET /payments/outgoing/{paymentId}`
`GET /payments/outgoingbyhash/{paymentHash}`

**Code example**

```sh
# by uuid
$ curl http://localhost:9740/payments/outgoing/dddfb160-f5dc-4930-b0d9-bc7a2ebf7b21 \
	-u :<phoenixd_api_password>
```

```sh
# by payment hash
$ curl http://localhost:9740/payments/outgoingbyhash/9727389e1c776f4efb315c4effae02affcb723883d13433ea74cc9e3f2034a93 \
	-u :<phoenixd_api_password>
```

**Response**

```json
{
  "type": "outgoing_payment",
  "subType": "lightning",
  "paymentId": "dddfb160-f5dc-4930-b0d9-bc7a2ebf7b21",
  "paymentHash": "9727389e1c776f4efb315c4effae02affcb723883d13433ea74cc9e3f2034a93",
  "preimage": "e21f2f734d298a28fb77474ba11510c425566203daa0f9820706d6bfa75e4faa",
  "isPaid": true,
  "sent": 8,
  "fees": 4016,
  "invoice": "lntb1pne6xpnpp5junn38suwah5a7e3t380ltsz4l7twgug85f5x048fny78usrf2fscqzyssp5d4wueagg7fjetanym9gl0hpu244nclvxv72nmzlj0z2q4lpewsws9q7sqqqqqqqqqqqqqqqqqqqsqqqqqysgqdqqmqz9gxqyjw5qrzjqwfn3p9278ttzzpe0e00uhyxhned3j5d9acqak5emwfpflp8z2cnflcrt90lceflpuqqqqlgqqqqqeqqjq3nk0es2ahydaf9uz32kryn0wsgek0dmzfddy7nr7f007pn5nzdv83jnf3s7u7cvfxq6j4zd3khz86vzam7gfdq38f8earlc6u7fz5wcppg66jj",
  "completedAt": 1738348627503,
  "createdAt": 1738348626053
}
```

## CSV export

**Endpoint**

`POST /export`

**Description**

Exports your successful payments history in a CSV file. Returns the path of the generated file on your file system.

The resulting CSV allows precise tracking of the balance and fee credit, and shows the split between mining and service fees:

- balance: sum of all amount_msat
- fee credit: sum of all fee_credit_msat

**Parameters**

- `from`: start timestamp in millis from epoch, default 0
- `to`: end timestamp in millis from epoch, default now

**Code example**

```sh
$ curl http://localhost:9740/export \
	-u :<phoenixd_api_password>
```

**Response**

```
payment history has been exported to /Users/foobar/.phoenix/exports/export-1729249806.csv
```

## Payments websocket

**Endpoint**

`WS /websocket`

**Description**

Streams JSON of received payments.

The JSON payload will contain a type field (for now, only "payment_received") and other technical data. It can contain an externalId if one was provided when the invoice was created, or the payerKey/payerNote for offers.

**Authentication**

Authentication can be done either with basic auth or with the Sec-WebSocket-Protocol header.

**Websocket example**

Using websocat, a command line utility for websocket:

```sh
$ websocat --basic-auth :<phoenixd_api_password> ws://127.0.0.1:9740/websocket
{ "type": "payment_received", "amountSat": 15, "payerNote": "hello 👋", "payerKey": "02ad95a81c1865ddb41a49f07b11a70b3f8fcd68ae161e0eb561a074f6a223ff84", "paymentHash": "5ad2185b67c6ba2e65987ab22abf5b4f8c25049d1a3b5dda76f050bc7726aab3" }
{ "type": "payment_received", "amountSat": 30, "payerKey": "02ad95a81c1865ddb41a49f07b11a70b3f8fcd68ae161e0eb561a074f6a223ff84", "paymentHash": "604def4dd6846ea6373ba27353b229ddb31ca1cb206d4becf95f82a0df4b8cfc" }
```

## Webhook

When a payment is received, phoenixd will execute an HTTP POST request to endpoints of your choice, if any are configured in the phoenix.conf settings. Use this webhook mechanism to notify an external system that a payment was successfully received.

Notes:

- The webhook endpoint should be https, but this is not enforced by Phoenixd.

- To notify a specific webhook for a specific payment, use the webhookUrl parameter instead when creating the invoice.

- The JSON payload is similar to the websocket events.

**Configuration example**

```sh
# in ~/.phoenix/phoenix.conf
webhook=https://webhook.site/aaaaaaaa-bbbb-xxxx-yyyy-zzzz
# you may have multiple webhooks, they will all be notified
webhook=https://anotherwebhook.com
```

**Webhook example**

```sh
$ curl -X POST https://webhook.site/aaaaaaaa-bbbb-xxxx-yyyy-zzzz \
    --header 'accept: application/json' \
    --header 'accept-charset: UTF-8' \
    --header 'content-type: application/json' \
    --header 'host: webhook.site' \
    --data $'{
        "type": "payment_received",
        "amountSat": 100,
        "paymentHash": "ae4ad6c862986ca50e5ce9d295f2218396bf192c60be8a85b347eddf57622c15",
        "externalId": "foobar"
    }'
```

## Get node info

**Endpoint**

`GET /getinfo`

**Code example**

```sh
$ curl http://localhost:9740/getinfo \
    -u :<phoenixd_api_password>
```

**Response**

```json
{
  "nodeId": "023a882b070d0b9b1c8db2975f2dcc65d1ffa22e00085506ab24799d6d95d658a2",
  "channels": [
    // a compact list of your channels
    {
      "state": "Normal",
      "channelId": "853c38dae30b4252cddcf3c87fc69f63313813cc5a0d06921d8a8d1f4c5f0692",
      "balanceSat": 10,
      "inboundLiquiditySat": 1013562,
      "capacitySat": 1015160,
      "fundingTxId": "3ed12fe931d1bc32ba94de8311f21016443ff6af338ac4e58b1b9ce2bd07dbf6"
    }
  ]
}
```

## Get balance**

**Endpoint**

`GET /getbalance`

**Code example**

```sh
$ curl http://localhost:9740/getbalance \
    -u :<phoenixd_api_password>
```

**Response**

```json
{
  "balanceSat": 104228,
  "feeCreditSat": 391
}
```

## List channels

**Endpoint**

`GET /listchannels`

**Code example**

```sh
$ curl http://localhost:9740/listchannels \
    -u :<phoenixd_api_password>
```

**Response**

```json
[
    {
        "type": "fr.acinq.lightning.channel.states.Normal",
        "commitments": {
            "params": {
                "channelId": "caeda5a5ad278221c0ec995d667a607b7f7e006f7c092872783acf2015fa6455",
                "channelConfig": [
                    "funding_pubkey_based_channel_keypath"
                ],
                "channelFeatures": [
                    "option_static_remotekey",
                    "option_anchor_outputs",
                    "zero_reserve_channels",
                    "option_dual_fund"
                ],
                "localParams": {
                    "nodeId": "022c03770b43158d67321a34de5e3e5a4a662adeafbe0270674704eeef56e39770",
                    "fundingKeyPath": "m/2147483553'/2147483543'/2143050548'/2147483562'/2147462237'/2147483597'/2147478557'/2147483611'/0'",
                    "dustLimit": 546,
                    "maxHtlcValueInFlightMsat": 20000000000,
                    "htlcMinimum": 1000,
                    "toSelfDelay": 2016,
                    "maxAcceptedHtlcs": 6,
                    "isInitiator": false,
                    ...
                },
                "remoteParams": {
                    "nodeId": "03933884aaf1d6b108397e5efe5c86bcf2d8ca8d2f700eda99db9214fc2712b134",
                    "dustLimit": 546,
                    "maxHtlcValueInFlightMsat": 2100000000000000000,
                    "htlcMinimum": 1,
                    ...
                },
                "channelFlags": 0
            },

        },
        "shortChannelId": "0x7410060x0",
        "channelUpdate": {
            "signature": "76164e3c3325521936461a40d12a2b7d998b97acb41fb80a59d4751bac4a0cd671f3b704559fef4a182729b98db0b57402e56f8f439cc7bc20096d05392af947",
            "chainHash": "43497fd7f826957108f4a30fd9cec3aeba79972084e90ead01ea330900000000",
            "shortChannelId": "0x7410060x0",
            "timestampSeconds": 1709829101,
            "messageFlags": 1,
            "channelFlags": 0,
            "cltvExpiryDelta": 144,
            "htlcMinimumMsat": 1,
            "feeBaseMsat": 1000,
            "feeProportionalMillionths": 100,
            "htlcMaximumMsat": 1252708000
        },
        ...
    }
]
```

## Close channel

**Endpoint**

`POST /closechannel`

**Description**

Closes a given channel, and send all funds to an on-chain address. Returns the ID of the closing transaction.

Attention: closing a channel is final, it cannot be cancelled.
**Parameters**

- `channelId` identifier of the channel to close
- `address` bitcoin address where your balance will be sent to
- `feerateSatByte` fee rate in satoshi per vbyte

**Code example**

```sh
$ curl -X POST http://localhost:9740/closechannel \
 -u :<phoenixd_api_password> \
 -d channelId=1943e03b85c06c60678ecc0fefcae8317f0a1429838aaeed1c9df4e548d7c29c \
 -d feerateSatByte=10 \
 -d address=tb1qrhv88h2rf7wscut7st3ha5uspx2njjr7xdzn5t
```

**Response**

```
758b3df67c62c9cd9ebbde1ff6eaadc1c51f94d5b1a3efb2548236b9a6f1c659
```
## Decode invoice

**Endpoint**

`POST /decodeinvoice`

**Parameters**

invoice a Bolt11 invoice

**Code example**

```sh
$ curl -X POST http://localhost:9740/decodeinvoice \
 -u :<phoenixd_api_password> \
 -d invoice=lntb10n1pngtqfhpp5qezkef9tussdxurernxpmur9fzm2g0gqjuffaypvd2r7ma8urh4scqpjsp5u3dgmgrry4advuse35al6d2j2ns9uewequpuwcf8eun0pk7m5lms9q7sqqqqqqqqqqqqqqqqqqqsqqqqqysgqdq4xysyymr0vd4kzcmrd9hx7mqz9grzjqwfn3p9278ttzzpe0e00uhyxhned3j5d9acqak5emwfpflp8z2cnfl6h8msfh3505gqqqqlgqqqqqeqqjq3krntmn2r4d8j0ncgztxkssymfpwy3lv48jt5zgq5te8c5h56r6r03a2nz09nye89pmyhncm64ppwcufntar2zs5m4jw2cfm8u9m3usqxju37k
```
Response
```json
{
    "chain": "testnet",
    "amount": 1000,
    "paymentHash": "06456ca4abe420d370791ccc1df06548b6a43d0097129e902c6a87edf4fc1deb",
    "description": "1 Blockaccino",
    "minFinalCltvExpiryDelta": 18,
    "paymentSecret": "e45a8da063257ad672198d3bfd355254e05e65d90703c76127cf26f0dbdba7f7",
    "paymentMetadata": "2a",
    "extraHops": [
        [
            {
                "nodeId": "03933884aaf1d6b108397e5efe5c86bcf2d8ca8d2f700eda99db9214fc2712b134",
                "shortChannelId": "16734014x14719942x36770",
                "feeBase": 1000,
                "feeProportionalMillionths": 100,
                "cltvExpiryDelta": 144
            }
        ]
    ],
    "features": {
        "activated": {
            "var_onion_optin": "Mandatory",
            "payment_secret": "Mandatory",
            "basic_mpp": "Optional",
            "option_payment_metadata": "Optional",
            "trampoline_payment_experimental": "Optional"
        },
        "unknown": []
    },
    "timestampSeconds": 1720025399
}
```
Decode offer
Endpoint

POST /decodeoffer
Parameters

    offer a Bolt12 offer

Code example
```
$ curl -X POST http://localhost:9740/decodeoffer \
 -u :<phoenixd_api_password> \
 -d offer=lno1qgsyxjtl6luzd9t3pr62xr...9ry9zqagt0ktn4wwvqg52v9ss9ls22sqyqqestzp2l6decpn87pq96udsvx
```
Response
```json
{
    "chain": "testnet",
    "amount": 1000,
    "paymentHash": "06456ca4abe420d370791ccc1df06548b6a43d0097129e902c6a87edf4fc1deb",
    "description": "1 Blockaccino",
    "minFinalCltvExpiryDelta": 18,
    "paymentSecret": "e45a8da063257ad672198d3bfd355254e05e65d90703c76127cf26f0dbdba7f7",
    "paymentMetadata": "2a",
    "extraHops": [
        [
            {
                "nodeId": "03933884aaf1d6b108397e5efe5c86bcf2d8ca8d2f700eda99db9214fc2712b134",
                "shortChannelId": "16734014x14719942x36770",
                "feeBase": 1000,
                "feeProportionalMillionths": 100,
                "cltvExpiryDelta": 144
            }
        ]
    ],
    "features": {
        "activated": {
            "var_onion_optin": "Mandatory",
            "payment_secret": "Mandatory",
            "basic_mpp": "Optional",
            "option_payment_metadata": "Optional",
            "trampoline_payment_experimental": "Optional"
        },
        "unknown": []
    },
    "timestampSeconds": 1720025399
}
```
Estimate liquidity fees
Endpoint

POST /estimateliquidityfees
Description

Estimates a liquidity fee for a given amount. Note that it depends on the current mining feerate, which is volatile. The estimate returned is the full cost and does not take into account any fee credit you may have.
Parameters

    amountSat the liquidiy amount, in satoshi.

Code example
```
$ curl -X POST http://localhost:9740/estimateliquidityfees \
 -u :<phoenixd_api_password> \
 -d amountSat=2000000
```
Response
```json
{
"miningFeeSat": 1219,
"serviceFeeSat": 20000
}
```
LNURL Pay
Description

Pays a LNURL-pay resource. Note that the service may apply restrictions on the amount to pay or the message -- the lnurl-pay flow is usually interactive.
Endpoint

POST /lnurlpay
Parameters

    amountSat the amount to pay
    lnurl the lnurl-pay resource
    message a comment for the recipient

Code example
```sh
$ curl -X POST http://localhost:9740/lnurlpay \
 -u :<phoenixd_api_password> \
 -d lnurl=LNURL1DP68GURN8GHJ7MRWW4EXCTNXD9SHG6NPVCHXXMMD9AKXUATJDSKHQCTE8AEK2UMND9HKU0TZV9JR2VM9XV6RVV3JVSUNWDRYXUCNVDFHV43KVE3KXQCRJDFHX33XGDENX9NRSVTRXCENVC3KV33NGWR9XQURWC3N8YEN2WP4V4JNZV8XSUH \
 -d amountSat=100
```
Response
```json
    {
    "recipientAmountSat": 100,
    "routingFeeSat": 4,
    "paymentId": "2ff3c4f2-1d97-4dc0-a522-371591c058dc",
    "paymentHash": "6a0084471b2020373a89a81b5f7e34135154f24208e491d0122d99a686b1d58d",
    "paymentPreimage": "5746edcdbf872fc508939f31f18998f294d579668f334a023804b992b0fe4842"
    }
```
LNURL Withdraw
Description

Withdraws funds from a LNURL service. Phoenixd will withdraw the maximum amount authorized by the service.
Endpoint

POST /lnurlwithdraw
Parameters

    lnurl the lnurl-withdraw resource

Code example
```sh
$ curl -X POST http://localhost:9740/lnurlpay \
 -u :<phoenixd_api_password> \
 -d lnurl=lightning:LNURL1DP68GURN8GHJ7MRWW4EXCTNXD9SHG6NPVCHXXMMD9AKXUATJDSKHW6T5DPJ8YCTH8AEK2UMND9HKU0T9893XYVF5XQMX2EP4VYCNJWR9X56RSCEE893NYVP3VC6KGEPNX5UNGDFCV9NRJDNXXCMNXENZXPJXVCFS89NRWVFJXYCNXD3K89JNGAXMZVT
```
Response
```json
{
    "url": "https://lnurl.fiatjaf.com/lnurl-withdraw?session=e9bb1406ed5a198e548c99c201f5dd359458af96f673fb0dfa09f712113669e4",
    "minWithdrawable": 1000,
    "maxWithdrawable": 4000,
    "description": "sample withdraw",
    "k1": "1649e2443dd004421e05e08a17e52ee1454e9f74aacedacc822777b9ff4ffbfb",
    "invoice": "lnbc40n1pnfqpstpp5npnnapuxylxelsat27q4dncgj...2f0tvfw33kspxfenxx"
}
```
LNURL Auth
Description

Authenticates a LNURL-auth resource to allow an action on a remote service. See LUD-04 for details.

Note: The key used to sign is derived from the wallet's key (derivation depends on the lnurl service's domain). If you have different users using the same phoenixd instance, do not let them use this or they will share the same signature and pubkey!
Endpoint

POST /lnurlauth
Parameters

    lnurl the lnurl-auth resource

Code example
```sh
$ curl -X POST http://localhost:9740/lnurlauth \
 -u :<phoenixd_api_password> \
 -d lnurl=lnurl1dp68gurn8ghj7um5v93kketj9ehx2amn9ashq6f0d3hxzat5dqlhgct884kx7emfdcnxkvfav3nxxcehxyckvdrpxsexyden8qexywrpv33nvdmpxsukzdpnvgungct9xesnvcf3x9jnsenxvvurvcmzvd3rwdfevgmnwdpjxp3nqvg50j329
```
Response

authentication success
