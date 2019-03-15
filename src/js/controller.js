dApp.controller("myCtrl", function($scope, mySev) {

    $scope.items = [];
    mySev.getItems().then(function(dItems){
        for(var i=0; i<dItems.length; i++){
            dItems[i].promise.then(function(item){
               
                $scope.items.push({
                    path: item.imgPath,
                    title: item.name
                });
                
            });
        }
        
    });

});

