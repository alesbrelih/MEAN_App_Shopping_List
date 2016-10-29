(function(angular){

    function UserRegisterController(){

        var ctrl = this;
        
        ctrl.user = {
            email:"",
            password:""
        };

    }

    var app = angular.module("shoppingListApp");

    app.component("userRegister",{
        templateUrl:"static/app/user/register/register-user.html",
        controller: UserRegisterController
    });
    
})(window.angular);
