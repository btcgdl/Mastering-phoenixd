#!/bin/bash

# This script is for install phoenix on a Linux system.

TAG="v0.6.0"
PHOENIXD_URL="https://github.com/ACINQ/phoenixd/releases/download/${TAG}"
PHOENIXD_BIN="${PHOENIXD_URL}/phoenixd-${TAG}-linux-x86_64.tar.gz"

echo ""
echo ""
echo "⚡️ Welcome Mastering the phoenixd installer"
echo "-----------------------------------------"
echo "Installing phoenixd ${TAG} from ${PHOENIXD_URL}"
echo ""
read -p "Absolute install directory path (default: $HOME/phoenixd): " USER_INSTALL_DIR

INSTALL_DIR="${USER_INSTALL_DIR:-$HOME/phoenixd}"

# create installation directory
mkdir -p $INSTALL_DIR
cd $INSTALL_DIR


