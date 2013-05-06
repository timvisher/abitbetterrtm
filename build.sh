#!/usr/bin/env bash

set -eux

cd src/
zip -r ../abitbetterrtm2-release-$(date +%s)-$(git rev-list --max-count=1 --abbrev-commit HEAD) .
