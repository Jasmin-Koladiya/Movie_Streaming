const { render } = require("ejs");
var express = require("express");
const passport = require("passport");
const path = require("path")
var routes = express.Router();
var watchlistController = require("../controller/watchlistController");
var UserController = require("../controller/userController") ;
routes.get("/",passport.checkAuthenticon, watchlistController.user);
routes.get("/add_watchlist",passport.checkAuthenticon, watchlistController.add_watchlist);
routes.get("/view_watchlist",passport.checkAuthenticon, watchlistController.view_watchlist);
routes.post("/insertData",passport.checkAuthenticon, watchlistController.insertData);
routes.get('/delete_watchlist/:id',passport.checkAuthenticon,watchlistController.delete_watchlist)
routes.get('/update_watchlist/:id',passport.checkAuthenticon,watchlistController.update_watchlist)   
routes.post('/update_watchlistdata',passport.checkAuthenticon,watchlistController.update_watchlistdata)
routes.get( "/updatepassword",passport.checkAuthenticon,UserController.updatepassword)
module.exports = routes;
