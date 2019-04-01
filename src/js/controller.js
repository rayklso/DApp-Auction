dApp.controller("pageOneCtrl", function($scope, mySev) {

    $scope.items = [];
 
    mySev.getItems().then(function(dItems){
        
        for(var i=0; i<dItems.length; i++){
            dItems[i].promise.then(function(item){
               
                $scope.items.push({
                    id: item.id.c[0],
                    path: item.path,
                    name: item.name,
                    desc: item.description,
                    isOwner: item.isOwner,
                    askingPrice: item.askingPrice,
                    updatePrice: item.updatePrice
                });
                
            });
        }
    });
    
    AuctionItem = {
        submitText: "Bid",
        submitFun: null
    }
    
    myItem = {
        submitText: "Close Bid",
        submitFun: null
    }
    
    $scope.itemPopup = {}
    
    $scope.show = function(i) {
        $scope.ind = i;
        mySev.itemStatus($scope.items[i].id).then(function(item){   
            $scope.bidPrice = item.bidPrice.c[0];
        });  
    }

        
    $scope.bid = function() {
        mySev.bidItem($scope.items[$scope.ind].id).then(function(bidPrice){
            $scope.bidPrice = bidPrice.c[0];
        });     
    }    


//page two
    
    
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

