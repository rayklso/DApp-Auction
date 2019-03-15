var dApp = angular.module("myApp", []);
dApp.service('mySev', function($q) {
     
    var deferred = $q.defer();
    
    App = {
      web3Provider: null,
      contracts: {},
      account: '0x0',

      init: function() {
        return App.initWeb3();
      },

      initWeb3: function() {
        if (typeof web3 !== 'undefined') {
          // If a web3 instance is already provided by Meta Mask.
          App.web3Provider = web3.currentProvider;
          web3 = new Web3(web3.currentProvider);
        } else {
          // Specify default instance if no web3 instance provided
          App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
          web3 = new Web3(App.web3Provider);
        }
        return App.initContract();
      },

      initContract: function() {
        $.getJSON("Auction.json", function(auction) {
          // Instantiate a new truffle contract from the artifact
          App.contracts.Auction = TruffleContract(auction);
          // Connect provider to interact with contract
          App.contracts.Auction.setProvider(App.web3Provider);

          return App.render();
        });
      },

      render: function() {
            var auctionInstance;

            // Load account data
            web3.eth.getCoinbase(function(err, account) {
              if (err === null) {
                App.account = account;
                $("#accountAddress").html("Your Account: " + account);
              }
            });

            // Load contract data
          
            var deferredItems = [];
          
            App.contracts.Auction.deployed().then(function(instance) {
                auctionInstance = instance;
                return auctionInstance.itemsCount();
            }).then(function(itemsCount) {
                var j = 0;
               
                for (var i = 1; i <= itemsCount; i++) {
                    deferredItems.push($q.defer());
                    
                    auctionInstance.items(i).then(function(item) {
                        
                        deferredItems[j++].resolve({
                            id: item[0],
                            name: item[1],
                            imgPath: item[2],
                            inProgress: item[3],
                            askingPrice: item[5],
                            bidPrice: item[7]
                        });                  
        
                    });
                }
                
                deferred.resolve(deferredItems)
                
            }).catch(function(error) {
              console.warn(error);
            });
         
      }
    };
    
    App.init();
     
    
    this.getItems = function(){
        return deferred.promise;
  
    }
});