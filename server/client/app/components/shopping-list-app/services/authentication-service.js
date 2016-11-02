(function(angular){

    //////////////////////////////////////////////
    //------------- authentication factory ------------
    /////////////////////////////////////////////

    //controller
    function AuthenticationService($http,JwtService,$state,ToasterService,$rootScope){

        var _profile = {
            display: ""
        };
        
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
                
                $rootScope.$broadcast("register");
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


                ToasterService.Add("success","Login successfull.");
                
                //broadcast that forces header to get profile nae
                $rootScope.$broadcast("login");

                $state.go("home");

            },function(err){
                ToasterService.Add("warning","Error logging in: "+err.data.message);
            });
        }

        //logout user
        function LogoutUserFunction(){

            JwtService.RemoveToken();
            $rootScope.$broadcast("logout");
            $state.go("auth.login");
            ToasterService.Add("alert","Logged out.");
        }

        
        function GetProfileInfoFunction(){
            $http.post("http://localhost:8001/api/user/profile")
            .then(function(success){
                var user = success.data;
                if(user.name){
                    _profile.display = user.name;
                }
                else{
                    _profile.display = user.email;
                }
            });

            
        }


        //return singleton
        return {

            RegisterUser: RegisterUserFunction,
            LoginUser: LoginUserFunction,
            LogoutUser: LogoutUserFunction,
            IsLoggedIn: JwtService.IsLoggedIn(),
            GetProfileInfo: GetProfileInfoFunction,
            ProfileName : _profile

        };
    }

    AuthenticationService.$inject = ["$http","JwtService","$state","ToasterService","$rootScope"];

    angular.module("shoppingList.services.authentication",["shoppingList.services.jwt"]).factory("AuthService",AuthenticationService);


})(window.angular);