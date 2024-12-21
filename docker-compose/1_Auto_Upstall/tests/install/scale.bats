#!/usr/bin/env bats

NOCO_HOME="./clairview"
export NOCO_HOME



setup() {
  cd "${WORKING_DIR}/install" || exit 1
  ./setup.sh
}

teardown() {
    if [ -n "$SKIP_TEARDOWN" ]; then
        return
    fi

    cd "${WORKING_DIR}/install" || exit 1
    ./setup.sh
}

@test "Check if two instances of Clairview can be run" {
    ../expects/install/scale.sh

    cd "${NOCO_HOME}"

    # Get scale from docker compose ps
    scale=$(docker compose ps | grep -c "digitranslab/clairview")
    [ "$scale" -eq 2 ]
}
