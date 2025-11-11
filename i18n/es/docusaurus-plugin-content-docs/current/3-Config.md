---
slug: /Config
---

# Banderas Útiles de phoenixd

**Términos de servicio** (Bandera oculta) Acepta los términos de servicio, evitando el aviso interactivo en la primera ejecución.

- Bandera: `--agree-to-terms-of-service`

**Cadena** Especifica la cadena de Bitcoin a usar. Por defecto es mainnet.

- Bandera: `--chain <mainnet|testnet>`
- Config: `chain=mainnet`

**URL de Mempool Space** Establece una URL de instancia de mempool.space personalizada.

- Bandera: `--mempool-space-url <URL>`
- Config: `mempool-space-url="https://mempool.space"`

**Intervalo de sondeo de Mempool Space** (Bandera oculta) Define con qué frecuencia se consulta la API de mempool.space (en minutos). Por defecto es 10 minutos.

- Bandera: `--mempool-space-polling-interval-minutes <minutos>`
- Config: `mempool-space-polling-interval-minutes=10`

### Opciones de Liquidez:

**Liquidez Automática** Establece la cantidad solicitada automáticamente cuando se necesita liquidez entrante. Por defecto es 2m (2,000,000 satoshis).

- Bandera: `--auto-liquidity <off|2m|5m|10m>`
- Config: `auto-liquidity=2m`

**Tarifa Máxima de Minería** Establece la tarifa de minería máxima para operaciones en cadena en satoshis. Restringido de 5,000 a 200,000 satoshis. Por defecto es el 1% de la cantidad de `--auto-liquidity`.

- Bandera: `--max-mining-fee <satoshis>`
- Config: `max-mining-fee=5000`

**Crédito Máximo de Tarifa** Establece el crédito de tarifa máximo. Si se alcanza, los pagos serán rechazados. Por defecto es 100k (100,000 satoshis).

- Bandera: `--max-fee-credit <off|50k|100k>`
- Config: `max-fee-credit=100k`

**Porcentaje Máximo de Tarifa Relativa** (Bandera oculta) Establece la tarifa relativa máxima para operaciones en cadena en porcentaje. Restringido de 1 a 50. Por defecto es 30.

- Bandera: `--max-relative-fee-percent <porcentaje>`
- Config: `max-relative-fee-percent=30`

### Opciones HTTP:

**IP de Enlace HTTP** Especifica la dirección IP a la que se vinculará la API HTTP. Por defecto es 127.0.0.1.

- Bandera: `--http-bind-ip <dirección_IP>`
- Config: `http-bind-ip=127.0.0.1`

**Puerto de Enlace HTTP** Establece el puerto para la API HTTP. Por defecto es 9740.

- Bandera: `--http-bind-port <número_de_puerto>`
- Config: `http-bind-port=9740`

**Contraseña HTTP** Establece la contraseña para el acceso completo a la API HTTP. Si no se proporciona, se generará una contraseña por defecto.

- Bandera: `--http-password <contraseña>`
- Config: `http-password="your_password"`

**Contraseña HTTP de Acceso Limitado** Establece la contraseña para el acceso limitado a la API HTTP. Si no se proporciona, se generará una contraseña por defecto.

- Bandera: `--http-password-limited-access <contraseña>`
- Config: `http-password-limited-access="your_password"`

**URL de Webhook** Especifica un punto final HTTP de webhook para notificaciones push. Se puede usar varias veces para múltiples webhooks.

- Bandera: `--webhook <URL>`
- Config: `webhook="https://example.com/webhook"`

**Secreto de Webhook** Establece el secreto utilizado para autenticar las llamadas de webhook. Si no se proporciona, se generará un secreto por defecto.

- Bandera: `--webhook-secret <secreto>`
- Config: `webhook-secret="your_secret"`

### Opciones de Semilla:

**Semilla** Proporciona explícitamente una semilla mnemónica de 12 palabras. Úsalo con extrema precaución, ya que esto expondrá tu semilla en texto plano.

- Bandera: `--seed <mnemónico_de_12_palabras>`

**Ruta de la Semilla** Sobrescribe la ruta por defecto al archivo de semilla (por defecto es `datadir/seed.dat`).

- Bandera: `--seed-path <ruta_al_archivo_de_semilla>`

### Opciones de Registro:

**Tamaño de Rotación de Registro** Establece el tamaño de rotación del archivo de registro en megabytes. Por defecto es 10 MB.

- Bandera: `--log-rotate-size <MB>`
- Config: `log-rotate-size=10`

**Máximo de Archivos de Rotación de Registro** Establece el número máximo de archivos de registro a mantener. Por defecto es 5.

- Bandera: `--log-rotate-max-files <número>`
- Config: `log-rotate-max-files=5`

**Silencioso** Establece el nivel de verbosidad a silencioso (sin salida en la consola).

- Bandera: `--silent`
- Config: `silent=true`

**Verboso** Establece el nivel de verbosidad a detallado (salida detallada en la consola).

- Bandera: `--verbose`
- Config: `verbose=true`