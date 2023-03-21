// Check URL Hash for Login with Webex Token
parseJwtFromURLHash();

const app = new window.Webex.Application();

app.onReady().then(() => {
  log("onReady()", { message: "host app is ready" });

  // Listen and emit any events from the EmbeddedAppSDK
  app.listen().then(() => {
    app.on("application:displayContextChanged", (payload) =>
      log("application:displayContextChanged", payload)
    );
    app.on("application:shareStateChanged", (payload) =>
      log("application:shareStateChanged", payload)
    );
    app.on("application:themeChanged", (payload) =>
      log("application:themeChanged", payload)
    );
    app.on("meeting:infoChanged", (payload) =>
      log("meeting:infoChanged", payload)
    );
    app.on("meeting:roleChanged", (payload) =>
      log("meeting:roleChanged", payload)
    );
    app.on("space:infoChanged", (payload) => log("space:infoChanged", payload));
  });
});

/**
 * Sets the share url to the value entereed in the "shareUrl" element.
 * @returns
 */
function handleSetShare() {
  if (app.isShared) {
    log("ERROR: setShareUrl() should not be called while session is active");
    return;
  }
  var url = document.getElementById("shareUrl").value;
  app
    .setShareUrl(url, url, "Embedded App Kitchen Sink")
    .then(() => {
      log("setShareUrl()", {
        message: "shared url to participants panel",
        url: url,
      });
    })
    .catch((error) => {
      log(
        "setShareUrl() failed with error",
        Webex.Application.ErrorCodes[error]
      );
    });
}

/**
 * Clears the share url
 */
function handleClearShare() {
  app
    .clearShareUrl()
    .then(() => {
      log("clearShareUrl()", { message: "share url has been cleared" });
    })
    .catch((error) => {
      log(
        "clearShareUrl() failed with error",
        Webex.Application.ErrorCodes[error]
      );
    });
}

/**
 * Sets the presentation URL
 */
async function handleSetPresentationUrl() {
  if (app.isShared) {
    log("ERROR: setShareUrl() should not be called while session is active");
    return;
  }
  var url = document.getElementById("shareUrl").value;
  let meeting = await app.context.getMeeting();
  meeting.setPresentationUrl(url, "My Presentation", Webex.Application.ShareOptimizationMode.AUTO_DETECT, false)
    .then(() => {
      log("setPresentationUrl()", {
        message: "presented url to participants panel",
        url: url,
      });
    })
    .catch((error) => {
      log(
        "setPresentationUrl() failed with error",
        Webex.Application.ErrorCodes[error]
      );
    });
}

/**
 * Clears the set presentation url
 */
async function handleClearPresentationUrl() {
  let meeting = await app.context.getMeeting();
  meeting.clearPresentationUrl()
    .then(() => {
      log("clearPresentationUrl()", {
        message: "cleared url to participants panel",
        url: url,
      });
    })
    .catch((error) => {
      log(
        "clearPresentationUrl() failed with error",
        Webex.Application.ErrorCodes[error]
      );
    });
}
