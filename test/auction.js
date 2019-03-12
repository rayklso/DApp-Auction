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
      assert.equal(item[1], "Item 1", "contains the correct name");
      assert.equal(item[2], "imgPath", "contains the correct image path");
      assert.equal(item[3], 1000, "contains the correct asking price");
      assert.equal(item[4], 0, "contains the correct image path");
      assert.equal(item[5], 0, "contains the correct image path");
      assert.equal(item[6], true, "contains the correct image path");
      return auctionInstance.items(2);
    }).then(function(item) {
      assert.equal(item[0], 2, "contains the correct id");
      assert.equal(item[1], "Item 2", "contains the correct name");
      assert.equal(item[2], "imgPath", "contains the correct image path");
      assert.equal(item[3], 2000, "contains the correct asking price");
      assert.equal(item[4], 0, "contains the correct image path");
      assert.equal(item[5], 0, "contains the correct image path");
      assert.equal(item[6], true, "contains the correct image path");
    });
  });
});