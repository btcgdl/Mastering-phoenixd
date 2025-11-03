---
slug: /Flags
---

# Banderas Útiles de phoenixd

Aquí hay algunas banderas de línea de comandos útiles que puedes añadir a la línea `ExecStart` en tu archivo `phoenixd.service`:

`--agree-to-terms-of-service`: (Bandera oculta) Acepta los términos de servicio, evitando el aviso interactivo en la primera ejecución.

`--chain <mainnet|testnet>`: Especifica la cadena de Bitcoin a usar. Por defecto es mainnet.

`--mempool-space-url <URL>`: Establece una URL de instancia de mempool.space personalizada.

`--mempool-space-polling-interval-minutes <minutos>`: (Bandera oculta) Define con qué frecuencia se consulta la API de mempool.space (en minutos). Por defecto es 10 minutos.

### Opciones de Liquidez:

`--auto-liquidity <off|2m|5m|10m>`: Establece la cantidad solicitada automáticamente cuando se necesita liquidez entrante. Por defecto es 2m (2,000,000 satoshis).
- off: 0 satoshis
- 2m: 2,000,000 satoshis
- 5m: 5,000,000 satoshis
- 10m: 10,000,000 satoshis
  
`--max-mining-fee <satoshis>`: Establece la tarifa de minería máxima para operaciones en cadena en satoshis. Restringido de 5,000 a 200,000 satoshis. Por defecto es el 1% de la cantidad de `--auto-liquidity`.

`--max-fee-credit <off|50k|100k>`: Establece el crédito de tarifa máximo. Si se alcanza, los pagos serán rechazados. Por defecto es 100k (100,000 satoshis).
- off: 0 satoshis
- 50k: 50,000 satoshis
- 100k: 100,000 satoshis

`--max-relative-fee-percent <porcentaje>`: (Bandera oculta) Establece la tarifa relativa máxima para operaciones en cadena en porcentaje. Restringido de 1 a 50. Por defecto es 30.

### Opciones HTTP:

`--http-bind-ip <dirección_IP>`: Especifica la dirección IP a la que se vinculará la API HTTP. Por defecto es 127.0.0.1.

`--http-bind-port <número_de_puerto>`: Establece el puerto para la API HTTP. Por defecto es 9740.

`--http-password <contraseña>`: Establece la contraseña para el acceso completo a la API HTTP. Si no se proporciona, se generará una contraseña por defecto.
  
`--http-password-limited-access <contraseña>`: Establece la contraseña para el acceso limitado a la API HTTP. Si no se proporciona, se generará una contraseña por defecto.
  
`--webhook <URL>`: Especifica un punto final HTTP de webhook para notificaciones push. Se puede usar varias veces para múltiples webhooks.
  
`--webhook-secret <secreto>`: Establece el secreto utilizado para autenticar las llamadas de webhook. Si no se proporciona, se generará un secreto por defecto.

### Opciones de Semilla:

`--seed <mnemónico_de_12_palabras>`: Proporciona explícitamente una semilla mnemónica de 12 palabras. Úsalo con extrema precaución, ya que esto expondrá tu semilla en texto plano.
  
`--seed-path <ruta_al_archivo_de_semilla>`: Sobrescribe la ruta por defecto al archivo de semilla (por defecto es `datadir/seed.dat`).

### Opciones de Registro:

`--log-rotate-size <MB>`: Establece el tamaño de rotación del archivo de registro en megabytes. Por defecto es 10 MB.
  
`--log-rotate-max-files <número>`: Establece el número máximo de archivos de registro a mantener. Por defecto es 5.

`--silent`: Establece el nivel de verbosidad a silencioso (sin salida en la consola).
  
`--verbose`: Establece el nivel de verbosidad a detallado (salida detallada en la consola).
