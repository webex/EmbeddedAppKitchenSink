const COOKIE_NAME = "webex_kitchen_sink_cookie";
const LOCAL_STORAGE_NAME = "webex_kitchen_sink_localstorage";
const SESSION_STORAGE_NAME = "webex_kitchen_sink_sessionstorage";

var app = new window.Webex.Application();

app.onReady().then(() => {
    log('onReady()', { message: 'host app is ready' })
    app.listen().then(() => {
        app.on('application:displayContextChanged', (payload) => log('application:displayContextChanged', payload));
        app.on('application:shareStateChanged', (payload) => log('application:shareStateChanged', payload));
        app.on('application:themeChanged', (payload) => log('application:themeChanged', payload));
        app.on('meeting:infoChanged', (payload) => log('meeting:infoChanged', payload));
        app.on('meeting:roleChanged', (payload) => log('meeting:roleChanged', payload));
        app.on('space:infoChanged', (payload) => log('space:infoChanged', payload));
    })
});

function handleGetUser() {
    app.context.getUser().then((u) => {
        log('getUser()', u);
    }).catch((error) => {
        log('getUser() promise failed with error', Webex.Application.ErrorCodes[error]);
    })
}

function handleGetMeeting() {
    app.context.getMeeting().then((m) => {
        log('getMeeting()', m);
    }).catch((error) => {
        log('getMeeting() promise failed with error', Webex.Application.ErrorCodes[error]);
    });
}

function handleGetSpace() {
    app.context.getSpace().then((s) => {
        log('getSpace()', s);
    }).catch((error) => {
        log('getSpace() promise failed with error', Webex.Application.ErrorCodes[error]);
    });
}

function handleSetShare() {
    if (app.isShared) {
      log('ERROR: setShareUrl() should not be called while session is active');
      return;
    }
    var url = document.getElementById("shareUrl").value;
    app.setShareUrl(url, url, 'Embedded App Kitchen Sink').then(() => {
        log('setShareUrl()', { message: 'shared url to participants panel', url: url })
    }).catch((error) => {
        log('setShareUrl() failed with error', Webex.Application.ErrorCodes[error]);
    });
}

function handleClearShare() {
    app.clearShareUrl().then(() => {
        log('clearShareUrl()', { message: 'share url has been cleared' })
    }).catch((error) => {
        log('clearShareUrl() failed with error', Webex.Application.ErrorCodes[error]);
    });
}

function handleDisplayAppInfo() {
    log('Display Application', app);
}

function log(type, data) {
    var ul = document.getElementById("console");
    var li = document.createElement("li");
    var payload = document.createTextNode(`${type}: ${JSON.stringify(data)}`);
    li.appendChild(payload)
    ul.prepend(li);
}

/** Cookies! **/

function getCookieInputValue() {
    let myValue = document.getElementById("cookieField").value;
    return myValue;
}

function handleSetCookie() {
    let myCookieValue = getCookieInputValue();
    setCookie(COOKIE_NAME, myCookieValue, 365);
    log('Cookie set!', myCookieValue);
} // End handleSetCookie()

function handleGetCookie() {
    let myCookie = getCookie(COOKIE_NAME);
    log('Cookie get! ', myCookie);
} // End handleGetCookie()

function handleClearCookie() {
    document.cookie = `${COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    log('Cookie cleared!', document.cookie);
} // End handleClearCookie()



/** Source: https://www.w3schools.com/js/js_cookies.asp **/
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

/** localStorage! **/

function handleSetLocalStorage(){
    let myValue = document.getElementById("localField").value;
    setLocalStorage(LOCAL_STORAGE_NAME, myValue);
    log('localStorage set!', myValue);
}
function handleGetLocalStorage(){
    let myValue = getLocalStorage(LOCAL_STORAGE_NAME);
    log('localStorage get!', myValue);
}

function handleClearLocalStorage(){
    deleteLocalStorageItem(LOCAL_STORAGE_NAME);
    log('localStorage cleared!', getLocalStorage(LOCAL_STORAGE_NAME));
}

function deleteLocalStorageItem(key){
    window.localStorage.removeItem(key);
}

function getLocalStorage(keyName){
    const myStorage = window.localStorage.getItem(keyName);
    return myStorage;
}

function setLocalStorage(key, value){
    window.localStorage.setItem(key, value);
}

/** sessionStorage! **/

function handleSetSessionStorage(){
    let myValue = document.getElementById("sessionField").value;
    setSessionStorage(SESSION_STORAGE_NAME, myValue);
    log('sessionStorage set!', myValue);
}
function handleGetSessionStorage(){
    let myValue = getSessionStorage(SESSION_STORAGE_NAME);
    log('sessionStorage get!', myValue);
}

function handleClearSessionStorage(){
    deleteSessionStorageItem(SESSION_STORAGE_NAME);
    log('sessionStorage cleared!', getSessionStorage(SESSION_STORAGE_NAME));
}

function deleteSessionStorageItem(key){
    window.sessionStorage.removeItem(key);
}
function getSessionStorage(keyName){
    const myStorage = window.sessionStorage.getItem(keyName);
    return myStorage;
}

function setSessionStorage(key, value){
    window.sessionStorage.setItem(key,value);
}