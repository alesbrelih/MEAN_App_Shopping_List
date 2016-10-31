    //////////////////////////////////////////////////////
    //--------- http interceptor factory -------
    //////////////////////////////////////////////////
(function(angular){

    function ShoppingListHttpInterceptor($q,JwtService,$rootScope){

        return {
            //add header with token on every request if token is present
            "request":function(config){
                if(JwtService.IsLoggedIn()){

                    config.headers.token = JwtService.GetToken();
                }
                return config;
                
            },
            //if unauthorized response then broadcast
            //unauthorized which mainctrl picks up
            //and changes state to auth.login
            "responseError":function(response){
                if (response.status === 401){
                    $rootScope.$broadcast("unauthorized");
                }

                return $q.reject(response);
            }
        };
    }

    ShoppingListHttpInterceptor.$inject = ["$q","JwtService","$rootScope"];

    angular.module("shoppingList.services.httpinterceptor",[]).factory("HttpIntercept",ShoppingListHttpInterceptor);

})(window.angular);  
    