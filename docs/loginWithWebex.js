// Client ID for Webex Samples Github (Replace with your own for local development)
const APP_CLIENT_ID =
  "C54b07a2723a0ab16261de45f7631d8d343ee51ed7bed7f8d71d18e9e7cd0b110";

/**
 * Button click handler for Login with Webex
 */
function handleLoginWithWebex() {
  openLoginWithWebexAuthURL();
}

/**
 * Checks for the JWT token returned from Login With Webex and decodes it if it exists
 * @returns
 */
function parseJwtFromURLHash() {
  let params = new URLSearchParams(window.location.hash.substring(1));
  let token = params.get("id_token");

  if (!token) return;

  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  const loginWithWebexToken = JSON.parse(jsonPayload);
  log("Login with Webex Token Detected", loginWithWebexToken);
}

/**
 * Generates and opens the Login with Webex authorization URL
 */
function openLoginWithWebexAuthURL() {
  // Remove trailing "/" from pathname
  const path = window.location.pathname === "/" ? "" : window.location.pathname;

  let callback = window.location.origin + path;

  const authURL =
    "https://webexapis.com/v1/authorize?" +
    "response_type=id_token" +
    "&client_id=" +
    APP_CLIENT_ID +
    "&redirect_uri=" +
    encodeURIComponent(callback) +
    "&scope=openid%20email" +
    "&state=" +
    Math.random() +
    "&nonce=" +
    Math.random();

  window.location.href = authURL;
}
