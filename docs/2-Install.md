---
slug: /Install
---

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
sudo mv phoenixd /usr/local/bin/
sudo mv phoenix-cli /usr/local/bin/
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
