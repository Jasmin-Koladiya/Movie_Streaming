var mongoose = require('mongoose');
var multer = require('multer');
var path = require('path');

var watchlistSchema = mongoose.Schema({
    userid:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    movies : {
        type : Array,
        required : true
    },
    date : {
        type : String,
        required : true
    }
});

var watchlist = mongoose.model('Watchlist', watchlistSchema);

module.exports = watchlist;