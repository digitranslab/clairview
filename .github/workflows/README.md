# Clairview CI Pipelines

Welcome to the Clairview CI pipelines directory. This document details what each of the CI pipelines are for, and come common combinations.

## All CI Pipelines

### Standard CI Build Job (clairview_ci.yml)

Triggers:

- PR or push to master

The standard CI Build job is what runs when you raise a PR to master.

- Installs all dependencies,
- builds the project
- run the unit tests
- Generate test coverage metrics with codecov
- Run the integration tests
- Check that the pro and account portal submodules are pointing to the lastest master head

### Release Job (tag-release.yml)

Triggers:

- Manually triggered

This job is responsible for building and pushing all the production services, packages and images. This is done via [clairview-deploys](https://github.com/clairview/clairview-deploys/actions/workflows/release.yml).

An input is required, indicating if the new version will be a `patch`, `minor` or `major` bump.

More documentation can be found in here: https://clairview.atlassian.net/wiki/spaces/DEVOPS/pages/347930625/Production+release

## Common Workflows

### Deploy Changes to Production (Release)

- Merge your changes into `master`
- Run `tag-release.yml`
- Check the progress in [clairview-deploys](https://github.com/clairview/clairview-deploys/actions/workflows/release.yml)

### Rollback A Bad Cloud Deployment

Rollback documentation can be found in here.
https://clairview.atlassian.net/wiki/spaces/DEVOPS/pages/347930625/Production+release#Rollback
