---
slug: /Config
---

# Useful phoenixd Flags

**Terms of service** (Hidden flag) Agrees to the terms of service, preventing the interactive prompt on first run.

- Flag: `--agree-to-terms-of-service`

**Chain** Specifies the Bitcoin chain to use. Defaults to mainnet.

- Flag: `--chain <mainnet|testnet>`
- Config: `chain=mainnet`

**Mempool Space URL** Sets a custom mempool.space instance URL.

- Flag: `--mempool-space-url <URL>`
- Config: `mempool-space-url="https://mempool.space"`

**Mempool Space Polling Interval** (Hidden flag) Defines how often to poll the mempool.space API (in minutes). Defaults to 10 minutes.

- Flag: `--mempool-space-polling-interval-minutes <minutes>`
- Config: `mempool-space-polling-interval-minutes=10`

### Liquidity Options:

**Auto Liquidity** Sets the amount automatically requested when inbound liquidity is needed. Defaults to 2m (2,000,000 satoshis).

- Flag: `--auto-liquidity <off|2m|5m|10m>`
- Config: `auto-liquidity=2m`

**Max Mining Fee** Sets the maximum mining fee for on-chain operations in satoshis. Restricted to 5,000 to 200,000 satoshis. Defaults to 1% of the --auto-liquidity amount.

- Flag: `--max-mining-fee <satoshis>`
- Config: `max-mining-fee=5000`

**Max Fee Credit** Sets the maximum fee credit. If reached, payments will be rejected. Defaults to 100k (100,000 satoshis).

- Flag: `--max-fee-credit <off|50k|100k>`
- Config: `max-fee-credit=100k`

**Max Relative Fee Percent** (Hidden flag) Sets the maximum relative fee for on-chain operations in percent. Restricted to 1 to 50. Defaults to 30.

- Flag: `--max-relative-fee-percent <percent>`
- Config: `max-relative-fee-percent=30`

### HTTP Options:

**HTTP Bind IP** Specifies the IP address for the HTTP API to bind to. Defaults to 127.0.0.1.

- Flag: `--http-bind-ip <IP_address>`
- Config: `http-bind-ip=127.0.0.1`

**HTTP Bind Port** Sets the port for the HTTP API. Defaults to 9740.

- Flag: `--http-bind-port <port_number>`
- Config: `http-bind-port=9740`

**HTTP Password** Sets the password for full access to the HTTP API. If not provided, a default password will be generated.

- Flag: `--http-password <password>`
- Config: `http-password="your_password"`

**HTTP Password Limited Access** Sets the password for limited access to the HTTP API. If not provided, a default password will be generated.

- Flag: `--http-password-limited-access <password>`
- Config: `http-password-limited-access="your_password"`

**Webhook URL** Specifies a webhook HTTP endpoint for push notifications. Can be used multiple times for multiple webhooks.

- Flag: `--webhook <URL>`
- Config: `webhook="https://example.com/webhook"`

**Webhook Secret** Sets the secret used to authenticate webhook calls. If not provided, a default secret will be generated.

- Flag: `--webhook-secret <secret>`
- Config: `webhook-secret="your_secret"`

### Seed Options:

**Seed** Explicitly provides a 12-word mnemonic seed. Use with extreme caution as this will expose your seed in plain text.

- Flag: `--seed <12-word_mnemonic>`

**Seed Path** Overrides the default path to the seed file (defaults to datadir/seed.dat).

- Flag: `--seed-path <path_to_seed_file>`

### Logging Options:

**Log Rotate Size** Sets the log file rotation size in megabytes. Defaults to 10 MB.

- Flag: `--log-rotate-size <MB>`
- Config: `log-rotate-size=10`

**Log Rotate Max Files** Sets the maximum number of log files to keep. Defaults to 5.

- Flag: `--log-rotate-max-files <number>`
- Config: `log-rotate-max-files=5`

**Silent** Sets the verbosity level to silent (no console output).

- Flag: `--silent`
- Config: `silent=true`

**Verbose** Sets the verbosity level to verbose (detailed console output).

- Flag: `--verbose`
- Config: `verbose=true`
