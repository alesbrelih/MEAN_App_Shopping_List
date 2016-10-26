//////////////////////////////////////////////
// Importing modules
//////////////////////////////////////////////

var express = require("express");
var ShoppingList = require("../models/item.model");


////////////////////////////////////////////////
// Init router
///////////////////////////////////////////////
var router = express.Router();

//////////////////////////////////////////////
// Routes for /api/items
////////////////////////////////////////////

//get all items
router.get("/",function(req,res){
    ShoppingList.find(function(err,items){
        if(err) throw new Error("Error at listing items");
        res.send(items);
    });
});

//add new item
router.post("/",function(req,res){
    var reqItem = req.body;
    var newItem = new ShoppingList({
        itemName : reqItem.itemName,
        count : reqItem.count
    });

    newItem.save(function(err, product){
        if(err) throw new Error("Error saving item");
        res.send(product);
    });
});

//get item by id
router.get("/:item_id",function(req,res){
    ShoppingList.findById(req.params.item_id,function(err,item){
        if(err) throw new Error("Failure querying single item.");
        res.json(item);
    });
    
});

//update item for that id
router.put("/:item_id",function(req,res){

    var _id = req.params.item_id;
    
    var reqItem = req.body;
    var newItem = {
        itemName : reqItem.itemName,
        count : reqItem.count
    };


    ShoppingList.findByIdAndUpdate(_id,newItem,{ new : true },function(err,item){
        if(err) throw new Error("Error updating entry.");
        res.send(item);
    });

});

//delete item of that id
router.delete("/:item_id",function(req,res){

    ShoppingList.findByIdAndRemove(req.params.item_id,function(err,item){
        if(err) throw new Error("Error deleting item.");
        res.send(item);

    });

});


//export module for router
module.exports = router;