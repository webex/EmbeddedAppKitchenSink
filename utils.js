/**
 * Displays a log of information onto the page
 * @param {String} type Label of the information about to be logged
 * @param {Object} data Object that can be JSON stringified
 */
function log(type, data) {
  var ul = document.getElementById("console");
  var li = document.createElement("li");
  var header = document.createElement("p");
  var headerMessage = document.createTextNode(
    `${new Date().toJSON()}: ${type}`
  );
  header.appendChild(headerMessage);
  li.appendChild(header);
  var code = document.createElement("pre");
  var payload = document.createTextNode(`${JSON.stringify(data, "\n", 2)}`);
  code.appendChild(payload);
  li.appendChild(code);
  ul.prepend(li);
}

/**
 * Logs the app object from `new window.Webex.Application();`
 */
function handleDisplayAppInfo() {
  log("Webex Embedded App Application Object", app);
}

/**
 * Calls and logs the user data from `app.context.getUser()`
 */
function handleGetUser() {
  app.context
    .getUser()
    .then((u) => {
      log("getUser()", u);
    })
    .catch((error) => {
      log(
        "getUser() promise failed with error",
        Webex.Application.ErrorCodes[error]
      );
    });
}

/**
 * Calls and logs the meeting data from `app.context.getMeeting()`
 */
function handleGetMeeting() {
  app.context
    .getMeeting()
    .then((m) => {
      log("getMeeting()", m);
    })
    .catch((error) => {
      log(
        "getMeeting() promise failed with error",
        Webex.Application.ErrorCodes[error]
      );
    });
}

/**
 * Calls and logs the space data from `app.context.getSpace()`
 */
function handleGetSpace() {
  app.context
    .getSpace()
    .then((s) => {
      log("getSpace()", s);
    })
    .catch((error) => {
      log(
        "getSpace() promise failed with error",
        Webex.Application.ErrorCodes[error]
      );
    });
}
