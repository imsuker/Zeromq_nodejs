var zmq = require("zmq");  
var socket = zmq.socket("router");  
function logToConsole (message) {  
  var d = new Date();
  var time = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() + " "+d.getMilliseconds();
  console.log("[" + time + "] " + message);
}
socket.on("message", function () {  
  var args = Array.apply(null, arguments);
  logToConsole('get client message:'+args.join(','));
  var message = args[2];
  setTimeout(function(){
    logToConsole('send message'+args[0] +','+  message);
    socket.send([args[0],'reply:'+message]);
  },200);
});
socket.bindSync("tcp://*:9998", function (error) {  
  if (error) {
    logToConsole("Failed to bind socket: " + error.message);
    process.exit(0);
  }
  else {
    logToConsole("Server listening on port 9998");
  }
});
