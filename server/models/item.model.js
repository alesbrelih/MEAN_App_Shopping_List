//import mongoose
var mongoose = require("mongoose");

//declare usage of shemas for ORM
var Schema = mongoose.Schema;


///////////////////
//new schema
//////////////////
var ShoppingItemSchema = new Schema(
    {
        itemName : String,
        count : { type:Number, default:1 },
        date : { type:Date,default:Date.now }
    }
);

//////////////////////
// Export schema
/////////////////////
var ShoppingItem = mongoose.model("ShoppingItem",ShoppingItemSchema);
module.exports = ShoppingItem;