//////////////////////////////////////////////
// Services
////////////////////////////////////////////

angular.module("shoppingList.services",["ngResource"]).factory("ShoppingListDb",function($resource){
    var ShoppingItems = $resource("http://localhost:8001/api/items/:id");
    return {
        getItem : function(item_id){
            return item = ShoppingItems.get({id:item_id});
            
        },
        getAllItems : function(){
            return ShoppingItems.query();
            
        }
    };
});
    
// });