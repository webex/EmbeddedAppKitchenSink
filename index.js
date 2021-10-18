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
    app.context.getUser().then((u) => log('getUser()', u));
}

function handleGetMeeting() {
    app.context.getMeeting().then((m) => log('getMeeting()', m));
}

function handleGetSpace() {
    app.context.getSpace().then((s) => log('getSpace()', s));
}

function handleSetShare() {
    var url = document.getElementById("shareUrl").value
    app.setShareUrl(url, url, 'Embedded App Kitchen Sink');
    log('setShareUrl()', { message: 'shared url to participants panel', url: url })
}

function handleClearShare() {
    app.clearShareUrl();
    log('clearShareUrl()', { message: 'share url has been cleared' })
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

function getCookieValue() {
    let myValue = document.getElementById("cookieField").value;
    log("My cookie value: ", myValue);
    return myValue;
}

function handleSetCookie() {
    let myCookieValue = getCookieValue();
    setCookie("testcookie", myCookieValue, 365);
    log('Cookie set!', myCookieValue);
} // End handleSetCookie()

function handleGetCookie() {
    let myCookie = getCookie("testcookie");
    log('Cookie get! ', myCookie);
} // End handleGetCookie()

function handleClearCookie() {
    document.cookie = "testcookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
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
    setLocalStorage("testLocalStorage", myValue);
    log('localStorage set!', myValue);
}
function handleGetLocalStorage(){
    let myValue = document.getElementById("localField").value;
    log('localStorage get!', myValue);
    return getLocalStorage(myValue);
}

function handleClearLocalStorage(){
    log('localStorage cleared!', myValue);
    window.localStorage.clear();
}

function deleteLocalStorageItem(key){
    window.localStorage.removeItem(key);
}
function getLocalStorage(keyName){
    const myStorage = window.localStorage.getItem(keyName);
    return myStorage;
}

function setLocalStorage(key, value){
    window.localStorage.setItem(key,value);
}

/** sessionStorage! **/

function handleSetSessionStorage(){
    let myValue = document.getElementById("sessionField").value;
    setSessionStorage("exampleKey", myValue);
    log('sessionStorage set!', myValue);
}
function handleGetSessionStorage(){
    let myValue = document.getElementById("sessionField").value;
    log('sessionStorage get!', myValue);
    return getSessionStorage(myValue);
}

function handleClearSessionStorage(){
    log('sessionStorage cleared!', myValue);
    window.sessionStorage.clear();
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