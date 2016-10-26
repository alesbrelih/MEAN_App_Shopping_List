
function ValidateStringController(){
    function link(scope,element,attrs)
    {
        var form = element[0];

        var nodeArrayInputs = form.querySelectorAll("input[type=text]");
        var arrayInputs = Array.prototype.slice.call(nodeArrayInputs);

        var angularInputs = arrayInputs.map(function(item){
            return angular.element(item);
        });

        angularInputs.forEach(function(item){
            ////////////////////////////////////////////////////////
            // HOOK EVENt .ON CHANGE TO FIRE UP NEW FUNCTION WHICH CHECKS IF DATA IS VALID AND SETS CSS FORM.$INVALID IF IT ISNT
            /////////////////////////////////////////////////////////
        });
        // console.log(angularInputs);
        // angular.forEach(input,function(value,key){
        //     console.log(key+": "+value);
        // });
        // console.log(input);
    }
    return {
        restrict: "A",
        link: link
    };
}


var app = angular.module("shoppingListApp.validators",[]);

app.directive("validateStrings",ValidateStringController);

