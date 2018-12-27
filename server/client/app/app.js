(function(angular){
    ////////////////////////////////////////////////////
    // Main angular app
    ///////////////////////////////////////////////////

    var dependencies = ["shoppingList.services","ui.router","shoppingListApp.validators","ngAnimate","abToaster.component"];

    angular.module("shoppingListApp", dependencies);

//TODO: add toasts for messages/warnings instead of modal
//TODO: create filter for profile object on header
})(window.angular);

