const MongoClient = require('mongodb').MongoClient;
var app = require('express')();
var http = require('http').createServer(app);
const assert = require('assert');
var io = require('socket.io')(http);

// Connecting to mongoDB
const client = new MongoClient("mongodb://localhost:27017/?replicaSet=rs0", {useNewUrlParser: true});
var vehicles = {};
var stats = {};

// express
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

// building connection
io.on('connection', function(socket){
    console.log('a user connected');
    io.emit('allData', vehicles);
    io.emit('stats', stats);

    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
  });

http.listen(4000, function(){
  console.log('listening on *:4000');
});

client.connect((err) =>{
    assert.equal(null, err);
    console.log("Connected successfully to the MongoDB Server");
    const db = client.db('mbta');
    const collection = db.collection("vehicles");

    const stats_status = db.collection("event_stats");

    pipeline = [
      {
        $match: { }
      }
    ];

    // here is for defining change stream
    const changeStream = collection.watch(pipeline);

    // listening to changes implementation
    changeStream.on("change", function(event) {
      vehicles = {...vehicles, 
                [event.fullDocument._id]:{...event.fullDocument, 
                                          coordinates:[event.fullDocument.longitude, event.fullDocument.latitude]} };
      io.emit('changeData', event.fullDocument);
    });
    // here is for defining change stream
    const statusChangeStream = stats_status.watch(pipeline);

    // listening to changes implementation
    statusChangeStream.on("change", function(event) {
      if(typeof event !== "undefined") {
        stats = {...stats, status:{...stats.status, [event.fullDocument._id]:event.fullDocument}};
        io.emit('stats', stats);
      }
      else{
        console.log("_Id undefined", event)
      }
    });
});
 

