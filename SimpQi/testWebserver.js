const express =  require('express');
const fs = require('fs');

var server = express();

server.use(express.static('./'))
server.get('/', function(req, res) {
    var self = this;
    fs.readFile('index.html', (data) => res.send(data));
});


var http = server.listen(8080, function() {
   var host = http.address().address;
   var port = http.address().port;
   console.log(`Server lauft auf Port ${port}`);
});
