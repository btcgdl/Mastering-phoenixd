# Install `phoenixd`

(Refer to the [Phoenix documentation](https://phoenix.acinq.co/server) for more details.)  

## 1. Download and Set Up `phoenixd`  

Download and extract the latest version:  

```sh
wget https://github.com/ACINQ/phoenixd/releases/download/v0.6.0/phoenixd-0.6.0-linux-x64.zip
unzip -j phoenixd-0.6.0-linux-x64.zip
```  

Move the binaries to a global path:  

```sh
sudo mv phoenixd /usr/bin/
sudo mv phoenix-cli /usr/bin/
```  

Remove the zip file
```sh
rm phoenixd-0.6.0-linux-x64.zip
```

## 2. Create a Systemd Service File  

Create a new systemd service file:  

```sh
sudo nano /etc/systemd/system/phoenixd.service
```  

Add the following content (replace `your_username` with your actual username):  

```ini
[Unit]
Description=Phoenix Daemon
After=network.target

[Service]
ExecStart=phoenixd
User=your_username
Restart=always
RestartSec=5
LimitNOFILE=4096
WorkingDirectory=/home/your_username/

[Install]
WantedBy=multi-user.target
```  
### Useful phoenixd Flags:

Here are some useful command-line flags you can add to the `ExecStart` line in your phoenixd.service file:

`--agree-to-terms-of-service`: (Hidden flag) Agrees to the terms of service, preventing the interactive prompt on first run.

`--chain <mainnet|testnet>`: Specifies the Bitcoin chain to use. Defaults to mainnet.

`--mempool-space-url <URL>`: Sets a custom mempool.space instance URL.

`--mempool-space-polling-interval-minutes <minutes>`: (Hidden flag) Defines how often to poll the mempool.space API (in minutes). Defaults to 10 minutes.

#### Liquidity Options:

`--auto-liquidity <off|2m|5m|10m>`: Sets the amount automatically requested when inbound liquidity is needed. Defaults to 2m (2,000,000 satoshis).
- off: 0 satoshis
- 2m: 2,000,000 satoshis
- 5m: 5,000,000 satoshis
- 10m: 10,000,000 satoshis
  
`--max-mining-fee <satoshis>`: Sets the maximum mining fee for on-chain operations in satoshis. Restricted to 5,000 to 200,000 satoshis. Defaults to 1% of the --auto-liquidity amount.

`--max-fee-credit <off|50k|100k>`: Sets the maximum fee credit. If reached, payments will be rejected. Defaults to 100k (100,000 satoshis).
- off: 0 satoshis
- 50k: 50,000 satoshis
- 100k: 100,000 satoshis

`--max-relative-fee-percent <percent>`: (Hidden flag) Sets the maximum relative fee for on-chain operations in percent. Restricted to 1 to 50. Defaults to 30.

#### HTTP Options:

`--http-bind-ip <IP_address>`: Specifies the IP address for the HTTP API to bind to. Defaults to 127.0.0.1.

`--http-bind-port <port_number>`: Sets the port for the HTTP API. Defaults to 9740.

`--http-password <password>`: Sets the password for full access to the HTTP API. If not provided, a default password will be generated.
  
`--http-password-limited-access <password>`: Sets the password for limited access to the HTTP API. If not provided, a default password will be generated.
  
`--webhook <URL>`: Specifies a webhook HTTP endpoint for push notifications. Can be used multiple times for multiple webhooks.
  
`--webhook-secret <secret>`: Sets the secret used to authenticate webhook calls. If not provided, a default secret will be generated.

#### Seed Options:

`--seed <12-word_mnemonic>`: Explicitly provides a 12-word mnemonic seed. Use with extreme caution as this will expose your seed in plain text.
  
`--seed-path <path_to_seed_file>`: Overrides the default path to the seed file (defaults to datadir/seed.dat).

#### Logging Options:

`--log-rotate-size <MB>`: Sets the log file rotation size in megabytes. Defaults to 10 MB.
  
`--log-rotate-max-files <number>`: Sets the maximum number of log files to keep. Defaults to 5.

`--silent`: Sets the verbosity level to silent (no console output).
  
`--verbose`: Sets the verbosity level to verbose (detailed console output).

## 3. Reload Systemd and Enable the Service  

```sh
sudo systemctl daemon-reload
sudo systemctl enable phoenixd
```  

## 4. Start the Service  

```sh
sudo systemctl start phoenixd
```  

## 5. Check Service Status  

```sh
sudo systemctl status phoenixd
```

