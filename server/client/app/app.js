////////////////////////////////////////////////////
// Main angular app
///////////////////////////////////////////////////

var app = angular.module("shoppingListApp",["shoppingList.services","ui.router"]);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
 
    $stateProvider
        .state('home', {
            url:'/',
            templateUrl: 'static/app/list/item-list.html'
        })
        .state('about', {
            url:'/about',
            templateUrl: "static/app/add/add-item.html"
        })
 
}]);