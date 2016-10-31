(function(angular){


    function UserLoginController(AuthService,$state){
        var ctrl = this;

        ctrl.user = {
            email: "",
            password: ""
        };

        ctrl.login = function(){
            AuthService.LoginUser(ctrl.user);
        };

    }

    UserLoginController.$inject = ["AuthService","$state"];

    
    var app = angular.module("shoppingListApp");

    app.component("userLogin",{
        templateUrl: "static/app/user/login/login-user.html",
        controller: UserLoginController
    });

})(window.angular);
