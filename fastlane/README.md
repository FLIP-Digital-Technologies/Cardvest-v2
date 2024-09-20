fastlane documentation
----

# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```sh
xcode-select --install
```

For _fastlane_ installation instructions, see [Installing _fastlane_](https://docs.fastlane.tools/#installing-fastlane)

# Available Actions

### bump_badge

```sh
[bundle exec] fastlane bump_badge
```

Bump and badge iOS and Android.

----


## iOS

### ios certificates

```sh
[bundle exec] fastlane ios certificates
```

Set up certificates and provisioning profiles.

### ios deploy_testflight_staging

```sh
[bundle exec] fastlane ios deploy_testflight_staging
```

Sign, build, deploy to TestFlight (staging).

### ios deploy_testflight_production

```sh
[bundle exec] fastlane ios deploy_testflight_production
```

Sign, build, deploy to TestFlight (production).

### ios bump_badge_deploy_testflight_staging

```sh
[bundle exec] fastlane ios bump_badge_deploy_testflight_staging
```

Bump, badge, sign, build, deploy to TestFlight (staging).

### ios bump_badge_deploy_testflight_production

```sh
[bundle exec] fastlane ios bump_badge_deploy_testflight_production
```

Bump, badge, sign, build, deploy to TestFlight (production).

----

This README.md is auto-generated and will be re-generated every time [_fastlane_](https://fastlane.tools) is run.

More information about _fastlane_ can be found on [fastlane.tools](https://fastlane.tools).

The documentation of _fastlane_ can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
