const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const reviewController = require("../controllers/reviews.js");

// const {imageSchema} = require("../schema.js");

const Review = require("../models/reviews.js");
const Listing = require("../models/listing.js");
const {validateReview , isLoggedIn,isReviewAuthor} = require("../middleware.js");
const { isValidObjectId } = require("mongoose");


//review route
router.post("/" ,isLoggedIn, validateReview , wrapAsync (reviewController.createReview));

//delete review route
router.delete("/:reviewId" ,isLoggedIn,isReviewAuthor, wrapAsync(reviewController.destroyReview));
 
module.exports = router;