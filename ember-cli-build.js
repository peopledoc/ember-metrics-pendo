"use strict";

const EmberAddon = require("ember-cli/lib/broccoli/ember-addon");

module.exports = function (defaults) {
  let app = new EmberAddon(defaults, {
    // This fixes a test failure that began appearing after upgrading
    // ember-auto-import, which stopped automatically enabling webpack
    // polyfills in v1.4.0. See the URLs below for more details:
    // https://github.com/ef4/ember-auto-import#i-upgraded-my-ember-auto-import-version-and-now-things-dont-import-what-changed
    autoImport: {
      webpack: {
        node: {
          global: true,
        },
      },
    },
  });

  /*
    This build file specifies the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

  return app.toTree();
};
