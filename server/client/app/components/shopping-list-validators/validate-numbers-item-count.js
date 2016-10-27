/////////////////////////////////////////////////////////////
// ------- VALIDATE NUMBER DIRECTIVE DEFINITION ----------
///////////////////////////////////////////////////////////


//directive controller function
function ValidateNumberController(){

    //link function for when directive is created
    function link(scope,element,attr,ngModelController){

        //validator that model value is really number
        ngModelController.$validators.validateNumber = function(modelValue){
            if(isNaN(modelValue))
            {
                return false;
            }
            return true;
        };
    }
    return{
        //restrict to attribute directive
        restrict:"A",
        //require ngModelController for access to $validators
        require:"ngModel",
        //link function
        link: link
    };
}

// new validation module to be injected into all validators module
angular.module("shoppingListApp.validators.numbers",[]).directive("validateNumber",ValidateNumberController);