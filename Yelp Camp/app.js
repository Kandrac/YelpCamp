var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
var campgrounds=[
    {name: "Findley State Park", image:"https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwjJk9_hq6TiAhVP-qwKHQofA3EQjRx6BAgBEAU&url=http%3A%2F%2Fwww.friendsoffindley.org%2F&psig=AOvVaw03GroFl74pDd_A1hfITjq9&ust=1558243559836516"},
    {name: "Mohican State Park", image:"https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwi3zbjGq6TiAhUCIqwKHS8dDH0QjRx6BAgBEAU&url=https%3A%2F%2Fwww.mohicantrailsclub.org%2Fmohican-regional-trail-guide.html&psig=AOvVaw3zh5SYu2AV41EIMyg8vrfG&ust=1558243484425749"},  
    {name: "Zion National Park", image:"https://www.google.com/maps/uv?hl=en&pb=!1s0x80caead08844f8d9%3A0x7c2e3a15aa3656f5!2m22!2m2!1i80!2i80!3m1!2i20!16m16!1b1!2m2!1m1!1e1!2m2!1m1!1e3!2m2!1m1!1e5!2m2!1m1!1e4!2m2!1m1!1e6!3m1!7e115!4shttps%3A%2F%2Flh5.googleusercontent.com%2Fp%2FAF1QipP_LHf-xNPZ-iv2asy_QOBs0xY0zhW7f5lPIQm8%3Dw238-h160-k-no!5szion%20national%20park%20-%20Google%20Search!15sCAQ&imagekey=!1e10!2sAF1QipP_LHf-xNPZ-iv2asy_QOBs0xY0zhW7f5lPIQm8&sa=X&ved=2ahUKEwiX5t3oq6TiAhVQKqwKHb_PCxgQoiowIXoECAsQBg#"}
];
app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    var campgrounds=[
        {name: "Findley State Park", image:"https://homepages.cae.wisc.edu/~ece533/images/baboon.png"},
        {name: "Mohican State Park", image:"https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwi3zbjGq6TiAhUCIqwKHS8dDH0QjRx6BAgBEAU&url=https%3A%2F%2Fwww.mohicantrailsclub.org%2Fmohican-regional-trail-guide.html&psig=AOvVaw3zh5SYu2AV41EIMyg8vrfG&ust=1558243484425749"},  
        {name: "Zion National Park", image:"https://www.google.com/maps/uv?hl=en&pb=!1s0x80caead08844f8d9%3A0x7c2e3a15aa3656f5!2m22!2m2!1i80!2i80!3m1!2i20!16m16!1b1!2m2!1m1!1e1!2m2!1m1!1e3!2m2!1m1!1e5!2m2!1m1!1e4!2m2!1m1!1e6!3m1!7e115!4shttps%3A%2F%2Flh5.googleusercontent.com%2Fp%2FAF1QipP_LHf-xNPZ-iv2asy_QOBs0xY0zhW7f5lPIQm8%3Dw238-h160-k-no!5szion%20national%20park%20-%20Google%20Search!15sCAQ&imagekey=!1e10!2sAF1QipP_LHf-xNPZ-iv2asy_QOBs0xY0zhW7f5lPIQm8&sa=X&ved=2ahUKEwiX5t3oq6TiAhVQKqwKHb_PCxgQoiowIXoECAsQBg#"}
    ]

    res.render("campgrounds",{campgrounds:campgrounds});
});

    // get data from the form and add to campgrounds array
    // redirect back to capgrounds ripute
app.post("/campgrounds", function(req, res){
   var name= req.body.name;
   var image=req.body.image;
   var newCampground={name:name, image:image}
   campgrounds.push(newCampground)
   res.redirect("/campgrounds");
});

app.get("/campgrounds/new",function(req, res){
    res.render("new.ejs");
});

app.listen(process.env.PORT || 3000, process.env.IP, function(){
    console.log("YelpCamp server has started!")
});