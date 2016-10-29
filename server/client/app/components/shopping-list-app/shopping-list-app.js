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
})(window.angular);


