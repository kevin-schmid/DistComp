const express = require('express');
const MongoClient = require('mongodb').MongoClient;

var app = express();
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user: {
        type: String,
    },
    games_won: {
        type: Number,
    },
});

module.exports = mongoose.model('players', userSchema);

app.use(express.static('public'));
var db = 'mongodb+srv://admin:admin@cluster0-u60tn.gcp.mongodb.net/test?retryWrites=true&w=majority';
module.exports = app;

require('dotenv').config();

mongoose.connect(db);
mongoose.Promise = global.Promise;
mongoose.connection
    .on('connected', () => {
        console.log(`Mongoose connection open on ${db}`);
    })
    .on('error', (err) => {
        console.log(`Connection error: ${err.message}`);
    });

const client = new MongoClient(db, { useNewUrlParser: true });
client.connect(err => {
    const collection = client.db("players").collection("players").find({}).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
    });
});

const server = app.listen(3000, () => {
    console.log(`Express is running on port ${server.address().port}`);
});


const router = express.Router();
const players = mongoose.model('players');

app.use(express.static('public'));
app.use('/', router);

module.exports = app;
router.get('/', (req, res) => {

    client.connect(err => {
        const collection = client.db("players").collection("players").find({}).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        res.json(result);
        res.end();
        });
    });
});
