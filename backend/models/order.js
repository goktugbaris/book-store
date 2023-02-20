let mongoose = require("mongoose");

var Schema = mongoose.Schema;

const orderSchema = new Schema({
    details:String,
    address:{
        type:String,
        required:true,
    },
    postcode:String,
    created:{
        type:Date,
        default:Date.now,
    },
});

module.exports = mongoose.model("Order",orderSchema);