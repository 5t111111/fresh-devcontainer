#!/usr/bin/env bash

set -euo pipefail

cat << EOS

================================================================================
Performing a pre-check...
================================================================================
EOS

APP_ENV_PATH="app/.env"

if [ ! -f ${APP_ENV_PATH} ]; then
  echo "${APP_ENV_PATH} does not exist. Creating it from ${APP_ENV_PATH}.example."
  cp ${APP_ENV_PATH}.example ${APP_ENV_PATH}
else
  echo "${APP_ENV_PATH} ...OK"
fi

cat << EOS

...Check complete
EOS
