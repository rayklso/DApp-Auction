var dApp = angular.module("dApp", []);
dApp.service('mySev', function($q) {
     
    var renderDeferred = $q.defer();
    
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
                
                App.listenForEvents();
                
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
                            description: item[2],
                            path: item[3],
                            inProgress: item[4],
                            isOwner: item[5] == App.account,
                            askingPrice: item[6],
                            updatePrice: item[7],
                            bidPrice: item[9]
                        });                  

                    });
                }

                renderDeferred.resolve(deferredItems)

            }).catch(function(error) {
                console.warn(error);
            });
        },
        
        listenForEvents: function() {
            App.contracts.Auction.deployed().then(function(instance) {
                instance.itemEvent({}, {
                    fromBlock: 0,
                    toBlock: 'latest'
                }).watch(function(error, event) {
                    console.log("event triggered", event)
                // Reload when a new vote is recorded
                    App.render();
                    
                });
            });
        },
        
        
        newItem: function(_item) {
            
            App.contracts.Auction.deployed().then(function(instance) {
                return instance.newItem(_item.name, _item.description, _item.path , _item.askingPrice, _item.updatePrice , { from: App.account, gas:3000000 });
            }).then(function(result) {

            }).catch(function(error) {
                console.warn(error);
            });
            
        },
 
        itemStatus: function(_itemId, deferred) {
            
            App.contracts.Auction.deployed().then(function(instance) {
                return instance.items(_itemId)
            }).then(function(item) {
                deferred.resolve({
                    inProgress: item[4],
                    bidPrice: item[9]
                });     
            }).catch(function(error) {
                console.warn(error);
            });
            
        },
        
        bidItem: function(_itemId, deferred) {
            
            App.contracts.Auction.deployed().then(function(instance) {
                instance.bidItem(_itemId, { from: App.account });
                return instance.items(_itemId)
            }).then(function(item) {
                deferred.resolve(item[9]);
            }).catch(function(error) {
                console.warn(error);
            });
            
        },
        
        closeBid: function(_itemId, deferred) {
            
            App.contracts.Auction.deployed().then(function(instance) {
                return instance.closeBid(_itemId, { from: App.account });
            }).then(function(res) {
                deferred.resolve(res);
            }).catch(function(error) {
                console.warn(error);
            });
            
        }
        
    };
    
    App.init();
       
    return {
        
        getItems: function() {
            return renderDeferred.promise;
        },
        
        newItem: function(_item) {
            App.newItem(_item);       
        },
        
        itemStatus: function(_itemId) {
            var deferred = $q.defer();
            App.itemStatus(_itemId, deferred);
            return deferred.promise;            
        },
        
        bidItem: function(_itemId) {
            var deferred = $q.defer();
            App.bidItem(_itemId, deferred);
            return deferred.promise;
        },
        
        closeBid: function(_itemId) {
            var deferred = $q.defer();
            App.closeBid(_itemId, deferred);
            return deferred.promise;        
        }
        
    };
    
    
});