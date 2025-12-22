#!/bin/bash

set -o pipefail

# Constants
TAG="0.7.0"
PHOENIXD_RELEASE_BASE_URL="https://github.com/ACINQ/phoenixd/releases/download/v${TAG}"
INSTALL_DIR="/usr/local/bin"

# Global variables
AUTO_YES=false
OS=""
ARCH=""
PHOENIXD_ZIP_FILENAME=""
WORK_DIR=""

# Function: Parse command line arguments
parse_args() {
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
}

# Function: Detect OS and Architecture
detect_os_arch() {
  ARCH=$(uname -m)
  
  if [[ "$OSTYPE" == "linux"* ]]; then
    if [[ "$ARCH" == "x86_64" ]]; then
      PHOENIXD_ZIP_FILENAME="phoenixd-${TAG}-linux-x64.zip"
      OS="linux-x64"
    elif [[ "$ARCH" == "aarch64" ]]; then
      PHOENIXD_ZIP_FILENAME="phoenixd-${TAG}-linux-arm64.zip"
      OS="linux-arm64"
    else
      echo "❌ Unsupported architecture: $ARCH"
      exit 1
    fi
  elif [[ "$OSTYPE" == "darwin"* ]]; then
    if [[ "$ARCH" == "x86_64" ]]; then
      PHOENIXD_ZIP_FILENAME="phoenixd-${TAG}-macos-x64.zip"
      OS="macos-x64"
    elif [[ "$ARCH" == "arm64" ]]; then
      PHOENIXD_ZIP_FILENAME="phoenixd-${TAG}-macos-arm64.zip"
      OS="macos-arm64"
    else
      echo "❌ Unsupported architecture: $ARCH"
      exit 1
    fi
  else
    echo "❌ Unsupported OS type: $OSTYPE"
    exit 1
  fi

  echo "Detected architecture: $ARCH"
  echo "Using URL: ${PHOENIXD_RELEASE_BASE_URL}/${PHOENIXD_ZIP_FILENAME}"
}

# Function: Check for existing installation
check_existing_installation() {
  echo ""
  echo ""
  echo "⚡️ Welcome to Mastering phoenixd installer"
  echo "-----------------------------------------"
  echo "This script will install ${OS} version of phoenixd"
  echo "-----------------------------------------"

  if command -v phoenixd >/dev/null 2>&1 && command -v phoenix-cli >/dev/null 2>&1; then
    echo "❌ phoenixd and phoenix-cli are already installed on this system"
    echo "Current phoenixd location: $(which phoenixd)"
    echo "Current phoenix-cli location: $(which phoenix-cli)"
    echo ""
    
    if [[ "$AUTO_YES" != true ]]; then
      echo "Do you want to continue with the installation anyway? This will overwrite the existing installation. (y/n): "
      read -r CONTINUE_REPLY
      if [[ ! $CONTINUE_REPLY =~ ^[Yy]$ ]]; then
        echo "Installation cancelled."
        exit 0
      fi
    else
      echo "Running in auto-yes mode. Installation cancelled to prevent overwriting existing installation."
      echo "If you want to overwrite the existing installation, run the script interactively without --yes flag."
      exit 0
    fi
  fi
}

# Function: Prepare working directory
prepare_work_dir() {
  echo "Installing phoenixd ${TAG}"
  echo ""
  echo "Absolute install directory path (default: $INSTALL_DIR)"

  # Create installation directory
  sudo mkdir -p "$INSTALL_DIR"

  # Create a temporary directory for downloads
  WORK_DIR=$(mktemp -d)
  if [[ ! -d "$WORK_DIR" ]]; then
    echo "❌ Failed to create temporary directory" >&2
    exit 1
  fi
}

# Function: Cleanup
cleanup() {
  if [[ -n "$WORK_DIR" ]] && [[ -d "$WORK_DIR" ]]; then
    rm -rf "$WORK_DIR"
  fi
}

# Function: Download files
download_files() {
  echo "Downloading phoenixd..."
  cd "$WORK_DIR" || exit 1

  local zip_url="${PHOENIXD_RELEASE_BASE_URL}/${PHOENIXD_ZIP_FILENAME}"
  if ! curl -sL -O "$zip_url"; then
    echo "❌ Failed to download phoenixd from ${zip_url}" >&2
    exit 1
  fi
}

# Function: Verify signature
verify_signature() {
  echo "🔐 Verifying package signature and integrity..."
  cd "$WORK_DIR" || exit 1

  # Define commands based on OS
  local sha_cmd=""
  if command -v sha256sum >/dev/null; then
    sha_cmd="sha256sum"
  elif command -v shasum >/dev/null; then
    sha_cmd="shasum -a 256"
  else
    echo "⚠️  SHA256 checksum utility not found. Skipping checksum verification."
    return 0
  fi

  # Check for GPG
  if ! command -v gpg >/dev/null; then
    echo "⚠️  gpg is not installed. Skipping cryptographic signature verification."
    return 0
  fi

  local acinq_key_url="https://acinq.co/pgp/padioupm.asc"
  local sig_url="${PHOENIXD_RELEASE_BASE_URL}/SHA256SUMS.asc"

  # Download Key and Signature
  if ! curl -sL -O "$acinq_key_url" || ! curl -sL -O "$sig_url"; then
    echo "❌ Failed to download verification files (PGP key or Signature)." >&2
    exit 1
  fi

  # Import Key
  if ! gpg --quiet --import padioupm.asc >/dev/null 2>&1; then
    echo "❌ Failed to import ACINQ PGP key." >&2
    exit 1
  fi

  # Verify Signature
  if ! gpg --quiet --decrypt SHA256SUMS.asc > SHA256SUMS.stripped 2>/dev/null; then
    echo "❌ Signature verification failed! The file SHA256SUMS.asc is not valid." >&2
    exit 1
  fi

  # Verify Checksum of the specific downloaded file
  # We filter SHA256SUMS.stripped to find only our file, then check it.
  if grep "$PHOENIXD_ZIP_FILENAME" SHA256SUMS.stripped | $sha_cmd -c - >/dev/null 2>&1; then
    echo "✅ Package verification successful."
  else
    echo "❌ Checksum verification failed for $PHOENIXD_ZIP_FILENAME" >&2
    exit 1
  fi
}

# Function: Install binaries
install_binaries() {
  # Unzip from the current directory (WORK_DIR) to the target directory
  sudo unzip -j "$PHOENIXD_ZIP_FILENAME" -d "$INSTALL_DIR"
  echo "✅ phoenixd installed to $INSTALL_DIR"
}

# Function: Handle MacOS specific logic
handle_macos() {
  if [[ "$OSTYPE" == "darwin"* ]]; then
    echo ""
    echo "MacOS detected. Please ensure that $INSTALL_DIR is in your PATH."
    echo "You can add the following line to your ~/.zshrc or ~/.bash_profile:"
    echo 'export PATH="/usr/local/bin:$PATH"'
    echo ""
    exit 0
  fi
}

# Function: Setup systemd service (Linux only)
setup_systemd() {
  local reply=""
  
  if [[ "$AUTO_YES" == true ]]; then
    echo "Auto-installing systemd service..."
    reply="y"
  elif [[ -t 0 ]]; then
    echo "Do you want to setup a systemd service (requires sudo permission)? (y/n): "
    read -r reply
  else
    echo "Running in non-interactive mode. Skipping systemd service setup."
    echo "To set up the systemd service later, run the script interactively."
    reply="n"
  fi

  if [[ ! $reply =~ ^[Yy]$ ]]; then
    echo ""
    echo ""
    echo "Run 'phoenixd' to start the daemon"
    echo "Run 'phoenix-cli' to interact with the daemon"
    echo "✅ DONE"
    return
  fi

  sudo tee /etc/systemd/system/phoenixd.service > /dev/null << EOF
[Unit]
Description=Phoenix Daemon
After=network.target

[Service]
ExecStart=$INSTALL_DIR/phoenixd --agree-to-terms-of-service
User=$USER
Restart=always
RestartSec=5
LimitNOFILE=4096

[Install]
WantedBy=multi-user.target
EOF

  echo ""
  sudo systemctl enable phoenixd
  echo ""
  sudo systemctl start phoenixd

  echo "Run 'sudo systemctl status phoenixd' to check the status of Phoenix Daemon"
  echo "Run 'sudo systemctl stop phoenixd' to stop Phoenix Daemon"
}

# Main Execution Flow
trap cleanup EXIT

parse_args "$@"
detect_os_arch
check_existing_installation
prepare_work_dir
download_files
verify_signature
install_binaries
handle_macos
setup_systemd