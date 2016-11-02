(function(angular){
    ////////////////////////////////////////////////////
    //-----------service that handles toasters ---------
    ///////////////////////////////////////////////////

    //function for toaster factory

    ToasterServiceFunction.$inject = ["$timeout"];
    function ToasterServiceFunction($timeout){
        var _index = 0; //index for toasters
        var _toasters = []; //list of toasters

        //creates toaster
        var _createNewToaster = function(_type,_message){

            //save index which will be used
            var newIndex = ++_index;

            //create toaster
            _toasters.push({
                index: newIndex, 
                type: _type,    //warning,alert,success
                message: _message, //message
                visible: false  
            });

            $timeout(function(){
                //removes toaster after 2s if it wasnt clicked on yet
                _removeToaster(newIndex);
            },2000);

        };
        //remove toaster with index i
        var _removeToaster = function(i){
            //find toaster with index i
            var item = _toasters.filter(function(toast){
                return toast.index == i;
            });
            //if toaster is found
            if(item.length>0){
                //select and remove it from toasters
                item = item[0];
                var itemIndex = _toasters.indexOf(item);
                _toasters.splice(itemIndex,1);
            }
        };

        //public functions from singleton
        return{
            Toasters: _toasters,
            Add:_createNewToaster,
            Remove: _removeToaster
        };
    }

    //create new module for factory

    var toasterServiceModule = angular.module("toasterServiceModule",[]);
    toasterServiceModule.factory("ToasterService",ToasterServiceFunction);

})(window.angular);