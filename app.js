var express          = require("express"),
    app              = express(),
    bodyParser       = require("body-parser"),
    mongoose         = require("mongoose")
    Campground       = require("./models/campground")
    Comment          = require("./models/comment"),
    passport         = require("passport"),
    LocalStrategy    = require("passport-local"),
    methodOverride   = require("method-override"),
    User             = require("./models/user"),
    seedDB           = require("./seeds")
// Requiring routes 

var commentRoutes    =require("./routes/comments");
var campgroundRoutes =require("./routes/campgrounds");
var indexRoutes      =require("./routes/index");
                
                

mongoose.connect("mongodb://localhost:27017/yelp_camp",{useNewUrlParser:true});
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname +"/public"));
app.use(methodOverride("_method"));
//seedDB();

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret:"Detective Pikachu",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});


//   Campground.create(
//     {"name": "Yellowstone",
//     "image": "https://www.yellowstonepark.com/.image/t_share/MTU0ODMzMDA2MjMyNjEwODAx/ys-grand-prismatic_tamtroyhendrickson_700.jpg",
//         description:"geysers, lots of camprounds, great hiking !!!"
//     }, function(err, campground){
//         if(err){
//              console.log(err);  
//          }else{
//             console.log("new campground created");
//             console.log(campground);
//         }
//      });



app.use("/",indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);

app.listen(process.env.PORT || 3000, process.env.IP, function(){
    console.log("YelpCamp server has started!")
});