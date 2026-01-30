# Referencia de la API

A continuación se muestra una referencia para la API de `phoenixd`, actualizada para la versión `0.7.2`.

## Seguridad

⚠️ Esta API debe estar protegida. Da acceso a tus fondos. Eres responsable de protegerla. Específicamente, esta API no debe ser accesible desde el mundo exterior.

La API utiliza un esquema de autenticación Básica. Las contraseñas se generan en el primer inicio (ver `~/.phoenix/phoenix.conf`).

**Contraseña principal**

`http-password` es la contraseña principal y da acceso a todos los puntos finales de la API.

**Contraseña secundaria**

`http-password-limited-access` es menos sensible que la contraseña principal, pero aun así no debe compartirse, ya que otros ataques son posibles, por ejemplo, agotamiento de recursos creando millones de facturas, etc...

Los siguientes puntos finales no están disponibles con esta contraseña secundaria: `payinvoice`, `payoffer`, `paylnaddress`, `lnurlpay`, `lnurlauth`, `sendtoaddress`, `closechannel`, `export`.

## Crear factura Bolt11

**Punto final**

`POST /createinvoice`

**Descripción**

Crea una factura Bolt11 con una descripción.

Una factura Bolt11 es una solicitud de pago para Lightning no reutilizable y con fecha de caducidad, muy adecuada para un flujo de pago minorista. Solo se puede pagar una vez.

**Parámetros**

- `description` la descripción de la factura (máx. 128 caracteres).
  - o en su lugar `descriptionHash` hash sha256 de una descripción.
- `amountSat` (opcional) la cantidad solicitada por la factura, en satoshi. Si no se establece, la factura se puede pagar por cualquier cantidad.
- `expirySeconds` (opcional) la caducidad de la factura en segundos, por defecto 3600 (1 hora).
- `externalId` (opcional) un identificador personalizado. Úsalo para vincular la factura a un sistema externo.
- `webhookUrl` (opcional) una URL de webhook que será notificada cuando este pago específico haya sido recibido. Esta notificación se realiza además de los [#webhook](webhooks normales) definidos en la configuración. Este webhook está autenticado.

**Ejemplo de código**

```sh
$ curl -X POST http://localhost:9740/createinvoice \
    -u :YOUR_PHOENIXD_PASSWORD \
    -d description='mi primera factura' \
    -d amountSat=100 \
    -d externalId=foobar \
    -d webhookUrl='https://my.webhook.net'
```

**Respuesta**

```json
{
  "amountSat": 100,
  "paymentHash": "f419207c9edde9021ebfb6bd0df6bd0a6606ecaf935357cc2f362e30835c3765",
  "serialized": "lntb1u1pjlsjnqpp57svjqly7mh5sy84lk67sma4apfnqdm90jdf40np0xchrpq6uxajscqpjsp592kp0fs2ssgpq9h54tsfaj5w34287v8fezgaw6cr56f076c05glq9q7sqqqqqqqqqqqqqqqqqsqqqqqysgqdq6d4ujqenfwfehggrfdemx76trv5mqz9grzjqwfn3p9278ttzzpe0e00uhyxhned3j5d9acqak5emwfpflp8z2cnflcyamh4dcuhwqqqqqlgqqqqqeqqjqnjpjvnv0p3wvwc6vhzkkgm8kl9r837x4p9qupk5ln5tqlm7prrlsy5xd8cf5agae64f53dvm9el0z5hvgcnta4stgmrg7zwfah0nqrqph4ts8l"
}
```

## Crear oferta Bolt12

**Punto final**

`POST /createoffer`

**Descripción**

Crea una oferta Bolt12 con una descripción y cantidad opcionales.

Una oferta es una solicitud de pago estática y reutilizable que no caduca. Se puede pagar muchas veces. Es muy adecuada para donaciones o propinas.

Nota: también hay disponible una llamada `getoffer` pero está obsoleta. Este punto final `getoffer` devuelve una oferta, pero siempre la misma. En su lugar, se debe usar `createoffer`.

**Parámetros**

- description (opcional) la descripción de la oferta (máx. 128 caracteres).
- amountSat (opcional) la cantidad solicitada por la oferta, en satoshi. Si no se establece, la oferta se puede pagar por cualquier cantidad.

**Ejemplo de código**

```sh
$ curl -X POST http://localhost:9740/createoffer \
    -u :YOUR_PHOENIXD_PASSWORD \
    -d description='una oferta para Pierre' \
    -d amountSat=100
```

**Respuesta**

```
lno1qgsyxjtl6luzd9t3pr62xr7eemp6awnejusgf6gw45q75vcfqqqqqqqgqvqcdgq2zdskugr0venx2u3qvehhygzsd9jhyun9zrhq8yecsj40r443pquhuhh7tjrteukce2xj7uqwm2vahys5lsn39vf5q2fyfxsw6xn824393en87nre87xcectkgcj85trcu5hn9r9703645qsrxtcq785whraquh5atw89w5scg707fz23405ygk7jn9uek3tkmvdqqvc8yz8xm2yme6hjx3x02csmq6pfzaejqr3kzg7u8am96txu95z8am8zgvfvfcnzk27ylwk43ut48xv2vrkhqtj3wes32glw5ft5h7f4p8ytwey4cqjsks55zcmr3hka0p8e50thjqpjytmt5wsa4ylhavdmewv7jmj2ppy9daujfmfvpmnw9cf75cymjffzh2nafn883vsqr3a8u2l797mayh3p
```

## Obtener dirección Lightning

**Punto final**

`GET /getlnaddress`

**Descripción**

Obtiene una dirección Lightning BIP-353 del LSP. Solo funciona si tienes un canal.

Nota: también puedes usar servicios de terceros o auto-alojar la dirección.

**Ejemplo de código**

```sh
$ curl http://localhost:9740/getlnaddress \
    -u :YOUR_PHOENIXD_PASSWORD
```

**Respuesta**

```
₿purplecrocus03@phoenixwallet.me
```

## Pagar factura Bolt11

**Punto final**

`POST /payinvoice`

**Descripción**

Paga una factura Lightning BOLT11. Se aplica una tarifa del 0.4%. La respuesta incluye el paymentId interno para ese pago.

**Parámetros**

- `amountSat` cantidad opcional en satoshi. Si no se establece, se pagará la cantidad solicitada en la factura.
- `invoice` factura BOLT11

**Ejemplo de código**

```sh
$ curl -X POST http://localhost:9740/payinvoice \
    -u :YOUR_PHOENIXD_PASSWORD \
    -d amountSat=1 \
    -d invoice=lntb10n1pjl3pmlpp5jkrt9qvl83knc0sg0xztjlw0fd6t40725hdyh3pq0arudswvw8sqcqpjsp5zsc4phrg5v6nl84wkd9vuqzlva22j2qwll28v37y9jgjs7ap2dxs9q7sqqqqqqqqqqqqqqqqqqqsqqqqqysgqdq4xysyymr0vd4kzcmrd9hx7mqz9grzjqwfn3p9278ttzzpe0e00uhyxhned3j5d9acqak5emwfpflp8z2cnfl6h8msfh3505gqqqqlgqqqqqeqqjq6f8fhkj0uma7m68arjj3m5gn339xh3m5fn4qj9r9xu550686m0y8kadeahnn02ucmyq9nfsj0vl5vhpl6g7h6fs8xa8wu2qr3yc6a2gp4h32vu
```

**Respuesta**

```json
{
    "recipientAmountSat": 1,
    "routingFeeSat": 4,
    "paymentId": "961d413c-91ca-4f3d-9d91-760a08405901",
    "paymentHash": "9586b2819f3c6d3c3e087984b97dcf4b74babfcaa5da4bc4207f47c6c1cc71e0",
    "paymentPreimage": "6a3e65d9a05113864c9c27e430cc99751359ccbfa8fd5869aea46405df657986"
}
```

## Pagar oferta Bolt12

**Punto final**

`POST /payoffer`

**Descripción**

Paga una oferta Lightning BOLT12. Se aplica una tarifa del 0.4%. La respuesta incluye el paymentId interno para ese pago.

**Parámetros**

- `amountSat` cantidad opcional en satoshi. Si no se establece, se pagará la cantidad solicitada en la factura.
- `offer` oferta BOLT12
- `message` un mensaje opcional para el destinatario

**Ejemplo de código**

```sh
$ curl -X POST http://localhost:9740/payoffer \
    -u :YOUR_PHOENIXD_PASSWORD \
    -d amountSat=123 \
    -d offer=lno1qgsyxjtl6luzd9t3pr62xr...9ry9zqagt0ktn4wwvqg52v9ss9ls22sqyqqestzp2l6decpn87pq96udsvx \
    -d message='👋 ¡Hola!'
```

**Respuesta**

```json
{
  "recipientAmountSat": 123,
  "routingFeeSat": 4,
  "paymentId": "889c26f1-3028-4fae-9bd9-130c6e93542f",
  "paymentHash": "54ed3cadcd102a475f7e7bd25a89223b46514df72c01c4fa9880aed7a795eb16",
  "paymentPreimage": "09820bd4915f91ab21377879d5182c1bcf35feabdda5933266a99b4126f32b9b"
}
```

## Pagar dirección Lightning

**Punto final**

`POST /paylnaddress`

**Descripción**

Paga una dirección Lightning similar a un correo electrónico, ya sea basada en BIP-353 o LNURL. Se aplica una tarifa del 0.4%. La respuesta incluye el paymentId interno para ese pago.
Parámetros

- `amountSat` cantidad opcional en satoshi. Si no se establece, se pagará la cantidad solicitada en la factura.
- `address` factura BOLT11
- `message` un mensaje opcional para el destinatario

**Ejemplo de código**

```sh
$ curl -X POST http://localhost:9740/paylnaddress \
    -u :YOUR_PHOENIXD_PASSWORD \
    -d amountSat=123 \
    -d address=flashybugle70@testnet.phoenixwallet.me \
    -d message='👋 ¡Hola!'
```

**Respuesta**

```json
{
  "recipientAmountSat": 123,
  "routingFeeSat": 4,
  "paymentId": "a9b1b8f8-bfdb-4299-9979-18e616bc9259",
  "paymentHash": "bfa554308df2f397cd23ba724316660aaa398b2044b3e4e15ed79b8f2b278679",
  "paymentPreimage": "dc4a8e059599d464d9ea10dfc0ffe6ad23a898c897c42dad973716e85c26a920"
}
```

## Pagar en cadena

**Punto final**

`POST /sendtoaddress`

**Descripción**

Envía parte de tu saldo actual a una dirección de Bitcoin. El canal dividido no se cierra y permanece activo. Devuelve el id de la transacción si la división fue exitosa.

**Parámetros**

- `amountSat` cantidad en satoshi
- `address` dirección de Bitcoin a donde se enviarán los fondos
- `feerateSatByte` tasa de tarifa en satoshi por vbyte

**Ejemplo de código**

```sh
$ curl -X POST http://localhost:9740/sendtoaddress \
  -u :YOUR_PHOENIXD_PASSWORD \
  -d amountSat=100000 \
  -d address=tb1qwnp38xc5qh35ch9l5p6a3r7kwupj9rw5a4jn3y \
  -d feerateSatByte=12
```

**Respuesta**

```
05a28b4972560655eeedaaf72c4d8e9f1a285e47e2d347734853b5e49ae9ead0
```

## Aumentar tarifa

**Punto final**

`POST /bumpfee`

**Descripción**

Hace que todas tus transacciones no confirmadas usen una tasa de tarifa más alta, usando CPFP. Devuelve el ID de la transacción hija.

**Parámetros**

- `feerateSatByte` tasa de tarifa, en satoshi por vbyte.

**Ejemplo de código**

```sh
$ curl -X POST http://localhost:9740/bumpfee \
  -u :YOUR_PHOENIXD_PASSWORD \
  -d feerateSatByte=11
```

**Respuesta**

```
758b3df67c62c9cd9ebbde1ff6eaadc1c51f94d5b1a3efb2548236b9a6f1c659
```

## Listar pagos entrantes

**Punto final**

`GET /payments/incoming`

**Descripción**

Lista los pagos entrantes.


**Parámetros**

- `from`: marca de tiempo de inicio en milisegundos desde la época, por defecto 0
- `to`: marca de tiempo de fin en milisegundos desde la época, por defecto ahora
- `limit`: número de pagos en la página, por defecto 20
- `offset`: desplazamiento de página, por defecto 0
- `all`: también devuelve facturas no pagadas
- `externalId`: solo incluye pagos que usan este id externo.

**Ejemplo de código**

```sh
$ curl 'http://localhost:9740/payments/incoming?all=true&limit=3&offset=2' \
	-u :YOUR_PHOENIXD_PASSWORD
```

**Respuesta**

```json
[
  {
    "type": "incoming_payment",
    "subType": "lightning",
    "paymentHash": "5307f75da2a466d75c43593f45d4452853ba745860c008c61d3d0d0f24789b6d",
    "preimage": "bfad93c6eff005d7d130a3a88fa7be269da26861063c20ad41e935fd5d174c3f",
    "description": "1000 sat expiry 100s",
    "invoice": "lntb10u1p5960u8pp52vrlwhdz53ndwhzrtyl5t4z99pfm5azcvrqq33sa85xs7frcndkscqzyssp58hpyavx3r39l6z9gnvtxv9pwfc52j2yk2dakxf4rtstfus369f7s9q7sqqqqqqqqqqqqqqqqqqqsqqqqqysgqdpqxycrqvpqwdshggr90pcxjuneyqcnqvrnmqz9gxqzryrzjqwfn3p9278ttzzpe0e00uhyxhned3j5d9acqak5emwfpflp8z2cnfll283f990e4ksqqqqlgqqqqqeqqjqdan93rk672ttjqdpgfznf48zwmw9ustqxt8wsgdxrvqddzwt0pcpwpxfdw6fk3h7yjc4xyhsq4yvslgrce368szx0vp2ev85ph2agvgpr4vfcq",
    "isPaid": false,
    "isExpired": true, // <--- la factura ha caducado y ya no se puede pagar
    "requestedSat": 1000,
    "receivedSat": 0,
    "fees": 0,
    "expiresAt": 1750941675827,
    "createdAt": 1750941575827
  },
  {
    "type": "incoming_payment",
    "subType": "lightning",
    "paymentHash": "595a3f4824254c6fdbf0b07ba5bcc3953abbdce94e583085683d102e5e85338a",
    "preimage": "ccfbc77a825d37a4f82b3a4ff3f278e92a46e232e7310efd5836a6bccf845528",
    "description": "1000 sat expiry 250s",
    "invoice": "lntb10u1p596skepp5t9dr7jpyy4xxlklskpa6t0xrj5athh8ffevrpptg85gzuh59xw9qcqzyssp59pl95q6y5gxtq75tf5nha039g2n0tx4w47qmxt4mkjhsxa29tlss9q7sqqqqqqqqqqqqqqqqqqqsqqqqqysgqdpqxycrqvpqwdshggr90pcxjuneyqer2vrnmqz9gxqz86rzjqwfn3p9278ttzzpe0e00uhyxhned3j5d9acqak5emwfpflp8z2cnfll283f990e4ksqqqqlgqqqqqeqqjq5u3svgk4j6hp2s6vyr4c7uawht0wnpplhnnmljmyzjr9r7a4qxd89anlgztszfvvczuvvqscmuaexajzjfc7wzsf46gzlqr2c24duyspfhymvf",
    "isPaid": true,
    "isExpired": false,
    "requestedSat": 1000,
    "receivedSat": 1050, // <--- Factura pagada en exceso. El exceso de pago es receivedSat - requestedSat = 50 sat
    "fees": 0,
    "expiresAt": 1750942676001,
    "completedAt": 1750942477605,
    "createdAt": 1750942426001
  },
  {
    "type": "incoming_payment",
    "subType": "lightning",
    "paymentHash": "1399476fe927fd02523ae203d05e3badeb27ee951c4d5dfdd06ba7f2d713864f",
    "preimage": "a17e7be515418882adf36fbafae20d5bcf6e17bf17b6e08a1b4b5912e537574a",
    "description": "amountless invoice",
    "invoice": "lntb1p5963w3pp5zwv5wmlfyl7sy536ugpaqh3m4h4j0m54r3x4mlwsdwnl94cnse8scqzyssp5tc5jtzk7q7u4yfpa745p7rkuujw5cz5ytntj48z4fhetaguwr7js9q7sqqqqqqqqqqqqqqqqqqqsqqqqqysgqdqav9kk7atww3kx2umnyp5kuan0d93k2mqz9gxqyz5vqrzjqwfn3p9278ttzzpe0e00uhyxhned3j5d9acqak5emwfpflp8z2cnfll283f990e4ksqqqqlgqqqqqeqqjqgh7ctek00wl7d3e2syhjdgmlms3e7pkvjskxnu0p8rsdn52dlmgjtzw7s8y6uvdeft66053s593m92a5auj99gfdm8tng7a4v5wjyvqpx629fv",
    "isPaid": true,
    "isExpired": false,
    "receivedSat": 1500,
    "fees": 0,
    "expiresAt": 1751029585548,
    "completedAt": 1750943212490,
    "createdAt": 1750943185548
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

## Obtener pago entrante

**Punto final**

`GET /payments/incoming/{paymentHash}`

**Ejemplo de código**

```sh
$ curl http://localhost:9740/payments/incoming/1399476fe927fd02523ae203d05e3badeb27ee951c4d5dfdd06ba7f2d713864f \
	-u :YOUR_PHOENIXD_PASSWORD
```

**Respuesta**

```json
{
    "type": "incoming_payment",
    "subType": "lightning",
    "paymentHash": "1399476fe927fd02523ae203d05e3badeb27ee951c4d5dfdd06ba7f2d713864f",
    "preimage": "a17e7be515418882adf36fbafae20d5bcf6e17bf17b6e08a1b4b5912e537574a",
    "description": "amountless invoice",
    "invoice": "lntb1p5963w3pp5zwv5wmlfyl7sy536ugpaqh3m4h4j0m54r3x4mlwsdwnl94cnse8scqzyssp5tc5jtzk7q7u4yfpa745p7rkuujw5cz5ytntj48z4fhetaguwr7js9q7sqqqqqqqqqqqqqqqqqqqsqqqqqysgqdqav9kk7atww3kx2umnyp5kuan0d93k2mqz9gxqyz5vqrzjqwfn3p9278ttzzpe0e00uhyxhned3j5d9acqak5emwfpflp8z2cnfll283f990e4ksqqqqlgqqqqqeqqjqgh7ctek00wl7d3e2syhjdgmlms3e7pkvjskxnu0p8rsdn52dlmgjtzw7s8y6uvdeft66053s593m92a5auj99gfdm8tng7a4v5wjyvqpx629fv",
    "isPaid": true,
    "isExpired": false,
    "receivedSat": 1500,
    "fees": 0,
    "expiresAt": 1751029585548,
    "completedAt": 1750943212490,
    "createdAt": 1750943185548
}
```

## Listar pagos salientes

**Punto final**

`GET /payments/outgoing`

**Descripción**

Lista los pagos salientes.

**Parámetros**

- `from`: marca de tiempo de inicio en milisegundos desde la época, por defecto 0
- `to`: marca de tiempo de fin en milisegundos desde la época, por defecto ahora
- `limit`: número de pagos en la página, por defecto 20
- `offset`: desplazamiento de página, por defecto 0
- `all`: también devuelve pagos que han fallado

**Ejemplo de código**

```sh
$ curl 'http://localhost:9740/payments/outgoing?all=true&limit=3&offset=2' \
	-u :YOUR_PHOENIXD_PASSWORD
```

**Respuesta**

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

## Obtener pago saliente

**Punto final**

`GET /payments/outgoing/{paymentId}`

`GET /payments/outgoingbyhash/{paymentHash}`

**Ejemplo de código**

```sh
# por uuid
$ curl http://localhost:9740/payments/outgoing/dddfb160-f5dc-4930-b0d9-bc7a2ebf7b21 \
	-u :YOUR_PHOENIXD_PASSWORD
```

```sh
# por hash de pago
$ curl http://localhost:9740/payments/outgoingbyhash/9727389e1c776f4efb315c4effae02affcb723883d13433ea74cc9e3f2034a93 \
	-u :YOUR_PHOENIXD_PASSWORD
```

**Respuesta**

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

## Exportación CSV

**Punto final**

`POST /export`

**Descripción**

Exporta tu historial de pagos exitosos en un archivo CSV. Devuelve la ruta del archivo generado en tu sistema de archivos.

El CSV resultante permite un seguimiento preciso del saldo y el crédito de tarifa, y muestra la división entre las tarifas de minería y de servicio:

- `balance`: suma de todos los amount_msat
- `fee credit`: suma de todos los fee_credit_msat

**Parámetros**

- `from`: marca de tiempo de inicio en milisegundos desde la época, por defecto 0
- `to`: marca de tiempo de fin en milisegundos desde la época, por defecto ahora

**Ejemplo de código**

```sh
$ curl http://localhost:9740/export \
	-u :YOUR_PHOENIXD_PASSWORD
```

**Respuesta**

```
el historial de pagos ha sido exportado a /Users/foobar/.phoenix/exports/export-1729249806.csv
```

## Websocket de pagos

**Punto final**

`WS /websocket`

**Descripción**

Transmite JSON de los pagos recibidos.

La carga útil de JSON contendrá un campo de tipo (por ahora, solo "payment_received") y otros datos técnicos. Puede contener un externalId si se proporcionó uno cuando se creó la factura, o el payerKey/payerNote para las ofertas.

**Autenticación**

La autenticación se puede realizar con autenticación básica o con el encabezado Sec-WebSocket-Protocol.

**Ejemplo de Websocket**

Usando websocat, una utilidad de línea de comandos para websocket:

```sh
$ websocat --basic-auth :YOUR_PHOENIXD_PASSWORD ws://127.0.0.1:9740/websocket
{ "type": "payment_received", "amountSat": 15, "payerNote": "hola 👋", "payerKey": "02ad95a81c1865ddb41a49f07b11a70b3f8fcd68ae161e0eb561a074f6a223ff84", "paymentHash": "5ad2185b67c6ba2e65987ab22abf5b4f8c25049d1a3b5dda76f050bc7726aab3" }
{ "type": "payment_received", "amountSat": 30, "payerKey": "02ad95a81c1865ddb41a49f07b11a70b3f8fcd68ae161e0eb561a074f6a223ff84", "paymentHash": "604def4dd6846ea6373ba27353b229ddb31ca1cb206d4becf95f82a0df4b8cfc" }
```

## Webhook
Cuando se recibe un pago, phoenixd ejecutará una solicitud HTTP POST a los puntos finales de tu elección, si hay alguno configurado en los ajustes de phoenix.conf. Usa este mecanismo de webhook para notificar a un sistema externo que se recibió un pago con éxito.

Notas:

- El punto final del webhook debe ser https, pero Phoenixd no lo exige.

- Para notificar a un webhook específico para un pago específico, usa el parámetro webhookUrl en su lugar al crear la factura.

- La carga útil de JSON es similar a los eventos de websocket.

- La llamada se autentica con un encabezado personalizado.

**Ejemplo de configuración**

```sh
# en ~/.phoenix/phoenix.conf
webhook=https://webhook.site/aaaaaaaa-bbbb-xxxx-yyyy-zzzz
# puedes tener múltiples webhooks, todos serán notificados
webhook=https://anotherwebhook.com
```

**Ejemplo de Webhook**

```sh
$ curl -X POST https://webhook.site/aaaaaaaa-bbbb-xxxx-yyyy-zzzz \
    --header 'accept: application/json' \
    --header 'accept-charset: UTF-8' \
    --header 'content-type: application/json' \
    --header 'host: webhook.site' \
    --header 'X-Phoenix-Signature: 91a8735c0cc3cfc4bb0f22044dcac78f2b67ed3935261f1564b78f971a015f2d' \
    --data $'{
        "type": "payment_received",
        "timestamp": 1748269006918,
        "amountSat": 1,
        "paymentHash": "7db610f2b418394f12ba84927868a4b98e6bca6a82dd644c905f4f0c257d336a",
        "externalId": null,
        "payerNote": null,
        "payerKey": null
    }'
```

## Autenticación de Webhook

Las llamadas de Webhook se autentican con un encabezado `X-Phoenix-Signature`, que contiene la firma HMAC-SHA256 de todo el cuerpo JSON de la llamada, codificado en utf-8, utilizando el parámetro de configuración `webhook-secret`, también codificado en utf-8:

```
X-Phoenix-Signature = hmacSha256(
  msg = <cuerpo completo del http post codificado como utf8>
  secret = <webhook-secret de phoenix.conf>
)
```

Esto le permite verificar que la llamada del webhook es genuina.

**Ejemplo**

Dado este cuerpo json:

```json
{
    "type": "payment_received",
    "timestamp": 1712785550079,
    "amountSat": 8,
    "paymentHash": "e628f8a516e9d3ee5e212a675f8d0c9dc5e7a5d500c5f4f91c62e9e921492653",
    "externalId": null
}
```

y este secreto:

```
# en phoenix.conf
webhook-secret: ef72d3b96324106dfbf83f2a4efeff7dddb4ce923e9664cb56baf34cc52936b6
```

La firma resultante será:

```
X-Phoenix-Signature: 77ffc40401024fb417e45fdd002de06bdbf3b48b90d09d05cccd06462920aed7
```

## Obtener información del nodo

**Punto final**

`GET /getinfo`

**Ejemplo de código**

```sh
$ curl http://localhost:9740/getinfo \
    -u :YOUR_PHOENIXD_PASSWORD
```

**Respuesta**

```json
{
  "nodeId": "023a882b070d0b9b1c8db2975f2dcc65d1ffa22e00085506ab24799d6d95d658a2",
  "channels": [
    // una lista compacta de tus canales
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

## Obtener saldo

**Punto final**

`GET /getbalance`

**Ejemplo de código**

```sh
$ curl http://localhost:9740/getbalance \
    -u :YOUR_PHOENIXD_PASSWORD
```

**Respuesta**

```json
{
  "balanceSat": 104228,
  "feeCreditSat": 391
}
```

## Listar canales

**Punto final**

`GET /listchannels`

**Ejemplo de código**

```sh
$ curl http://localhost:9740/listchannels \
    -u :YOUR_PHOENIXD_PASSWORD
```

**Respuesta**

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
                    "fundingKeyPath": "m/2147483553'\/2147483543'\/2143050548'\/2147483562'\/2147462237'\/2147483597'\/2147478557'\/2147483611'\/0\'",
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
            "htlcMaximumMsat": 1252708000
        },
        ...
    }
]
```

## Cerrar canal

**Punto final**

`POST /closechannel`

**Descripción**

Cierra un canal dado y envía todos los fondos a una dirección en cadena. Devuelve el ID de la transacción de cierre.

Atención: cerrar un canal es final, no se puede cancelar.

**Parámetros**

- `channelId` identificador del canal a cerrar
- `address` dirección de bitcoin a donde se enviará tu saldo
- `feerateSatByte` tasa de tarifa en satoshi por vbyte

**Ejemplo de código**

```sh
$ curl -X POST http://localhost:9740/closechannel \
 -u :YOUR_PHOENIXD_PASSWORD \
 -d channelId=1943e03b85c06c60678ecc0fefcae8317f0a1429838aaeed1c9df4e548d7c29c \
 -d feerateSatByte=10 \
 -d address=tb1qrhv88h2rf7wscut7st3ha5uspx2njjr7xdzn5t
```

**Respuesta**

```
758b3df67c62c9cd9ebbde1ff6eaadc1c51f94d5b1a3efb2548236b9a6f1c659
```
## Decodificar factura

**Punto final**

`POST /decodeinvoice`

**Parámetros**

invoice una factura Bolt11

**Ejemplo de código**

```sh
$ curl -X POST http://localhost:9740/decodeinvoice \
 -u :YOUR_PHOENIXD_PASSWORD \
 -d invoice=lntb10n1pngtqfhpp5qezkef9tussdxurernxpmur9fzm2g0gqjuffaypvd2r7ma8urh4scqpjsp5u3dgmgrry4advuse35al6d2j2ns9uewequpuwcf8eun0pk7m5lms9q7sqqqqqqqqqqqqqqqqqqqsqqqqqysgqdq4xysyymr0vd4kzcmrd9hx7mqz9grzjqwfn3p9278ttzzpe0e00uhyxhned3j5d9acqak5emwfpflp8z2cnfl6h8msfh3505gqqqqlgqqqqqeqqjq3krntmn2r4d8j0ncgztxkssymfpwy3lv48jt5zgq5te8c5h56r6r03a2nz09nye89pmyhncm64ppwcufntar2zs5m4jw2cfm8u9m3usqxju37k
```

**Respuesta**

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
**Respuesta**

```json
{
    "chain": "mainnet",
    "chainHashes": [
        "43497fd7f826957108f4a30fd9cec3aeba79972084e90ead01ea330900000000"
    ],
    "path": [
        {
            "introductionNodeId": {
                "publicKey": "03933884aaf1d6b108397e5efe5c86bcf2d8ca8d2f700eda99db9214fc2712b134"
            },
            "blindingKey": "021aeddbf39bf6e9a69bf331c7a5a524a55efaffd6643c127f66378d0ace9529f4",
            "blindedNodes": [
                {
                    "blindedPublicKey": "0339e5efc9f4935ae8f84f6db02abf2450422e1fe8ac2e2080f479b1eccf37e1a7",
                    "encryptedPayload": "9361a42a22f03b70d5039b8f53db5a2e81b83079fe4301d0284b7c18b2ceba42d4b43c168672593ba126d32b88cafdf49c49e7"
                },
                {
                    "blindedPublicKey": "031448f2aa7355336a93fe304a4e14642881d42df65ceae73008a2985840bf8295",
                    "encryptedPayload": "00cc1620abfa6e70199fc10175c6c186"
                }
            ]
        }
    ]
}
```

## Estimar tarifas de liquidez

**Punto final**

`POST /estimateliquidityfees`

**Descripción**

Estima una tarifa de liquidez para una cantidad dada. Ten en cuenta que depende de la tasa de tarifa de minería actual, que es volátil. La estimación devuelta es el costo total y no tiene en cuenta ningún crédito de tarifa que puedas tener.

**Parámetros**

- `amountSat` la cantidad de liquidez, en satoshi.

**Ejemplo de código**

```
$ curl -X POST http://localhost:9740/estimateliquidityfees \
 -u :YOUR_PHOENIXD_PASSWORD \
 -d amountSat=2000000
```

**Respuesta**

```json
{
"miningFeeSat": 1219,
"serviceFeeSat": 20000
}
```
## LNURL Pay

**Descripción**

Paga un recurso LNURL-pay. Ten en cuenta que el servicio puede aplicar restricciones sobre la cantidad a pagar o el mensaje -- el flujo de lnurl-pay suele ser interactivo.
Punto final

`POST /lnurlpay`

**Parámetros**

- `amountSat` la cantidad a pagar
- `lnurl` el recurso lnurl-pay
- `message` un comentario para el destinatario

**Ejemplo de código**

```sh
$ curl -X POST http://localhost:9740/lnurlpay \
 -u :YOUR_PHOENIXD_PASSWORD \
 -d lnurl=LNURL1DP68GURN8GHJ7MRWW4EXCTNXD9SHG6NPVCHXXMMD9AKXUATJDSKHQCTE8AEK2UMND9HKU0TZV9JR2VM9XV6RVV3JVSUNWDRYXUCNVDFHV43KVE3KXQCRJDFHX33XGDENX9NRSVTRXCENVC3KV33NGWR9XQURWC3N8YEN2WP4V4JNZV8XSUH \
 -d amountSat=100
```

**Respuesta**

```json
    {
    "recipientAmountSat": 100,
    "routingFeeSat": 4,
    "paymentId": "2ff3c4f2-1d97-4dc0-a522-371591c058dc",
    "paymentHash": "6a0084471b2020373a89a81b5f7e34135154f24208e491d0122d99a686b1d58d",
    "paymentPreimage": "5746edcdbf872fc508939f31f18998f294d579668f334a023804b992b0fe4842"
    }
```

## LNURL Withdraw

**Descripción**

Retira fondos de un servicio LNURL. Phoenixd retirará la cantidad máxima autorizada por el servicio.
Punto final

`POST /lnurlwithdraw`

**Parámetros**

- `lnurl` el recurso lnurl-withdraw

**Ejemplo de código**

```sh
$ curl -X POST http://localhost:9740/lnurlpay \
 -u :YOUR_PHOENIXD_PASSWORD \
 -d lnurl=lightning:LNURL1DP68GURN8GHJ7MRWW4EXCTNXD9SHG6NPVCHXXMMD9AKXUATJDSKHW6T5DPJ8YCTH8AEK2UMND9HKU0T9893XYVF5XQMX2EP4VYCNJWR9X56RSCEE893NYVP3VC6KGEPNX5UNGDFCV9NRJDNXXCMNXENZXPJXVCFS89NRWVFJXYCNXD3K89JNGAXMZVT
```

**Respuesta**

```json
{
    "url": "https://lnurl.fiatjaf.com/lnurl-withdraw?session=e9bb1406ed5a198e548c99c201f5dd359458af96f673fb0dfa09f712113669e4",
    "minWithdrawable": 1000,
    "maxWithdrawable": 4000,
    "description": "ejemplo de retiro",
    "k1": "1649e2443dd004421e05e08a17e52ee1454e9f74aacedacc822777b9ff4ffbfb",
    "invoice": "lnbc40n1pnfqpstpp5npnnapuxylxelsat27q4dncgj...2f0tvfw33kspxfenxx"
}
```

## LNURL Auth

**Descripción**

Autentica un recurso LNURL-auth para permitir una acción en un servicio remoto. Ver LUD-04 para más detalles.

Nota: La clave utilizada para firmar se deriva de la clave de la cartera (la derivación depende del dominio del servicio lnurl). Si tienes diferentes usuarios usando la misma instancia de phoenixd, ¡no les permitas usar esto o compartirán la misma firma y clave pública!

**Punto final**

`POST /lnurlauth`

**Parámetros**

- `lnurl` el recurso lnurl-auth

**Ejemplo de código**

```sh
$ curl -X POST http://localhost:9740/lnurlauth \
 -u :YOUR_PHOENIXD_PASSWORD \
 -d lnurl=lnurl1dp68gurn8ghj7um5v93kketj9ehx2amn9ashq6f0d3hxzat5dqlhgct884kx7emfdcnxkvfav3nxxcehxyckvdrpxsexyden8qexywrpv33nvdmpxsukzdpnvgungct9xesnvcf3x9jnsenxvvurvcmzvd3rwdfevgmnwdpjxp3nqvg50j329
```

**Respuesta**

autenticación exitosa

```