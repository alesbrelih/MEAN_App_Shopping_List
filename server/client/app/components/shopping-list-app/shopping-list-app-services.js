(function(angular){

    angular.module("shoppingList.services",
    ["shoppingList.services.dialogService",
    "shoppingList.services.itemservice","shoppingList.services.authentication",
    "shoppingList.services.httpinterceptor",
    "toasterServiceModule"]);

})(window.angular);

