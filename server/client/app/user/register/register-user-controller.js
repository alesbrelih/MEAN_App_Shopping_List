(function(angular){

    function UserRegisterController(AuthService){

        var ctrl = this;
        
        ctrl.user = {
            email:"",
            password:""
        };

        ctrl.register = function(){
            AuthService.RegisterUser(ctrl.user);
        };

    }

    UserRegisterController.$inject = ["AuthService"];
    var app = angular.module("shoppingListApp");

    app.component("userRegister",{
        templateUrl:"static/app/user/register/register-user.html",
        controller: UserRegisterController
    });
    
})(window.angular);
