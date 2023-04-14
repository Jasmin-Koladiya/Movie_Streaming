const { urlencoded } = require('express');
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const port = 8963;
const passport = require('passport');
const app = express();
const mongoose = require('mongoose');
// const db = require('./config/mongoose');
mongoose.connect("mongodb+srv://jasminkoladiya:jasminkoladiya098@cluster0.bamfqbm.mongodb.net/CRM" , {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("DB connected!...");
}).catch(err => {
    console.log("Error connecting to DB:", err);
});
const passportLocal = require('./config/passport_local_strategy');
const flash = require('connect-flash');
var custom = require('./config/middleware');
const session = require('express-session');
app.use(session({
    name : "jasmin",
    secret : "node",
    resave : true,
    saveUninitialized : false,
    Cookie :{
        maxAge : 100*60*1000
    }
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser)

app.use(flash());
app.use(custom.setFlash);
app.use(express.static('assets'));
app.use(urlencoded());  
app.use(cookieParser());
app.use('/', require('./routes/user'));
app.use('/movie', require('./routes/movie'));
app.use('/plan', require('./routes/plan'));
app.use('/user', require('./routes/user'));
app.use('/subscription', require('./routes/subscription'));
app.use('/watchlist', require('./routes/watchlist'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/uploads', express.static(path.join(__dirname,'uploads')));
app.listen(port, function(err){
    if(err)
    {
        console.log(err);
        return false;
    }
    console.log("Server is running on port = " +port);
});
