const { render } = require("ejs");
var express = require("express");
const passport = require("passport");
const path = require("path")
var routes = express.Router();
var movieController = require("../controller/movieController");
var UserController = require("../controller/userController");
routes.get("/add_movie",passport.checkAuthenticon, movieController.add_movie);
routes.get("/view_movie",passport.checkAuthenticon, movieController.view_movie);
routes.post("/insertData",passport.checkAuthenticon, movieController.insertData);
routes.get("/delete_movie/:id",passport.checkAuthenticon, movieController.delete_movie);
routes.get(  "/updateData/:id",passport.checkAuthenticon,movieController.updateData);
routes.post("/editData",passport.checkAuthenticon, movieController.editData);
routes.get( "/updatepassword",passport.checkAuthenticon,UserController.updatepassword)
module.exports = routes;
