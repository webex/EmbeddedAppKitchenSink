"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var eventListeners = {};
var getDataResolve;
var getDataTimeoutID;

function messageEventListener(event) {
  // Only handle events from the parent
  if (event.source !== window.parent) return; // Handle data being sent from mock

  if (event.data.type === 'DATA') {
    // do something with event.data.data
    clearTimeout(getDataTimeoutID);
    getDataResolve(event.data.data);
  } // Handle simulated events


  if (event.data.type === 'EVENT') {
    if (eventListeners[event.data.event.eventName] && eventListeners[event.data.event.eventName] instanceof Function) {
      eventListeners[event.data.event.eventName](event.data.event.eventPayload);
    }
  }
}

window.addEventListener('message', messageEventListener);

function getMockDataFromEmulator() {
  // Tell the emulator to send us the latest data
  window.parent.postMessage({
    action: 'SEND_DATA'
  }, "*");
  return new Promise(function (resolve, reject) {
    getDataTimeoutID = setTimeout(function () {
      reject(new Error('Timed out waiting for data from "server"'));
    }, 5000);
    getDataResolve = resolve;
  });
}

var Context = /*#__PURE__*/function () {
  function Context() {
    _classCallCheck(this, Context);
  }

  _createClass(Context, [{
    key: "getUser",
    value:
    /**
     * Gets the current Webex user
     * @returns {Promise.<WebexUser>}
     */
    function getUser() {
      return getMockDataFromEmulator().then(function (data) {
        return data.user;
      });
    }
  }, {
    key: "getMeeting",
    value: function getMeeting() {
      return getMockDataFromEmulator().then(function (data) {
        return data.meeting;
      });
    }
  }, {
    key: "getSpace",
    value: function getSpace() {
      return getMockDataFromEmulator().then(function (data) {
        return data.space;
      });
    }
  }]);

  return Context;
}();

var Application = /*#__PURE__*/function () {
  function Application() {
    _classCallCheck(this, Application);

    this.ErrorCodes = {
      "SUCCESS": 0,
      "GENERIC_ERROR": 1,
      "INVALID_ARGUMENT": 2,
      "EVENT_ALREADY_REGISTERED": 3,
      "EVENT_UNKNOWN": 4,
      "SESSION_ALREADY_STARTED": 5,
      "BAD_CONTEXT": 6
    };
    this.ApplicationTheme = {
      "DARK": 0,
      "LIGHT": 1
    };
    this.sdkVersion = '1';
    this.about = 'Webex App, Version: 41.8.0.19299';
    this.deviceType = 'DESKTOP';
    this.isPrivateDataAvailable = false;
    this.displayContext = 'MEETING_SIDEBAR';
    this.language = 'en-US';
    this.isShared = false;
    this.capabilities = [];
    this.context = new Context();
    this.theme = this.ApplicationTheme.DARK;
  }

  _createClass(Application, [{
    key: "onReady",
    value: function onReady() {
      return Promise.resolve();
    }
  }, {
    key: "setShareUrl",
    value: function setShareUrl(internalUrl, externalUrl, title, optional) {
      // Post a message to the emulator to load the participant url
      window.parent.postMessage({
        action: 'SESSION_URL',
        internalUrl: internalUrl,
        externalUrl: externalUrl,
        title: title,
        optional: optional
      }, "*");
    }
  }, {
    key: "clearShareUrl",
    value: function clearShareUrl() {
      window.parent.postMessage({
        action: 'CLEAR_SESSION_URL'
      }, "*");
    }
  }, {
    key: "listen",
    value: function listen(eventName, callback) {
      // Add listener to collection
      eventListeners[eventName] = callback;
    }
  }]);

  return Application;
}();

var WebexEmbeddedAppEmulatorFramework = {
  Application: Application
};
window.Webex = WebexEmbeddedAppEmulatorFramework;