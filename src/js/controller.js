dApp.controller("pageOneCtrl", function($scope, mySev) {

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

}).controller("pageTwoCtrl", function($scope, mySev) {

    $scope.auctionImg = "img/auction.png";    
    $scope.amountOptions = ["10", "50", "100", "500", "1000", "5000", "10000"];

    function emptyItem() {
        $scope.item = {
            name: "",
            description: "",
            path: "img/i1.png",
            askingPrice: 0,
            updatePrice: $scope.amountOptions[0]
        }   
    }
    emptyItem();
  
    $scope.newAuction = function() {
        $scope.item.updatePrice = parseInt($scope.item.updatePrice);
        mySev.newItem($scope.item);
        window.location.reload();
    }
    $scope.clear = function() {
        emptyItem();
    }
    

});

