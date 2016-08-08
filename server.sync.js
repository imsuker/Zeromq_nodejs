var zmq = require("zmq");  
var socket = zmq.socket("rep");  
function logToConsole (message) {  
  var d = new Date();
  var time = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() + " "+d.getMilliseconds();
  console.log("[" + time + "] " + message);
}
socket.on("message", function (message) {  
  var text = message.toString('utf8');
  logToConsole('get client message:'+ text);
  setTimeout(function(){
    logToConsole('send message'+ text);
    socket.send('reply:'+text);
  },200);
});
socket.bind("tcp://*:9997", function (error) {  
  if (error) {
    logToConsole("Failed to bind socket: " + error.message);
    process.exit(0);
  }
  else {
    logToConsole("Server listening on port 9997");
  }
});
