(function(angular){

    ///////////////////////////////////////////////////////////////////////
    // -------- toaster component - wrapper for toaster messages-------------
    ////////////////////////////////////////////////////////////////////


    //toaster controller
    function ToasterComponentController(ToasterService){
        var ctrl = this;

        //set toaster list to service toaster list
        ctrl.Toasters = ToasterService.Toasters;
    }

    //inject toaster service
    ToasterComponentController.$inject = ["ToasterService"];

    var component = angular.module("abToaster.component",["abToaster.msg"]);
    component.component("abToasters",{
        templateUrl:"static/app/components/toaster-component/toaster-component.html",
        controller:ToasterComponentController
    });

})(window.angular);