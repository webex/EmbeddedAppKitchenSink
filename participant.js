var app = new window.Webex.Application();

app.listen('application:displayContextChanged', (payload) => log('application:displayContextChanged', payload))
app.listen('application:shareStateChanged', (payload) => log('application:shareStateChanged', payload))
app.listen('application:themeChanged', (payload) => log('application:themeChanged', payload))
app.listen('meeting:infoChanged', (payload) => log('meeting:infoChanged', payload))
app.listen('meeting:roleChanged', (payload) => log('meeting:roleChanged', payload))
app.listen('space:infoChanged', (payload) => log('space:infoChanged', payload))

function handleGetUser(){
  app.context.getUser().then((u) => log('getUser()', u));
}

function handleGetMeeting(){
  app.context.getMeeting().then((m) => log('getMeeting()', m));
}

function handleGetSpace(){
  app.context.getSpace().then((s) => log('getSpace()', s));
}

function log(type, data) {
  var ul = document.getElementById("console");
  var li = document.createElement("li");
  var payload = document.createTextNode(`${type}: ${JSON.stringify(data)}`);
  li.appendChild(payload)
  ul.prepend(li);
}