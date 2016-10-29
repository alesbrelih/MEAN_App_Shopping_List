(function(angular){

        //////////////////////////////////////////////
    // Services
    ////////////////////////////////////////////

    function ItemService($resource){
        var ShoppingItems = $resource("http://localhost:8001/api/items/:id",{id:"@_id"},{
            update:{method:"PUT"}
        });
        return ShoppingItems;
    }
    ItemService.$inject = ["$resource"];   

    function DialogService($q){
        return {
            defferedObject : null,
            visible : false,
            // title : "Success",
            showDialog : function(){ 
                this.visible = true;
                if(this.defferedObject)
                {
                    return this.defferedObject.promise; 
                }
            },
            setType : function(type, dialogText){
                if(type !=="message")
                {
                    this.defferedObject = $q.defer();
                }
                
                if(type === "delete")
                {
                    this.dialogType = "danger";
                    this.title = "Danger";
                    this.cancelNeeded = true;
                    this.body = dialogText;
                    this.btnText = "Delete";
                }
                else if(type === "message")
                {
                    this.dialogType = "success";
                    this.title = "Success";
                    this.cancelNeeded = false;
                    this.body = dialogText;
                    this.btnText = "Proceed";
                }
                else if(type == "warningMessage")
                {
                    this.dialogType = "warning";
                    this.title = "Error";
                    this.cancelNeeded = false;
                    this.body = dialogText;
                    this.btnText = "Proceed";
                }
                else if(type === "create")
                {
                    this.dialogType = "alert";
                    this.title = "Alert";
                    this.cancelNeeded = true;
                    this.body = dialogText;
                    this.btnText = "Create";
                }
                else if(type === "buy")
                {
                    this.dialogType = "alert";
                    this.title = "Alert";
                    this.cancelNeeded = true;
                    this.body = dialogText;
                    this.btnText = "Proceed";
                }
                else if(type === "update")
                {
                    this.dialogType = "alert";
                    this.title = "Alert";
                    this.cancelNeeded = true;
                    this.body = dialogText;
                    this.btnText = "Update";
                }
            },
            // setCallback: function(fun){
            //     this.callback = fun;
            // },
            hideDialog: function(){ 
                this.visible = false;
                if(this.defferedObject)
                {
                    this.defferedObject.reject("return");
                    this.defferedObject = null;
                }
                
            },
            // dialogType : "success",
            // cancelNeeded : true,
            // btnText : "Continue",
            // body : "",
            acceptAndClose: function(){
                this.visible = false;
                if(this.defferedObject)
                {
                    this.defferedObject.resolve("return");
                    this.defferedObject = null;
                }
                
            }

            
        };

    }
    DialogService.$inject=["$q"];

    angular.module("shoppingList.services",["ngResource"]).factory("ItemsService",ItemService);
    angular.module("shoppingList.dialogService",[]).factory("DialogService",DialogService);




})(window.angular);

