const Joi = require('joi');


const imageSchema = Joi.object({
    filename: Joi.string().default('listingimage'),
    url: Joi.string().allow("", null)
  });
 const listingSchema= Joi.object({
    listing :Joi.object({
  title: Joi.string().required(),
  description : Joi.string().required(),
  location : Joi.string().required(),
  country: Joi.string().required(),
  price : Joi.number().required().min(0),
  image : imageSchema
}).required(),
});
module.exports = {
    imageSchema,
    listingSchema
  };
  module.exports.reviewSchema =  Joi.object({
    review : Joi.object({
      rating : Joi.number().required().min(1).max(5),
      comment: Joi.string().required()
    }).required()
  })