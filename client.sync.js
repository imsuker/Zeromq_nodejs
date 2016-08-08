var zmq = require("zmq");  
var counter = 0;
var socket = zmq.socket("req");
function logToConsole (message) {  
  var d = new Date();
  var time = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() + " "+d.getMilliseconds();
  console.log("[" + time + "] " + message);
}
// Handle monitor error
socket.on('monitor_error', function(err) {
    console.log('Error in monitoring: %s, will restart monitoring in 5 seconds', err);
    setTimeout(function() { socket.monitor(500, 0); }, 5000);
});

// Call monitor, check for events every 500ms and get all available events.
console.log('Start monitoring...');
socket.monitor(500, 0);
socket.on("message", function (message) {  
  logToConsole("Received message: " + message.toString("utf8"));
});
socket.on('connect' ,function(){
  console.log('client connect success');
  setInterval(function () { 
    counter++;
    socket.send(counter); 
    logToConsole("send message:"+counter);
  }, 100);

});
// Connect to the server instance.
socket.connect('tcp://127.0.0.1:9997');  

