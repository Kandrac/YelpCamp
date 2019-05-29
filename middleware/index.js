var Campground=require("../models/campground");
var Comment=require("../models/comment");

// all the middleware goes here
var middlewareObj={};
middlewareObj.checkCampgroundOwnership=function(req, res, next){
        if (req.isAuthenticated()) {
            Campground.findById(req.params.id, function (err, foundCampground) {
                if (err) {
                    req.flash("error","Campground not found");
                    res.redirect("back");
                } else {
                    if(foundCampground.author.id.equals(req.user._id)){
                        next();
                    }else{
                        req.flash("error","Access Denied");
                        res.redirect("back");
                    }   
                }
            });
        } else {
            req.flash("error","You must be logged in the do that");
            res.redirect("back");
        }
    
    
    }

middlewareObj.checkCommentOwnership=function(req, res, next){
        if (req.isAuthenticated()) {
            Comment.findById(req.params.comment_id, function (err, foundComment) {
                if (err) {
                    res.redirect("back")
                } else {
                    if(foundComment.author.id.equals(req.user._id)){
                        next();
                    }else{
                        req.flash("error","You lack permission to do that");
                        res.redirect("back");
                    }   
                }
            });
        } else {
            req.flash("error","You must be logged in");
            res.redirect("back");
        }
    
    
    }
middlewareObj.isLoggedIn=function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You must to be logged in to do that");
    res.redirect("/login");
}

module.exports=middlewareObj;