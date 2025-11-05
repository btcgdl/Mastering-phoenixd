---
slug: /Script
---
# Single Script Installation

The easiest way to install phoenixd is using our automated installation script. This script handles downloading, verification, and setup of phoenixd on your Linux system.

:::info
**Read Before Installing**

Please read through this entire page to understand what the installation script does, its requirements, and security implications before running any commands. The script will make system changes and may require sudo permissions.
:::


## Quick Install

Run the following command in your terminal:

**Single command (recommended):**
```bash
curl -fsSL https://raw.githubusercontent.com/btcgdl/Mastering-phoenixd/master/scripts/install.sh | bash -s -- --yes
```

**Alternative methods:**

If you prefer to review the script before running it, you can manually download and inspect it first:

*Download the script and make it executable:*
   ```bash
   wget https://raw.githubusercontent.com/btcgdl/Mastering-phoenixd/master/scripts/install.sh
   chmod +x install.sh
   ```

*Run the script:*
   ```bash
   ./install.sh
   ```

## What the Script Does

The installation script performs the following operations:

1. **Downloads phoenixd v0.7.0** from the official ACINQ GitHub releases
2. **Verifies the package integrity** using GPG signatures and checksums
3. **Installs to a directory in your PATH** (default: `/usr/local/bin`)
4. **Configures your shell environment** to recognize the phoenixd command
5. **Optionally sets up a systemd service** for automatic startup

## Installation Process

When you run the script, you'll see:

```
⚡️ Welcome to Mastering phoenixd installer
-----------------------------------------
Installing phoenixd 0.7.0 from github.com/ACINQ/phoenixd/releases/download/v0.7.0
```

### Package Verification

The script includes automatic verification:

```
🔐 Starting package verification...
✅ Package verification successful.
✅ Verification successful. The package is authentic and intact.
```

This ensures you're installing an authentic, unmodified version of phoenixd.

### Systemd Service Setup

After installation, you'll be asked:

```
Do you want to setup a systemd service (requires sudo permission)? (y/n):
```

If you choose **yes**:
- Creates a systemd service file at `/etc/systemd/system/phoenixd.service`
- Enables and starts the service
- Configures phoenixd to run on mainnet by default
- Sets up automatic restart on failure

You can then manage phoenixd using systemd commands:
```bash
sudo systemctl start phoenixd
sudo systemctl stop phoenixd
sudo systemctl restart phoenixd
sudo systemctl status phoenixd
journalctl -u phoenixd -f  # View logs
```

If you choose **no**:
- You can run phoenixd manually with the `phoenixd` command
- Use `phoenix-cli` to interact with the daemon

## Post-Installation

After successful installation:

### Manual Operation
```bash
# Start phoenixd manually
phoenixd --agree-to-terms-of-service

# In another terminal, interact with phoenixd
phoenix-cli getinfo
```

### Systemd Service (if enabled)
```bash
# Control the service
sudo systemctl start phoenixd
sudo systemctl stop phoenixd
sudo systemctl restart phoenixd

# Check service status
sudo systemctl status phoenixd

# View logs
journalctl -u phoenixd -f
```

## Requirements

- **Operating System**: Linux (x64)
- **Dependencies**: `wget`, `gpg`, `unzip`, `sha256sum`
- **Network**: Internet connection for downloads
- **Permissions**: Write access to installation directory, sudo for systemd service

## Troubleshooting

### Command not found after installation

If `phoenixd` command is not recognized after installation:

```bash
# Reload your shell configuration
source ~/.bashrc  # or ~/.zshrc

# Or restart your terminal
```

### Verification failures

If package verification fails:
- Check your internet connection
- Ensure GPG is properly installed
- Visit the [official releases page](https://github.com/ACINQ/phoenixd/releases) for manual verification

### Permission issues

If you encounter permission errors:
- Ensure you have write access to the installation directory
- Use `sudo` for system-wide installations
- Consider using the `~/.local/bin` directory

## Security Notes

The installation script:
- ✅ Downloads from official ACINQ sources only
- ✅ Verifies packages using GPG signatures
- ✅ Validates checksums before installation
- ✅ Uses secure HTTPS connections
- ✅ Provides full transparency of operations

Always review scripts before running them with elevated privileges.

## Next Steps

After installation, see:
- [Installation Guide](./2-Install.md) for detailed configuration
- [Command Line Flags](./3-Flags.md) for startup options
- [API Documentation](./5-API.md) for integration details
