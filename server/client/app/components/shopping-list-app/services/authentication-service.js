(function(angular){

    //////////////////////////////////////////////
    //------------- authentication factory ------------
    /////////////////////////////////////////////

    //controller
    function AuthenticationService($http,JwtService,$state){

        
        //register new user function
        function RegisterUserFunction(userCredentials){
            
            //post call to register user on api
            $http.post("http://localhost:8001/api/user/register",userCredentials)
            .then(function(success){
                //get generated token
                var token = success.data.token;

                //save it to local
                JwtService.SaveToken(token);
                
            },
            function(err){
                //todo:catch multiple types of error
                console.log(err);
            });
        }

        //login user
        function LoginUserFunction(userCredentials){
            return $http.post("http://localhost:8001/api/user/login",userCredentials)
            .then(function(success){
                var token = success.data.token;

                JwtService.SaveToken(token);

                $state.go("home");

            },function(err){
                console.warn(err);
            });
        }

        //logout user
        function LogoutUserFunction(){

            JwtService.RemoveToken();
            
        }

        
        


        //return singleton
        return {

            RegisterUser: RegisterUserFunction,
            LoginUser: LoginUserFunction,
            LogoutUser: LogoutUserFunction,
            IsLoggedIn: JwtService.IsLoggedIn()

        };
    }

    AuthenticationService.$inject = ["$http","JwtService","$state"];

    angular.module("shoppingList.services.authentication",["shoppingList.services.jwt"]).factory("AuthService",AuthenticationService);


})(window.angular);