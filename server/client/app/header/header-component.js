(function(angular){


    /////////////////////////////////////////////////////////////////////////
    // -------- header components that provides profile name and option to logout
    /////////////////////////////////////////////////////////////////////////

    //header controller
    function HeaderComponentCtrl(AuthService,$state,$rootScope){
        var ctrl = this;

        //get info
        AuthService.GetProfileInfo();

        //set profile name
        ctrl.profileName = AuthService.ProfileName;

        /////////////////////////////////
        //// set profile display broadcasts
        ///////////////////////////////////
        $rootScope.$on("login",function(){
            AuthService.GetProfileInfo();
        });
        $rootScope.$on("register",function(){
            AuthService.GetProfileInfo();
        });
        $rootScope.$on("logout",function(){
            ctrl.profileName.display = "";
        });

        

        //logout
        ctrl.logout = function(){
            AuthService.LogoutUser();
        };

    }

    HeaderComponentCtrl.$inject = ["AuthService","$state","$rootScope"];

    var app = angular.module("shoppingListApp");
    app.component("abSlHeader",
        {
            templateUrl:"static/app/header/header-component-template.html",
            controller: HeaderComponentCtrl

        });

})(window.angular);