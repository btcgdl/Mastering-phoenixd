#!/bin/bash

PHOENIXD_SIG="https://github.com/ACINQ/phoenixd/releases/tag/${TAG}/SHA256SUMS.asc "
ACINQ_PGP_KEY="https://acinq.co/pgp/padioupm.asc"

verify_package() {
    local archive_file="$1"
    local signature_file="$2"
    local response=""

    while true; do
        read -r -p "Verify package signature and integrity? (Y/N): " response
        case "$response" in
        [Yy]) break ;;
        [Nn]) echo "Verification skipped." ; return 0 ;;
        *) echo "Invalid input. Please enter Y or N." ;;
        esac
    done
}