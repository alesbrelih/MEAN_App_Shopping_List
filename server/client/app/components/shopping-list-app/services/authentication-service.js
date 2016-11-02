(function(angular){

    //////////////////////////////////////////////
    //------------- authentication factory ------------
    /////////////////////////////////////////////

    //controller
    function AuthenticationService($http,JwtService,$state,ToasterService){

        
        //register new user function
        function RegisterUserFunction(userCredentials){
            
            //post call to register user on api
            $http.post("http://localhost:8001/api/user/register",userCredentials)
            .then(function(success){
                //get generated token
                var token = success.data.token;

                //save it to local
                JwtService.SaveToken(token);
                ToasterService.Add("success","Account successfully created.");
                
                $state.go("home");
           
            },
            function(err){
                if(err.data.code==11000)
                {
                    ToasterService.Add("warning","User with this email alredy exists!");
                }
                else{
                    ToasterService.Add("warning","Error registering user!");
                }
               
                
            });
        }

        //login user
        function LoginUserFunction(userCredentials){
            return $http.post("http://localhost:8001/api/user/login",userCredentials)
            .then(function(success){
                var token = success.data.token;

                JwtService.SaveToken(token);


                ToasterService.Add("succes","Login successfull.");
                $state.go("home");

            },function(err){
                ToasterService.Add("warning","Error logging in: "+err.data.message);
            });
        }

        //logout user
        function LogoutUserFunction(){

            JwtService.RemoveToken();


            ToasterService.Add("alert","Logged out.");
        }

        
        


        //return singleton
        return {

            RegisterUser: RegisterUserFunction,
            LoginUser: LoginUserFunction,
            LogoutUser: LogoutUserFunction,
            IsLoggedIn: JwtService.IsLoggedIn()

        };
    }

    AuthenticationService.$inject = ["$http","JwtService","$state","ToasterService"];

    angular.module("shoppingList.services.authentication",["shoppingList.services.jwt"]).factory("AuthService",AuthenticationService);


})(window.angular);