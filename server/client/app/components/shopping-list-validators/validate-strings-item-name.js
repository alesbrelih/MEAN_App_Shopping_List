(function(angular)
{
     /////////////////////////////////////////////////////////////
    // ------- VALIDATE STRING DIRECTIVE DEFINITION ----------
    ///////////////////////////////////////////////////////////


    //directive controller function
    function ValidateStringController(){

        // local function that checks strings
        // inputString - value to be checked
        function checkString(inputString)
        {
            // chars that shouldnt be in string
            var invalidReg = /^[^\/\\%&]*$/;

            //compares string to invalid reg
            // match == null if chars in invalid reg are inside string
            // else returns string
            var match = inputString.match(invalidReg);

            //returned string, string matches criteria
            if(match)
            {
                return true;
            }

            //return false - string doesnt match
            return false;
        }

        //link function that runes when directive is created
        function link(scope,element,attrs,ngModelController)
        {
            //validator for string
            ngModelController.$validators.validateString = function(modelValue)
            {
                //calls predefined local function
                var validModel = checkString(modelValue);
                if(validModel)
                {
                    return true;
                }
                return false;
            };
        }
        return {
            //limit to attribute
            restrict: "A",

            //access to ngmodel controller inside link function
            require:"ngModel",

            //link function
            link: link
        };
    }


    //create directive and validator strings module to inject into main validators module
    var app = angular.module("shoppingListApp.validators.strings",[]);

    app.directive("validateString",ValidateStringController);


})(window.angular);
