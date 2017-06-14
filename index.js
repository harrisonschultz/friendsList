var express = require("express")
var app = express();
var http = require('http').Server(app);

app.use(express.static(__dirname));
app.get('/', function(req,res){
    res.sendFile(__dirname + '/index.html')
});
//use whichever port the server is on or port 3000 is there is no current port
http.listen(process.env.PORT|| 3000, function(){
    console.log('Listening on port *:3000');
});