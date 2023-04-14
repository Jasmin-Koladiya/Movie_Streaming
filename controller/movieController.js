var fs = require('fs');
var path = require('path');
const Movie = require('../models/movie');
module.exports.add_movie = function (req, res) {
    return res.render('add_movie');
}
module.exports.view_movie = function (req, res) {
    Movie.find({}, function (err, record) {
            if (err) {
                console.log(err);
                return false;
            }
            return res.render('view_movie', {
                data: record
    
            });
        });
}
module.exports.insertData = async function (req,res) {
    Movie.uploadAvatar(req, res, function () {
       
        if (req.file) {
            imgPath = Movie.avatarpath + "/" + req.file.filename;
        }
        Movie.create({
            movie_name: req.body.movie_name,
            type:req.body.type,
            description:req.body.description,
            avatar: imgPath
        }, function (err) {
            if (err) {
                console.log(err);
                return false;
            }
        });
        req.flash('success', ' Movie add succesfully..');

        return res.redirect('view_movie');
    });


}
module.exports.delete_movie = function(req, res){


    var id = req.params.id;
    Movie.findById(id, function (err, record) {
        if (record.avatar) {
            fs.unlinkSync(path.join(__dirname, "..", record.avatar));
        }
        Movie.findByIdAndDelete(id, function (err, data) {
            if (err) {
                console.log(err);
                return false;
            }
        req.flash('success', ' Movie delete succesfully..');
            return res.redirect('back');
        });
    });
}


module.exports.updateData = async function (req, res) {

    let Update =  await Movie.findById(req.params.id);
    if (Update) {
        return res.render('update_movie', {
                    data: Update
                });
    }
    else{
        console.log('record not update');
    }

}

module.exports.editData = function (req, res) {

    Movie.uploadAvatar(req, res, function () {
       
        if (req.file) {
            Movie.findById(req.body.id, function (err, data) {
                if (err) {
                    console.log(err);
                    return false;
                }
                if (data.avatar) {
                    fs.unlinkSync(path.join(__dirname, "..", data.avatar));
                }
                var imgPath = Movie.avatarpath + "/" + req.file.filename;
                Movie.findByIdAndUpdate(req.body.id, {
                    movie_name: req.body.movie_name,type:req.body.type,
                    description:req.body.description,
                     avatar: imgPath
                }, function (err) {
                    if (err) {
                        console.log(err);
                        return false;
                    }
        req.flash('success', ' Movie update succesfully..');
                    return res.redirect('view_movie');
                });
            });
        }
        else {
            Movie.findById(req.body.id, function (err, data) {
                if (err) {
                    console.log(err);
                    return false;
                }
                if (data.avatar) {
                    imgPath = data.avatar;
                }
                Movie.findByIdAndUpdate(req.body.id, {
                    movie_name: req.body.movie_name,type:req.body.type,
                    description:req.body.description,
                    avatar: imgPath,
                }, function (err) {
                    if (err) {
                        console.log(err);
                        return false;
                    }
        req.flash('success', ' Movie update succesfully..');
                    return res.redirect('view_movie');
                });
            });
        }
    });
}