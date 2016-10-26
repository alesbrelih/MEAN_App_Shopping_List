/////////////////////////////////
// Modal window controller/component
/////////////////////////////////

function ModalController()
{

    var ctrl = this;

    //click on cancel button
    ctrl.hide = function()
    {
        //callback
        ctrl.hideDialog();
    };

    //click on submit button
    ctrl.proceed = function(){
        //callback
        ctrl.success();
    };
    
}

angular.module("shoppingListApp").component("modalView",
    {
        templateUrl:"static/app/modal-window/modal-window.html",
        controller : ModalController,
        bindings:{
            // < one way binding for values, @ one way binding for string, & dual way bind for functions
            title: "<",
            modalType:"<",
            btnText:"<",
            body:"<",
            hideDialog:"&",
            success:"&",
            cancelNeeded:"<"
              
        }
    }
);