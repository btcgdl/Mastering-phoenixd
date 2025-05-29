#!/bin/bash

TAG="0.6.0"

PHOENIXD_SIG="https://github.com/ACINQ/phoenixd/releases/download/v${TAG}/SHA256SUMS.asc"
ACINQ_PGP_KEY="https://acinq.co/pgp/padioupm.asc"

verify_package() {

  while true; do
    read -r -p "Verify package signature and integrity? (Y/N): " response
    case "$response" in
      [Yy]) break ;;
      [Nn]) echo "Verification skipped." ; return 0 ;;
      *) echo "Invalid input. Please enter Y or N." ;;
    esac
  done

  echo "Downloading pgp key..."
  if ! wget -q "$ACINQ_PGP_KEY"; then
    echo "❌ Failed to download pgp key." >&2
    return 1
  fi

  echo "Importing pgp key..."
  if ! gpg --import padioupm.asc; then
    echo "❌ Failed to import pgp key." >&2
    return 1
  fi

  echo "Downloading signature file..."
  if ! wget -q "$PHOENIXD_SIG"; then
    echo "❌ Failed to download signature file." >&2
    return 1
  fi

  echo "Verifying signatures..."
  if ! gpg -d SHA256SUMS.asc > SHA256SUMS.stripped; then
    echo "❌ Failed to decode signature file." >&2
    return 1
  fi

  echo "Verifying checksums..."
  if ! sha256sum -c SHA256SUMS.stripped; then
    echo "❌ Checksum verification failed!" >&2
    echo "Visit https://github.com/ACINQ/phoenixd/releases for more information on how to verify the release" >&2
    return 1
  fi

  echo "✅ Verification successful. The package is authentic and intact."
  return 0
}