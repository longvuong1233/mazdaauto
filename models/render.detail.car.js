const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var mongooseDelete = require("mongoose-delete");
const RenderDetailCar = new Schema(
  {
   //idCar: { type: Schema.Types.ObjectId, ref: "Car", required: true },
   textNode: {
    type: [Object]
   }
  },
  {
    timestamps: true,
  }
);
RenderDetailCar.plugin(mongooseDelete, { deletedAt: true, overrideMethods: "all" });
module.exports = mongoose.model("RenderDetailCar", RenderDetailCar);