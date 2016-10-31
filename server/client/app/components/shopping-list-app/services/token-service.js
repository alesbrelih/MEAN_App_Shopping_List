(function(angular){
    ///////////////////////////////////////
    // Token service which controlls JWT token, also needed in authservice
    /////////////////////////////////////////
    function TokenServiceController($window){

        var localStorageKey = "jwt"; //local storage key of jwt token

        //check if logged
        function IsLoggedInFunction(){
            if($window.localStorage.getItem(localStorageKey))
            {
                return true;
            }
            return false;
        }


        //gets token
        function GetTokenFunction(){

            var token = $window.localStorage.getItem(localStorageKey);
            return token;
        }

        //remove token
        function RemoveTokenFunction(){
            if($window.localStorage.getItem(localStorageKey))
            {
                $window.localStorage.removeItem(localStorageKey);
            }
        }

        //saves token locally
        function SaveTokenFunction(token){
            $window.localStorage.setItem(localStorageKey,token);
        }

        //returned singleton
        return {
            GetToken: GetTokenFunction,
            IsLoggedIn: IsLoggedInFunction,
            RemoveToken: RemoveTokenFunction,
            SaveToken: SaveTokenFunction
        };
    }

    //inject window into angular for lcoal storage
    TokenServiceController.$inject = ["$window"];

    angular.module("shoppingList.services.jwt",[]).factory("JwtService",TokenServiceController);
})(window.angular);