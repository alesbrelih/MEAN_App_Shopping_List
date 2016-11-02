    //////////////////////////////////////////////////////
    //--------- http interceptor factory -------
    //////////////////////////////////////////////////
(function(angular){

    function ShoppingListHttpInterceptor($q,JwtService,$rootScope,ToasterService){

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
                    //unauthorized broadcast
                    $rootScope.$broadcast("unauthorized");

                    //header gets profile name ""
                    $rootScope.$broadcast("logout");

                    //set toaster
                    ToasterService.Add("alert","Please login.");
                }

                return $q.reject(response);
            }
        };
    }

    ShoppingListHttpInterceptor.$inject = ["$q","JwtService","$rootScope","ToasterService"];

    angular.module("shoppingList.services.httpinterceptor",[]).factory("HttpIntercept",ShoppingListHttpInterceptor);

})(window.angular);  
    