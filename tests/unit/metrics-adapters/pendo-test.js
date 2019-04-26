import { module, test } from "qunit";
import { setupTest } from "ember-qunit";
import sinon from "sinon";
import Pendo from "ember-metrics-pendo/metrics-adapters/pendo";

let sandbox, config;

module("Unit | Metrics Adapter | pendo adapter", function(hooks) {
  setupTest(hooks);
  hooks.beforeEach(function() {
    sandbox = sinon.createSandbox();
    config = {
      apiKey: "123456789"
    };
  });
  hooks.afterEach(function() {
    sandbox.restore();
  });

  test("#identify calls `pendo.initialize()` with the right arguments", function(assert) {
    let adapter = Pendo.create({ config });
    let stub = sandbox.stub(window.pendo, "initialize").callsFake(() => {
      return true;
    });
    adapter.identify({
      visitor: {
        id: 123,
        role: "employee"
      },
      account: {
        id: "def1abc2",
        env: "development"
      }
    });
    assert.ok(
      stub.calledWith({
        visitor: {
          id: 123,
          role: "employee"
        },
        account: {
          id: "def1abc2",
          env: "development"
        }
      }),
      "it sends the correct arguments"
    );
  });
});
