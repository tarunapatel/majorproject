const Listing = require("./models/listing.js");
const {reviewSchema}= require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");
const Review = require("./models/reviews.js");

module.exports.isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        //redirectUrl  save
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","you must be logged in to create listings");
       return res.redirect("/login");
      }
      next();

};
module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};
module.exports.isOwner = async (req,res,next)=>{
    let { id } = req.params;
    let listing = await Listing.findById(id);

    if(!listing.owner.equals(res.locals.currUser._id)){
     req.flash("error","you are not the owner of listing");
     return res.redirect(`/listings/${id}`);
    }
    next();
};
module.exports.validateReview =(req,res,next)=>{
    let{error} = reviewSchema.validate(req.body);
    if(error){
      let errMsg = error.details.map((el) => el.message).join(",");
      throw new ExpressError(400 , errMsg);
    }else{
      next();
    }
  };
  module.exports.isReviewAuthor = async (req,res,next)=>{
    let {id, reviewId } = req.params;
    let review = await Review.findById(reviewId);

    if(!review.author.equals(res.locals.currUser._id)){
     req.flash("error","you are not the author of this review");
     return res.redirect(`/listings/${id}`);
    }
    next();
};