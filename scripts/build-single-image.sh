#!/bin/bash
yarn build:apps
version=$(./scripts/getCurrentVersion.sh)
docker build -f hosting/single/Dockerfile -t clairview:latest --build-arg CLAIRVIEW_VERSION=$version --build-arg TARGETBUILD=single .
