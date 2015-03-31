// Require our dependencies
var express = require('express'),
  http = require('http')

// Create an express instance and set a port variable
var app = express();
var port = process.env.PORT || 3000;

// Set handlebars as the templating engine
app.set('view engine', 'jade');
app.engine('html', require('jade').__express);

// Index Route
app.get('/', function(req,res){
  res.sendFile(__dirname+'/views/index.html');
});

// Set /public as our static content dir
app.use(express.static("public"));

// Fire it up (start our server)
var server = http.createServer(app).listen(port, "0.0.0.0", function() {
  console.log('Express server listening on port ' + port);
});
// Initialize socket.io
var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
  console.log('client connected')
    socket.on('taskUpdated', function (data) {
        socket.broadcast.emit('taskUpdated',data)
        socket.on('disconnect', function(){ console.log('client disconnected')});
    });
});
