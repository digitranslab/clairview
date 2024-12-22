#!/bin/bash
# script to build local docker image.
# highlevel steps involved
# 1. Stop and remove existing container and image
# 2. Install dependencies
# 3. Build cv-gui
#   3a. static build of cv-gui
#   3b. copy cv-gui build to clairview dir
# 4. Build clairview

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
LOG_FILE=${SCRIPT_DIR}/build-local-docker-image.log
ERROR=""

function stop_and_remove_container() {
    # Stop and remove the existing container
    docker stop clairview-local >/dev/null 2>&1
    docker rm clairview-local >/dev/null 2>&1
}

function remove_image() {
    # Remove the existing image
    docker rmi clairview-local >/dev/null 2>&1
}

function install_dependencies() {
    # Install all dependencies
    cd ${SCRIPT_DIR}
    pnpm bootstrap || ERROR="install_dependencies failed"
}

function build_gui() {
    # build cv-gui
    export NODE_OPTIONS="--max_old_space_size=16384"
    # generate static build of cv-gui
    cd ${SCRIPT_DIR}/packages/cv-gui
    pnpm run generate || ERROR="gui build failed"
}

function copy_gui_artifacts() {
     # copy cv-gui build to clairview dir
    rsync -rvzh --delete ./dist/ ${SCRIPT_DIR}/packages/clairview/docker/cv-gui/ || ERROR="copy_gui_artifacts failed"
}

function package_clairview() {
    # build clairview ( pack clairview-sdk and cv-gui )
    cd ${SCRIPT_DIR}/packages/clairview
    EE=true ${SCRIPT_DIR}/node_modules/@rspack/cli/bin/rspack.js --config ${SCRIPT_DIR}/packages/clairview/rspack.config.js || ERROR="package_clairview failed"
}

function build_image() {
    # build docker
    docker build . -f Dockerfile.local -t clairview-local || ERROR="build_image failed"
}

function log_message() {
    if [[ ${ERROR} != "" ]];
    then
        >&2 echo "build failed, Please check build-local-docker-image.log for more details"
        >&2 echo "ERROR: ${ERROR}"
        exit 1
    else
        echo 'docker image with tag "clairview-local" built sussessfully. Use below sample command to run the container'
        echo 'docker run -d -p 3333:8080 --name clairview-local clairview-local '
    fi
}

echo "Info: Stopping and removing existing container and image" | tee ${LOG_FILE}
stop_and_remove_container
remove_image

echo "Info: Installing dependencies" | tee -a ${LOG_FILE}
install_dependencies 1>> ${LOG_FILE} 2>> ${LOG_FILE}

echo "Info: Building cv-gui" | tee -a ${LOG_FILE}
build_gui 1>> ${LOG_FILE} 2>> ${LOG_FILE}

echo "Info: Copy cv-gui build to clairview dir" | tee -a ${LOG_FILE}
copy_gui_artifacts 1>> ${LOG_FILE} 2>> ${LOG_FILE}

echo "Info: Build clairview, package clairview-sdk and cv-gui" | tee -a ${LOG_FILE}
package_clairview 1>> ${LOG_FILE} 2>> ${LOG_FILE}

if [[ ${ERROR} == "" ]]; then
    echo "Info: Building docker image" | tee -a ${LOG_FILE}
    build_image 1>> ${LOG_FILE} 2>> ${LOG_FILE}
fi

log_message | tee -a ${LOG_FILE}
