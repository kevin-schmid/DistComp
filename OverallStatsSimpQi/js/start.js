const express = require('express');

var app = express();
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
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


const server = app.listen(3000, () => {
    console.log(`Express is running on port ${server.address().port}`);
});


const router = express.Router();
const players = mongoose.model('players');

router.get('/players', (req, res) => {
    players.find()
        .then((users) => {
            res.json(users);
        })
        .catch(() => { res.send('Sorry! Something went wrong.'); });
});
