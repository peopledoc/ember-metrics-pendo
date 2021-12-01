'use strict'

module.exports = {
  name: require('./package').name,

  included(parent) {
    this._super.included.apply(this, arguments)
    console.warn(
      `⚠️  DEPRECATION: [ember-metrics-pendo] Please use ember-metrics v1.4.0+ which includes the adapter for Pendo and remove ember-metrics-pendo from your dependencies.
See https://github.com/adopted-ember-addons/ember-metrics for more details.`
    )
    return parent
  },
}
