#!/usr/bin/env bats

NOCO_HOME="./clairview"
export NOCO_HOME



setup() {
  cd "${WORKING_DIR}/configure" || exit 1
  ./setup.sh "setup"
}

teardown() {
    if [ -n "$SKIP_TEARDOWN" ]; then
        return
    fi

    cd "${WORKING_DIR}/install" || exit 1
    ./setup.sh
}

@test "Check ClairView is scaled to 3 instances" {
    nproc() {
        echo 4
    }

    ../expects/configure/scale.sh

    cd "${NOCO_HOME}" || exit 1

    result=$(docker compose ps | grep -c "digitranslab/clairview")
    [ "${result}" -eq 3 ]
}
