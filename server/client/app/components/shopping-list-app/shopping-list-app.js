////////////////////////////////////////////
// Modules routing
//////////////////////////////////////////

//reference to main module
var app = angular.module("shoppingListApp");

//routing
app.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
 
    $stateProvider
    //module state... abstract...
        .state("items",{
            template : "<modal-view></modal-view>",
            abstract: true
        })
        .state("home", {
            url:"/",
            template:"<item-list></item-list>"
        })
        .state("add", {
            url:"/add",
            template: "<modify-items></modify-items>"
        });
        
 
}]);
