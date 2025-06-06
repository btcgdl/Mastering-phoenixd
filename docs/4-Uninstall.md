# Uninstall `phoenixd`  

:::danger
This tutorial does **not** remove the `.phoenix/` directory.  
This directory contains your `seed.dat` file.  
**If deleted, all your funds will be permanently lost.** Proceed with caution.  
:::


To completely remove `phoenixd` from your system, follow these steps:  

## 1. Stop and Disable the Service  

```sh
sudo systemctl stop phoenixd
sudo systemctl disable phoenixd
```

## 2. Remove the Systemd Service File

```sh
sudo rm -v /etc/systemd/system/phoenixd.service
```

## 3. Reload Systemd

```sh
sudo systemctl daemon-reload
sudo systemctl reset-failed
```

## 4. Remove `phoenixd` Binaries

```sh
sudo rm -v /usr/local/bin/phoenix*
```

## 5. Verify the Service is Removed (Optional)

```sh
systemctl list-units --type=service | grep phoenixd
```

After these steps, `phoenixd` will be completely removed from your system.
