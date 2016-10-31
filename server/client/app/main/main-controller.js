(function(angular){

    //controlls authorization on application
    function MainController($state,$rootScope,AuthService){

        //if unauthorized broadcast 
        $rootScope.$on("unauthorized",function(){

            //remove jwt token
            AuthService.LogoutUser();

            //change state
            $state.go("auth.login");
        });
    }

    MainController.$inject = ["$state","$rootScope","AuthService"];

    angular.module("shoppingListApp").controller("MainCtrl",MainController);

})(window.angular);