#!/bin/bash

set -o pipefail

# This script is for uninstalling phoenixd from a Linux system.

# Parse command line arguments
AUTO_YES=false
for arg in "$@"; do
  case $arg in
    --yes|-y)
      AUTO_YES=true
      shift
      ;;
    *)
      # Unknown option
      ;;
  esac
done

BIN_DIR="/usr/local/bin"
SERVICE_FILE="/etc/systemd/system/phoenixd.service"

echo ""
echo "🗑️  phoenixd Uninstaller"
echo "-----------------------------------"
echo "This script will remove phoenixd binaries and service from your system."
echo "⚠️  Note: Your wallet data and configuration files will NOT be removed."
echo ""

if [[ "$AUTO_YES" == true ]]; then
  # Auto-yes mode
  REPLY="y"
elif [[ -t 0 ]]; then
  # Interactive mode
  echo "Are you sure you want to uninstall phoenixd? (y/n): "
  read -r REPLY
else
  # Non-interactive mode
  echo "Running in non-interactive mode. Proceeding with uninstallation."
  REPLY="y"
fi

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "Uninstallation cancelled."
  exit 0
fi

# Check if systemd service exists and stop/disable it
if [ -f "$SERVICE_FILE" ]; then
  echo "Stopping and disabling phoenixd service..."
  sudo systemctl stop phoenixd 2>/dev/null || true
  sudo systemctl disable phoenixd 2>/dev/null || true
  sudo rm -f "$SERVICE_FILE" 2>/dev/null || true
  sudo systemctl daemon-reload 2>/dev/null || true
  echo "✅ Systemd service removed"
fi

# Remove phoenixd binaries
if [ -f "$BIN_DIR/phoenixd" ]; then
  echo "Removing phoenixd binary..."
  sudo rm -f "$BIN_DIR/phoenixd"
  echo "✅ phoenixd binary removed"
fi

if [ -f "$BIN_DIR/phoenix-cli" ]; then
  echo "Removing phoenix-cli binary..."
  sudo rm -f "$BIN_DIR/phoenix-cli"
  echo "✅ phoenix-cli binary removed"
fi

echo ""
echo "✅ phoenixd has been uninstalled successfully!"
echo ""
echo "⚠️  IMPORTANT: Your wallet data has been preserved for security reasons."
echo "If you need to remove wallet data, you must do it manually."
echo "Data directory location: ~/.phoenix"
echo ""
echo "Note: If you manually added phoenixd to your PATH, please remove those entries"
echo "from your ~/.bashrc, ~/.zshrc, or other shell configuration files."
echo ""