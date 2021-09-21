var app = new window.Webex.Application();

app.onReady().then(() => {
  log('onReady()', {message:'host app is ready'})
  app.listen().then(() => {
    app.on('application:displayContextChanged', (payload) => log('application:displayContextChanged', payload));
    app.on('application:shareStateChanged', (payload) => log('application:shareStateChanged', payload));
    app.on('application:themeChanged', (payload) => log('application:themeChanged', payload));
    app.on('meeting:infoChanged', (payload) => log('meeting:infoChanged', payload));
    app.on('meeting:roleChanged', (payload) => log('meeting:roleChanged', payload));
    app.on('space:infoChanged', (payload) => log('space:infoChanged', payload));
  })
});

function handleGetUser(){
  app.context.getUser().then((u) => log('getUser()', u));
}

function handleGetMeeting(){
  app.context.getMeeting().then((m) => log('getMeeting()', m));
}

function handleGetSpace(){
  app.context.getSpace().then((s) => log('getSpace()', s));
}

function handleSetShare(prod) {
  var url = document.getElementById("shareUrl").value
  app.setShareUrl(url, url, 'Embedded App Kitchen Sink');
  log('setShareUrl()', {message:'shared url to participants panel',url:url})
}

function handleClearShare() {
  app.clearShareUrl();
  log('clearShareUrl()', {message:'share url has been cleared'})
}

function log(type, data) {
  var ul = document.getElementById("console");
  var li = document.createElement("li");
  var payload = document.createTextNode(`${type}: ${JSON.stringify(data)}`);
  li.appendChild(payload)
  ul.prepend(li);
}
