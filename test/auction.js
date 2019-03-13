var Auction = artifacts.require("./Auction.sol");

contract("Auction", function(accounts) {
  var auctionInstance;

  it("initializes with two items", function() {
    return Auction.deployed().then(function(instance) {
      return instance.itemsCount();
    }).then(function(count) {
      assert.equal(count, 2);
    });
  });

  it("it initializes the items with the correct values", function() {
    return Auction.deployed().then(function(instance) {
      auctionInstance = instance;
      return auctionInstance.items(1);
    }).then(function(item) {
      assert.equal(item[0], 1, "contains the correct id");
 //     assert.equal(item[1], "Item 1", "contains the correct name");
//      assert.equal(item[2], "imgPath", "contains the correct image path");
      assert.equal(item[3], true, "contains the correct image path");
      //assert.equal(item[4], 0, "contains the correct owner's address");
      assert.equal(item[5], 1000, "contains the correct asking price");    
      //assert.equal(item[6], 0, "contains the correct bidder's address");
      assert.equal(item[7], 0, "contains the correct bid price");
      
      return auctionInstance.items(2);
    }).then(function(item) {
      assert.equal(item[0], 2, "contains the correct id");
//      assert.equal(item[1], "Item 2", "contains the correct name");
//      assert.equal(item[2], "imgPath", "contains the correct image path");
      assert.equal(item[3], true, "contains the correct image path");
      //assert.equal(item[4], 0, "contains the correct owner's address");
      assert.equal(item[5], 2000, "contains the correct asking price");    
      //assert.equal(item[6], 0, "contains the correct bidder's address");
      assert.equal(item[7], 0, "contains the correct bid price");
    });
  });
});