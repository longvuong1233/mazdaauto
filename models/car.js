const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var mongooseDelete = require("mongoose-delete");
const Car = new Schema(
  {
    name: { type: String, maxLength: 255 },
    title: { type: String, maxLength: 255 },
    length: { type: String, maxLength: 255 },
    fuel: { type: String, maxLength: 255 },
    performance: { type: String, maxLength: 255 },
    img: { type: String },
    price: { type: String, maxLength: 255 },
    filter: { type: String, maxLength: 255 },
    detailInfo: { type: String },

    
  },
  {
    timestamps: true,
  }
);
Car.plugin(mongooseDelete, { deletedAt: true, overrideMethods: "all" });
module.exports = mongoose.model("Car", Car);