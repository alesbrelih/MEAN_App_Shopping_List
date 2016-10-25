/////////////////////////////////////////////////
// Adding items controller
/////////////////////////////////////////////

function AddController(DialogService,ItemsService,$state){
    var ctrl = this;
    ctrl.modalDialog = DialogService;

    function clearSelected(editedProp){
        ctrl.selectedItem = {
            itemName : "",
            count : ""
        };
        //if it needs to clear edited prop aswell
        if(editedProp)
        {
            ctrl.currentlyEditedItem = null;
        }
    }

    /////////////////////
    // sets and clears selected / edited item <- semi constructor
    ////////////////////
    clearSelected();


    //query all items from db
    ctrl.existingItems = ItemsService.query();

    

    ///////////////////////////////////
    // Check function to hide/show edit or save buttons for item from input fields
    ///////////////////////////////////
    ctrl.EditMode = function(){
        return ctrl.currentlyEditedItem != null;
    };

    ////////////////////////////////
    // Check flag if clear selection should be avaliable
    ////////////////////////////////
    ctrl.ClearSelectionNotAvaliable = function(){
        return ctrl.selectedItem.itemName == "" && ctrl.selectedItem.count == "";
    };

    ///////////////////////////////
    // Selects item to edit from item list 
    //and puts its values to selectedItems input fields
    //////////////////////////////
    ctrl.EditItem = function(item){
        ctrl.currentlyEditedItem = item;
        ctrl.selectedItem = {itemName : item.itemName,count:item.count};

    };

    //////////////////////////////////////////
    // Saves changes on edited item
    /////////////////////////////////////////
    ctrl.SaveEdit = function(){
        
        //set modal dialog window options
        ctrl.modalDialog.setType("update", "Do you wish to update " + ctrl.currentlyEditedItem.itemName + " ?");
        //set callback if dialog status is OK
        ctrl.modalDialog.setCallback(function(){
            //set values
            ctrl.currentlyEditedItem.itemName = ctrl.selectedItem.itemName;
            ctrl.currentlyEditedItem.count = ctrl.selectedItem.count;
            //save to DB
            ItemsService.update(ctrl.currentlyEditedItem,function(){
                
                //callback dialog that shows it was successfully saved
                ctrl.modalDialog.setType("message", ctrl.currentlyEditedItem.itemName + " updated successfully!");
                ctrl.modalDialog.setCallback(null);
                ctrl.modalDialog.showDialog();
                clearSelected(true);
                
            }, function(err){
                //error handler 
                if(err)
                {
                    ctrl.modalDialog.setType("warningMessage", "Error updating item: " + err.message);
                    ctrl.modalDialog.setCallback(null);
                    ctrl.modalDialog.showDialog();
                }
            }); 
        });
        ctrl.modalDialog.showDialog();
        
    };

    ///////////////////////////////////////
    // Remove item from db
    //////////////////////////////////////
    ctrl.RemoveItem = function(item){
        item.$delete(function(){
            var itemIndex = ctrl.existingItems.indexOf(item);
            ctrl.existingItems.splice(itemIndex,1);
        });
    };

    ////////////////////////////////////
    // Saves new item to DB from input fields when not editing item
    ///////////////////////////////////
    ctrl.SaveNew = function(){

        var newItem = new ItemsService(); //new resource object

        //set item values
        newItem.itemName = ctrl.selectedItem.itemName;
        newItem.count = ctrl.selectedItem.count;

        newItem.$save(function(item){
            //successfull callback
            ctrl.existingItems.push(item);
            clearSelected();
        });
    };

    //////////////////////////////////////////
    // Clears selection on X
    //////////////////////////////////////////
    ctrl.ClearSelection = function(){
        clearSelected(true);
    };

    ctrl.BackToList = function(){
        $state.go("home");
    };
}

///////////////////////////////
//configuring component
///////////////////////////////////
var app = angular.module("shoppingListApp");

app.component("modifyItems",{
    templateUrl: "static/app/add/add-item.html",
    controller: ["DialogService","ItemsService","$state",AddController]
});