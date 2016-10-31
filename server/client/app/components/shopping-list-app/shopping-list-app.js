(function(angular){
    
     ////////////////////////////////////////////
    // Modules routing
    //////////////////////////////////////////

    //reference to main module
    var app = angular.module("shoppingListApp");




    

    //routing
    app.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/");
    
        $stateProvider
            //modal window... abstract...
            .state("items",{
                template : "<modal-view></modal-view>",
                abstract: true
            })
            //error alert box
            .state("errorAlert",{
                template : "<ng-error-message></ng-error-message>",
                abstract:true
            })
            .state("home", {
                url:"/",
                template:"<item-list></item-list>"
            })
            .state("add", {
                url:"/add",
                template: "<modify-items></modify-items>"
            })
            .state("auth",{
                url:"/auth",
                template: "<user-auth></user-auth>"
            })
            .state("auth.register",{
                url:"/register",
                template:"<user-register></user-register>"
            })
            .state("auth.login",{
                url:"/login",
                template: "<user-login></user-login>"
            });


        
        
    
    }]);

    app.config(["$httpProvider",function($httpProvider){


        $httpProvider.interceptors.push("HttpIntercept");

    }]);

    // check if user is logged in when changing route
    // user doesnt have jwt token
    app.run(CheckIfLoggedIn);

    //check if user is logged in
    function CheckIfLoggedIn($state,JwtService,$rootScope){
        $rootScope.$on("$stateChangeStart",function(event, toState, toParams, fromState, fromParams, options){ 

            //check if state doesnt start with auth and there is no jwt token present
            if(!toState.name.startsWith("auth") && !JwtService.IsLoggedIn())
            {
                event.preventDefault(); //prevent change to happen
                $state.go("auth.login");
            }

        });
        
    }

    //inject needed services
    CheckIfLoggedIn.$inject = ["$state","JwtService","$rootScope"];

    
})(window.angular);


