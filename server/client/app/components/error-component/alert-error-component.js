////////////////////////////////////////////
// ------------ ALERT ERROR BOX COMPOENENT  -----------------
/////////////////////////////////////////////////

//controller for component
function errorMessageController(){
    //dont need anything because we gonna bind only value we need, and its property is created dynamically
}

//inject component to main app
angular.module("shoppingListApp").component("ngErrorMessage",{
    //template url
    templateUrl:"static/app/components/error-component/alert-error-component.html",

    //controller
    controller:errorMessageController,
    bindings:{

        //binding we need - error message
        errorText:"@"
    }
});