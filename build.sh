#!/usr/bin/env bash

set -eux

zip -r abitbetterrtm2-release-$(git rev-list --max-count=1 --abbrev-commit HEAD) src
