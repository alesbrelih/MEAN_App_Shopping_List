(function(angular){
    ////////////////////////////////////////////////////
    // Main angular app
    ///////////////////////////////////////////////////

    var dependencies = ["shoppingList.services","ui.router","shoppingListApp.validators","ngAnimate"];

    angular.module("shoppingListApp", dependencies);

//TODO: add toasts for messages/warnings instead of modal
})(window.angular);

