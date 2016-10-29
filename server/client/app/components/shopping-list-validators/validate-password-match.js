(function(angular){
    
    /////////////////////////////////////////////////////////////
    // ------- VALIDATE PASSWORD MATCH DEFINITION ----------
    ///////////////////////////////////////////////////////////


    //directive controller
    function PasswordsMatchController(){

        //link function
        function link(scope, element, attr,ngModelCtrl){
            
            //validator
            ngModelCtrl.$validators.passwordMatch = function(modelValue){
                //check if watched value matches input
                if(scope.firstPwdValue !== modelValue){
                    return false;
                }    
                return true;
            };

            //if first value changes, we need to revalidate
            scope.$watch("firstPwdValue",function(){
                ngModelCtrl.$validate();
            });
            

        }

        return{
            restrict: "A", // restrict to attribute
            require:"ngModel", //access to ngModel in link function (provides setting validators)
            scope:{
                firstPwdValue: "<abPwdMatch" //need to pass value to watch
            },
            link: link
        };
    }


    //module creating
    angular.module("shoppingListApp.validators.passwordMatch",[]).directive("abPwdMatch",PasswordsMatchController);

})(window.angular);

