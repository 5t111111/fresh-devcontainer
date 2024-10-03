#!/usr/bin/env bash

set -uo pipefail

cat << EOS

================================================================================
Application Setup
================================================================================
EOS

cd app

cat << EOS
--------------------------------------------------------------------------------
deno info
--------------------------------------------------------------------------------
EOS

deno info

cat << EOS
--------------------------------------------------------------------------------
Pre-install dependencies (cache)
--------------------------------------------------------------------------------
EOS

echo 'Running deno cache...'

deno cache main.ts

cat << EOS

================================================================================
Setup Complete
================================================================================
Dev Container setup is complete.

Please navigate to the app directory and start the development server with deno task start.

$ cd app
$ deno task start

EOS
