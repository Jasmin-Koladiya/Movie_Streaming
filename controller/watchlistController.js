
const User = require('../models/user');
const Movie = require('../models/movie');
const Watchlist = require('../models/watchlist');
const Plan = require('../models/plan');
module.exports.user = function (req, res) {
    return res.render('dashboard');
}
module.exports.add_watchlist = function (req, res) {
    User.find({}, function (err, users) {
        if (err) {
            console.log(err);
            return res.status(500).send('Internal Server Error');
        }

        Movie.find({}, function (err, movies) {
            if (err) {
                console.log(err);
                return res.status(500).send('Internal Server Error');
            }

            return res.render('add_watchlist', {
                users: users,
                movies: movies
            });
        });
    });    
}

module.exports.insertData = async function (req,res) {
    Watchlist.create(req.body,function(err,watchlistdata){
        if(err){
            console.log(err);
            return false ;
        }
        req.flash('success', ' Watchlist add succesfully..');
        return res.redirect('back')
    });
}

module.exports.delete_watchlist = function (req, res){
    var id = req.params.id;
    Watchlist.findByIdAndDelete(id, function (err,record){
        if (err){
            console.log("watchlist not deleted"+err);
            return false;
        }
        req.flash('success', ' Watchlist delete succesfully..');
        return res.redirect('back')
    })
}

module.exports.update_watchlist = function(req, res) {
    Watchlist.findById(req.params.id, function(err, watchlist) {
      if (err) {
        console.log("Error finding watchlist:", err);
        return res.status(500).send('Internal Server Error');
      }
  
      Movie.find({}, function(err, movies) {
        if (err) {
          console.log("Error finding movies:", err);
          return res.status(500).send('Internal Server Error');
        }
  
        return res.render("update_watchlist", {
            watchlist: watchlist,
          movies : movies
        });
      });
    });
  };
  
  module.exports.update_watchlistdata = function (req, res) {
    Watchlist.findByIdAndUpdate(req.body.id, req.body, function(err, watchlist) {
        if (err) {
            console.log("Error updating watchlist:", err);
            return false;
        }
        req.flash('success', ' Watchlist updated succesfully..');

        return res.redirect('view_watchlist');
    });
}



module.exports.view_watchlist = async (req, res) => {
        var  data = await Watchlist.find({}).populate('userid').exec();
    return res.render('view_watchlist',{
        data : data
    });
}

