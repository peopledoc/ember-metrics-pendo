# ember-metrics-pendo

[![CI](https://github.com/peopledoc/ember-metrics-pendo/actions/workflows/ci.yml/badge.svg)](https://github.com/peopledoc/ember-metrics-pendo/actions/workflows/ci.yml) [![Ember Observer Score](https://emberobserver.com/badges/ember-metrics-pendo.svg)](https://emberobserver.com/addons/ember-metrics-pendo)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Deprecation Warning ⚠️

> This add-on has been merged into [`ember-metrics`](https://github.com/adopted-ember-addons/ember-metrics).
>
> Please use `ember-metrics` v1.4.0+ instead and remove `ember-metrics-pendo` from your dependencies.

## About this addon

Ember-metrics-pendo allows to configure the [Pendo](https://www.pendo.io) service in your ember project using [ember-metrics](https://github.com/poteto/ember-metrics).

### What is Pendo?

[Pendo](https://www.pendo.io) is a product cloud that brings product analytics, user feedback and guided user engagement as part of one integrated platform.

### What is ember-metrics?

[ember-metrics](https://github.com/poteto/ember-metrics) is an Ember addon that provides bundled adapters for analytics services (like Google Analytics), and one API to track events, page views, and more. Pendo is not included by default in ember-metrics.

## Compatibility

* Ember.js v3.20 or above
* Ember CLI v3.20 or above
* Node.js v12 or above


## Installation

```
ember install ember-metrics-pendo
```

## Configuration

To setup ember-metrics-pendo, first configure the service in `config/environment`:

```javascript
module.exports = function(environment) {
  var ENV = {
    metricsAdapters: [
      {
        name: "Pendo",
        environments: ["production"],
        config: {
          apiKey: "0f76c037-4d76-4fce-8a0f-a9a8f89d1453"
        }
      }
    ]
  };
};
```

The **apiKey** is the key associated with the Pendo account. Owning such a key is required to configure ember-metrics-pendo.

## Usage

Be aware the use of Pendo makes sense only once your visitor is identified in your application, as the purpose of the product is to provide analytics and user feedback.

### API

#### Service API

The add-on [`ember-metrics`](https://github.com/poteto/ember-metrics) includes a `metrics` Service, 
which provides the methods:

- `identify(analyticsName?: string | string[], analyticsOptions?: {})`

  For analytics services that have identification functionality.

- `trackEvent(analyticsName?: string | string[], analyticsOptions?: {})`

  This is a general purpose method for tracking a named event in your application.


For both methods: (see [ember-metrics#api](https://github.com/adopted-ember-addons/ember-metrics#api))

- Parameter `analyticsName` is optional and allows you to specifically target analytics Services.

- Parameter `analyticsOptions` is optional and allows you to pass a configuration to the adapter of 
  the targeted analytics Services.


### Activate Pendo

To activate Pendo, you should call the `identify` function provided by the `metrics` service. To do so, your app should contains the following code:

```js
// Call this whenever information about your visitors becomes available
// Use Strings, Numbers, or Bools for value types
this.metrics.identify("Pendo", {
  visitor: {
    id: "VISITOR-UNIQUE-ID" // Required if user is logged in
    // email:        // Optional
    // role:         // Optional

    // You can add any additional visitor level key-values here,
    // as long as it's not one of the above reserved names.
  },

  account: {
    id: "ACCOUNT-UNIQUE-ID" // Highly recommended
    // name:         // Optional
    // planLevel:    // Optional
    // planPrice:    // Optional
    // creationDate: // Optional

    // You can add any additional account level key-values here,
    // as long as it's not one of the above reserved names.
  }
});
```

**Visitor Unique ID**: Replace the `VISITOR-UNIQUE-ID` with the unique visitor or user id from your application. We also recommend adding additional information about your visitor such as their Role (admin, user), email address, and other information you may want to slice your data by, or target user groups by.

**Account Unique ID**: While not required, we highly recommend passing through the account ID or customer ID associated with each visitor. This lets you roll up data by account. In addition, we recommend passing in any additional information about the account, such as the account name (if not obvious from the ID), and other information that may be helpful to slice by, or target to - such as industry, plan price, or any other information. If you do NOT have the notion of an account, just comment out the ID line in account.

The above snippet can be called wherever you want in your application. Here is an example to activate Pendo in a Route:

```js
import Route from "@ember/routing/route";
import { inject as service } from "@ember/service";

export default Route.extend({
  metrics: service(),

  _initPendo(visitorId, accountId) {
    this.metrics.identify("Pendo", {
      visitor: {
        id: visitorId
      },
      account: {
        id: accountId
      }
    });
  },

  model() {
    return this.store.find("user", "me");
  },

  afterModel({ visitorId, accountId }) {
    this._super();
    this._initPendo(visitorId, accountId);
  }
});
```

In this example, `visitorId` and `accountId` are data coming from some `user` payload.

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [MIT License](LICENSE.md).
