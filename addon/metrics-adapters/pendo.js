import { assign } from "@ember/polyfills"
import { assert } from "@ember/debug"
import BaseAdapter from "ember-metrics/metrics-adapters/base"

export default BaseAdapter.extend({
  toStringExtension() {
    return "Pendo"
  },

  init() {
    let config = assign({}, this.config)
    let { apiKey } = config

    assert(
      `[ember-metrics] You must pass a valid \`apiKey\` to the ${this.toString()} adapter`,
      apiKey
    )

    /* eslint-disable */
    (function(p,e,n,d,o){var v,w,x,y,z;o=p[d]=p[d]||{};o._q=[];
    v=['initialize','identify','updateOptions','pageLoad'];for(w=0,x=v.length;w<x;++w)(function(m){
    o[m]=o[m]||function(){o._q[m===v[0]?'unshift':'push']([m].concat([].slice.call(arguments,0)));};})(v[w]);
    y=e.createElement(n);y.async=!0;y.src=`https://cdn.pendo.io/agent/static/${apiKey}/pendo.js`;
    z=e.getElementsByTagName(n)[0];z.parentNode.insertBefore(y,z);})(window,document,'script','pendo');
    /* eslint-enable */
  },

  identify(options = {}) {
    window.pendo.initialize(options)
  },

  trackEvent(options = {}) {
    const { event } = options
    delete options.event
    window.pendo.track(event, options)
  },

  willDestroy() {
    document.querySelector('script[src*="pendo.js"]').remove()
    delete window.pendo
  }
})
