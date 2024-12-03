#!/bin/sh

packages_to_remove="@clairview/backend-core @clairview/bbui @clairview/builder @clairview/cli @clairview/client @clairview/frontend-core @budibase/pro @clairview/sdk @clairview/server @clairview/shared-core @clairview/string-templates @clairview/types @clairview/worker"

package_json_path="$1"

process_package() {
  pkg_path="$1"

  for package_name in $packages_to_remove; do
    jq "del(.dependencies[\"$package_name\"])" $pkg_path > tmp_file.json && mv tmp_file.json $pkg_path
    jq "del(.resolutions[\"$package_name\"])" $pkg_path > tmp_file.json && mv tmp_file.json $pkg_path
  done
}

process_package "$package_json_path"
