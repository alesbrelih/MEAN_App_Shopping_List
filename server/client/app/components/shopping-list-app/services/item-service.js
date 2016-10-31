(function(angular){

    //////////////////////////////////////////////
    // Services
    ////////////////////////////////////////////

    function ItemService($resource){
        var ShoppingItems = $resource("http://localhost:8001/api/items/:id",{id:"@_id"},{
            update:{method:"PUT"}
        });
        return ShoppingItems;
    }
    ItemService.$inject = ["$resource"];   

    
    angular.module("shoppingList.services.itemservice",["ngResource"]).factory("ItemsService",ItemService);
    


})(window.angular);