var express = require('express');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://localhost/Company');

var Schema = new mongoose.Schema({
    _id    : String,
    name: String,
    age   : Number
});

var user = mongoose.model('emp', Schema);

app.get('/view', function(req, res){
    user.find({}, function(err, docs){
        if(err) res.json(err);
        else    res.render('index', {users: docs});
    });
});

var server = http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});