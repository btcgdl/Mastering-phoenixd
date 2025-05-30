#!/bin/bash

# This script is for install phoenix on a Linux system.

TAG="0.6.0"
PHOENIXD_URL="github.com/ACINQ/phoenixd/releases/download/v${TAG}"
PHOENIXD_ZIP="${PHOENIXD_URL}/phoenixd-${TAG}-linux-x64.zip"
VERIFIER_URL="https://raw.githubusercontent.com/btcgdl/Mastering-phoenixd/master/scripts/verify.sh"

echo ""
echo ""
echo "⚡️ Welcome to Mastering phoenixd installer"
echo "-----------------------------------------"
echo "Installing phoenixd ${TAG} from ${PHOENIXD_URL}"
echo ""
read -p "Absolute install directory path (default: $HOME/phoenixd): " USER_INSTALL_DIR

INSTALL_DIR="${USER_INSTALL_DIR:-$HOME/phoenixd}"

# Create installation directory
mkdir -p $INSTALL_DIR
cd $INSTALL_DIR

# Download and extract phoenixd
echo "Downloading phoenixd..."
if ! wget "$PHOENIXD_ZIP"; then
  echo "❌ Failed to download phoenixd from ${PHOENIXD_ZIP}" >&2
  exit 1
fi

if [[ ! -f "verify.sh" ]]; then
  echo "Downloading the verification script..."
  if ! wget -q "$VERIFIER_URL"; then
    echo "❌ Failed to download the verification script." >&2
    exit 1
  fi
  chmod +x verify.sh
fi

./verify.sh

unzip -j phoenixd-0.6.0-linux-x64.zip