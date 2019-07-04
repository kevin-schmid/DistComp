var express = require('express');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override')
var router = express.Router();
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(bodyParser());
app.use(methodOverride());
app.use(router);
app.use(express.static(path.join(__dirname, 'public')));


mongoose.connect('mongodb+srv://admin:admin@cluster0-u60tn.gcp.mongodb.net/test?retryWrites=true&w=majority');

var Schema = new mongoose.Schema({
    _id    : String,
    user: String,
    games_won   : Number,
    games_lost: Number,
    ranking: Number
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