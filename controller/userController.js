const User = require('../models/user');
const Plan = require('../models/plan');
const Movies = require('../models/movie');
const nodemailer = require('nodemailer');

module.exports.dashbordsession = function (req, res) {
    
    req.flash('success', ' login succesfully');
    // return res.render('dashboard')
    return res.redirect('/dashboard')

}
module.exports.dashboard = function (req, res) {
    return res.render('dashboard')
};

module.exports.user = async function (req, res) {
    var moviedate = await Movies.find({});
    return res.render('index', {
    data: moviedate
})
    return res.render('index');
}
module.exports.add_user = async function (req, res) {
    const plans = await Plan.find({});
    if (plans) {
        res.render('add_user', { 
            plan: plans
         });
    } else {
        console.error('No plans found');
        res.status(404).send('No plans found');
    }
}

module.exports.insertData = async function (req, res) {
    req.body.name = req.body.fname + " " + req.body.lname;
    let userdata = await User.create(req.body);
    if (userdata) {
    req.flash('success', ' User inserted succesfully..');
        return res.redirect('/view_user');
    }
    else {
        console.log('Error record not add');
    }

}

module.exports.view_user = async (req, res) => {
    let search = '';
    if(req.query.search){
        search = req.query.search;
    }
    var page = 1;
    if(req.query.page){
        page = req.query.page;
    }
    var per_page = 3;
    let recordata = await User.find({
        $or:[
            {name :{$regex : '.*'+search+'.*'}},
            {email :{$regex : '.*'+search+'.*'}}
        ]
    }).populate('plan')
    .skip((page -1)*per_page)
    .limit(per_page)
    .exec();
    let countdata = await User.find({
        $or:[
            {name :{$regex : '.*'+search+'.*'}},
            {email :{$regex : '.*'+search+'.*'}}
        ]
    }).countDocuments();

    return res.render('view_user',{
        'data':recordata,
        'countrecord':Math.ceil(countdata/per_page),
        'searchdata': search,
        'previous': Number(page)-1,
        'next': Number(page)+1,
        'current': Number(page)
    });
}

module.exports.login = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    res.render('login');
}


module.exports.checkmaile = function (req, res) {
    User.findOne({ email: req.body.email }, function (err, userdata) {
        if (err) {
            return res.redirect('/lostpass');
        }
        if (userdata) {
            var otp = Math.ceil(Math.random() * 10000)
            var transport = nodemailer.createTransport({
                host: "sandbox.smtp.mailtrap.io",
                port: 2525,
                auth: {
                    user: "5f6da7ebb8308f",
                    pass: "bcd6b4718657af"
                }
            });
            let info = transport.sendMail({
                from: 'jasminkoladiya098@gmail.com',
                to: userdata.email,
                subject: "testing node email",
                text: "check OTP",
                html: `<b>your OTP:${otp} </b>`,
            });
            res.cookie('otp', otp);
            res.cookie('email', userdata.email);
            req.flash('success', ' OTP Send succesfully..');
            return res.redirect('/checkotp');
        }
        else {
            req.flash('success', ' email not found..');
            return res.redirect('/lostpass');
        }

    })
}

module.exports.checkotp = function (req, res) {
    return res.render('checkotp');
}

module.exports.verifyotp = function (req, res) {
    if (req.body.otp == req.body.otp) {
        return res.redirect('/generatenewpass');
    }
    else {
        req.flash('success', ' OTP not matching');
        return res.redirect('/checkotp');
    }
}

module.exports.generatenewpass = function (req, res) {
    return res.render('generatenewpass');
}

module.exports.resetpassword = function (req, res) {
    if (req.body.npass == req.body.cpass) {
        User.findOne({ email: req.cookies.email }, function (err, record) {
            if (err) {
                console.log(err);
            req.flash('success', 'new password and confirm password not match');
                return res.redirect('back');
            }
            if (record) {
                console.log(record, 'password Created ');
                User.findByIdAndUpdate(record.id, {
                    password: req.body.npass
                }, function (err) {
                    if (err) {
            req.flash('success', 'password not created');
                        return res.redirect('back');
                    }
                    else {
            req.flash('success', ' password created succesfully..');
                        return res.redirect('/login');
                    }
                })
            }
        })
    }
    else {
        console.log("password not created");
        req.flash('success', 'password not created please try again');
        return res.redirect('/generatenewpass');
    }
}

module.exports.registration = function (req, res) {
    res.render('register');

}


module.exports.register = function (req, res) {
    User.findOne({ email: req.body.email }, function (err, data) {
        if (err) {
            console.log(err);
            return false;
        }
        if (data) {
            console.log("Already registr.");
            req.flash('success', ' Already registr');

            return res.redirect('back');
        }

        else {
            var plandata = '';
            if (req.body.plan) {
                plandata = req.body.plan
            }
            else {
                plandata = 'null'
            }
            if (req.body.password == req.body.cpassword) {
                User.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    planid: plandata,
                    mobile: 'null',
                }, function (err, data) {
                    if (err) {
                        console.log(err);
                        return false;
                    }
            req.flash('success', ' register succesfully');
                    return res.redirect('login');
                });
            }
            else {
                console.log("Password not match");
            req.flash('success', ' password not match');
                return res.redirect('back');
            }
        }
    });
}



module.exports.delete_user = async function (req, res) {
    const id = req.params.id;
    const record = await User.findByIdAndDelete(id);
    if (record) {
        req.flash('success', ' User delete succesfully..');
      return res.redirect('back');
    }
    console.log('User not found');
    return res.status(404).send('User not found');
  };
  

module.exports.update_user = function (req, res) {
    User.findById(req.params.id, function (err, data) {
        if (err) {
            console.log("plan not update " + err);
            return false;
        }
        Plan.find({}, function (err, plan) {
            if (err) {
                console.log("Error finding movies:", err);
                return res.status(500).send('something wrong');
            }
            return res.render("update_user", {
                i: data,
                plan: plan
            });
        });
    });
}

module.exports.edite_user = async function (req, res) {
    console.log(req.body);
    let userdata = await User.findByIdAndUpdate(req.body.id,req.body);
    if (userdata) {
        req.flash('success', ' User update succesfully..');
        return res.redirect('/view_user');
    }
    else {
        console.log('Error record not update');
    }
}

module.exports.updatepassword = function (req,res) {
    return res.render('updatepassword')
}
module.exports.changepass = function(req,res){
    var userpass = req.user.password;
    var curentpass = req.body.curentpass;
    var npass = req.body.npass;
    var cpass = req.body.cpass;
    if(userpass ==curentpass){
        if(curentpass != npass)
        {
            if(npass == cpass){
                User.findByIdAndUpdate(req.user.id,{
                    password : npass
                },function(err,passUpdated){
                    if(err){
                        console.log("somethign wrong");
                        return res.redirect('back');
                    }
        req.flash('success', 'password updated');
                    return res.redirect('/logout')
                })
            }
            else{
                console.log("new & confirm  password not match");
                return res.redirect('back');
            }
        }
        else{
            console.log("current or new password are match");
            return res.redirect('back');
        }
    }
    else{
        console.log("current password not match");
        return res.redirect('back');
    }
}
module.exports.profile = async function (req,res) {
    var pdata = await User.findById(req.params.id);
    if(pdata){
        return res.render('profile',{
            data:pdata
        })
    }
    else{
        console.log("data not found ");
    }
}
module.exports.edite_profile = async  function (req,res) {
    console.log(req.body);
    let data = await User.findByIdAndUpdate(req.body.id,req.body);
    if (data) {
        req.flash('success', ' profile update succesfully..');
        return res.redirect('/');
    }
    else {
        console.log('Error record not update');
    }
}