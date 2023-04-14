const { render } = require("ejs");
var express = require("express");
const passport = require("passport");
const path = require("path")
var routes = express.Router();
var UserController = require("../controller/userController");
routes.post(    "/creatsession",    passport.authenticate("local", { failureRedirect: "/login" }),    UserController.dashbordsession  );
routes.get("/", UserController.  user);
routes.get("/dashboard",passport.checkAuthenticon,UserController.dashboard)
routes.get("/add_user",passport.checkAuthenticon, UserController.add_user);
routes.get("/view_user",passport.checkAuthenticon, UserController.view_user);
routes.post("/insertData",passport.checkAuthenticon, UserController.insertData);
routes.get( "/updatepassword",passport.checkAuthenticon,UserController.updatepassword)
routes.post("/changepass",passport.checkAuthenticon,UserController.changepass)
routes.get("/profile/:id",passport.checkAuthenticon,UserController.profile)
routes.post("/edite_profile",passport.checkAuthenticon,UserController.edite_profile)
routes.get("/login", UserController.login);
routes.get("/lostpass",function(req, res){
    return res.render('lostpass')
  })
  routes.post('/checkmaile',UserController.checkmaile)
  routes.get('/checkotp',UserController.checkotp);
routes.post('/verifyotp', UserController.verifyotp);
routes.get('/generatenewpass',UserController.generatenewpass)
routes.post('/resetpassword', UserController.resetpassword);
routes.get("/logout", function (req, res, next) {
    req.logout(function (err) {
      if (err) {
        console.log("function not run");
       
      }
      return res.redirect("/login");
    });
  });
  routes.get("/register", UserController.registration);
routes.post("/registerdata", UserController.register);
routes.get('/delete_user/:id',UserController.delete_user)
routes.get('/update_user/:id',UserController.update_user)   
routes.post('/edite_user',UserController.edite_user)
module.exports = routes;
