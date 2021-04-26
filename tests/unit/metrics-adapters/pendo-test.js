import { module, test } from "qunit"
import { setupTest } from "ember-qunit"
import sinon from "sinon"
import Pendo from "ember-metrics-pendo/metrics-adapters/pendo"

let config

module("Unit | Metrics Adapter | pendo adapter", function(hooks) {
  setupTest(hooks)
  hooks.beforeEach(function() {
    config = {
      apiKey: "123456789"
    }
  })

  test("#identify calls `pendo.initialize()` with the right arguments", function(assert) {
    let adapter = Pendo.create({ config })
    let stub = sinon.stub(window.pendo, "initialize").callsFake(() => {
      return true
    })
    adapter.identify({
      visitor: {
        id: 123,
        role: "employee"
      },
      account: {
        id: "def1abc2",
        env: "development"
      }
    })
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
    )
  })

  test("#trackEvent calls `pendo.track` with the right arguments", function(assert) {
    let adapter = Pendo.create({ config })
    window.pendo.track = () => {} // doesn't have a track method unless it's a real api key etc
    let stub = sinon.stub(window.pendo, "track").callsFake(() => {
      return true
    })
    adapter.trackEvent({
      event: 'ClickedThing',
      prop1: 'ThingID',
      prop2: 'ThingValue'
    })
    assert.ok(
      stub.calledWith('ClickedThing', {
        prop1: 'ThingID',
        prop2: 'ThingValue'
      }),
      "it sends the correct arguments"
    )
  })

})
