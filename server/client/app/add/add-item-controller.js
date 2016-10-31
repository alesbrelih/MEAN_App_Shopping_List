(function(angular){

    /////////////////////////////////////////////////
// Adding items controller
/////////////////////////////////////////////

    function AddController(DialogService,ItemsService,$state){
        var ctrl = this;
        ctrl.modalDialog = DialogService;

        //  editedProp - if it needs to clear edited prop aswell
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
        ctrl.existingItems = ItemsService.query(function(err)
        {
        console.log("sssasasa");
        },function(err2){
            console.log(err2);
        }
        );

        

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

            //if both of inputs are empty string or don't exist then show button
            return (!ctrl.selectedItem.itemName || ctrl.selectedItem.itemName == "") && (!ctrl.selectedItem.count || ctrl.selectedItem.count == "");
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

        //local function to update item in db and set callback if db work successful/rejected
        function updateItemInDb(){
            //set values
            ctrl.currentlyEditedItem.itemName = ctrl.selectedItem.itemName;
            ctrl.currentlyEditedItem.count = ctrl.selectedItem.count;
            //save to DB
            ctrl.currentlyEditedItem.$update(function(){
                //callback dialog that shows it was successfully saved
                ctrl.modalDialog.setType("message", ctrl.currentlyEditedItem.itemName + " updated successfully!");
                ctrl.modalDialog.showDialog();
                clearSelected(true);
            },
            function(err){
                //error handler 
                if(err)
                    {
                    ctrl.modalDialog.setType("warningMessage", "Error updating item: " + err.message);
                    ctrl.modalDialog.showDialog();
                }
            });

        }

        //click on blue pencil
        ctrl.SaveEdit = function(){
            
            //set modal dialog window options
            ctrl.modalDialog.setType("update", "Do you wish to update " + ctrl.currentlyEditedItem.itemName + " ?");

            //open modal window and set callback when successfull function
            ctrl.modalDialog.showDialog().then(updateItemInDb);
            
            
        };

        ///////////////////////////////////////
        // Remove item from db
        //////////////////////////////////////

        function deleteItemInDb(){
            ctrl.currentlyEditedItem.$delete(function(item){
                //success callback
                ctrl.modalDialog.setType("message","Item successfully deleted.");
                ctrl.modalDialog.showDialog();

                //remove item from list
                var itemIndex = ctrl.existingItems.indexOf(item);
                ctrl.existingItems.splice(itemIndex,1);

                clearSelected(true);
            },function(err)
            {
                if(err)
                {
                    ctrl.modalDialog.setType("warningMessage","Error: "+err.message);
                    ctrl.modalDialog.showDialog();   
                }
                ctrl.modalDialog.setType("warningMessage","Error");
                ctrl.modalDialog.showDialog();      
            });
        }

        ctrl.RemoveItem = function(item){
            ctrl.currentlyEditedItem = item;
            ctrl.modalDialog.setType("delete","You are about to delete this item. Do you wish to proceed?");
            ctrl.modalDialog.showDialog().then(deleteItemInDb);
            
        };

        ////////////////////////////////////
        // Saves new item to DB from input fields when not editing item
        ///////////////////////////////////

        //local function that saves data and represents it
        function createItemInDb()
        {
            var newItem = new ItemsService(); //new resource object

            //set item values from input boxes
            newItem.itemName = ctrl.selectedItem.itemName;
            newItem.count = ctrl.selectedItem.count;

            //resource $save method on instance of resource class objects
            newItem.$save(function(item){
                //successfull callback
                
                //show dialog
                ctrl.modalDialog.setType("message","Item successfully saved!");
                ctrl.modalDialog.showDialog();

                //add item to list
                ctrl.existingItems.push(item);
                clearSelected();
            },function(err){
                //if err show err
                if(err)
                {
                    ctrl.modalDialog.setType("warningMessage","Error: "+err.message);
                    ctrl.modalDialog().showDialog();
                }
                else{
                    ctrl.modalDialog.setType("warningMessage","Error");
                    ctrl.modalDialog.showDialog();
                }
            });
        }

        //click on green check <- add new
        ctrl.SaveNew = function(){

            DialogService.setType("create","Do want proceeed saving this item?");
            DialogService.showDialog().then(createItemInDb);
            
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

})(window.angular);
