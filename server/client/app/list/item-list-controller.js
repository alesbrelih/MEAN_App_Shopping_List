(function(angular){

    /////////////////////////////////////////////
    // Item listing controller
    //////////////////////////////////////////

    //controller function

    function ListController(DialogService,ItemsService,$state,AuthService,ToasterService)
    {
        //controller reference, good for async so this value isn't moved in future references
        var ctrl = this;

        ctrl.modalDialog = DialogService;

        //get all items in db using angular factory - query method
        ctrl.ItemsToBuy = ItemsService.query();
        
        //go to add state, where you add new items to list and edit existing ones
        ctrl.EditItems = function(){
            //go to next state
            $state.go("add");
        };

        ////////////////////////////////////////////////////////////////////////////
        //  callback function for when dialog has recieved OK status from modal
        //  items which were checked were bought, so it calls remove item from db factory
        //  also passes the itemlist reference to factory so when it is deleted successfully
        //  its also removed from the list

        function buyItems(){
            ctrl.ItemsToBuy.forEach(function(item){

                //check if item was checked
                if(item.checked){

                    //delete item from db using $resource.$delete on reference object
                    item.$delete(function(){
                        var index = ctrl.ItemsToBuy.indexOf(item);
                        ctrl.ItemsToBuy.splice(index,1);
                    });
                    
                }
            });
        }

        //callback function for when no error removing items from db

        //TODO: create error callback function when error removing items from db
        
        function successfulBuy(){
            ToasterService.Add("success", "Item was successfully bought.");
        }

        // action when we buy items -> click on anchor right
        ctrl.ItemsBought = function(){
            //set dialog to be opened
            ctrl.modalDialog.setType("buy","Selected item/s will be removed from the list.");

            //show dialog
            ctrl.modalDialog.showDialog().then(buyItems).then(successfulBuy);
        
        };

    }

    var app = angular.module("shoppingListApp");

    //component name, since angular uses lowerCamelCase naming, component name will be item-list
    app.component("itemList",{
        //partial html for template
        templateUrl: "static/app/list/item-list.html",

        //controller and dependencies for controller
        controller: ["DialogService","ItemsService","$state","AuthService","ToasterService",ListController]
    });

})(window.angular);

