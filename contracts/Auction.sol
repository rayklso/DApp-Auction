pragma solidity ^0.5.0;

contract Auction {
    // Read/write item
    
    struct Item {
        uint id;
        string name;
        string imgPath;
        uint askingPrice;
        uint bidPrice;
        address highestBidder;
        bool inProgress;
    }
    
    uint public itemsCount;
    
    mapping(uint => Item) public items;
    
    // Constructor
    constructor() public {
        addItem("Item 1", "imgPath", 1000);
        addItem("Item 2", "imgPath", 2000);
    }
    
    function addItem(string memory _name, string memory _imgPath, uint _askingPrice) public {
        itemsCount ++;
        items[itemsCount] = Item(itemsCount, _name, _imgPath, _askingPrice, 0, address(0), true);
    }
    
    function bid(uint _id, uint _bidPrice) public{
    
        require(items[_id].inProgress);
        require(_bidPrice > items[_id].askingPrice && _bidPrice > items[_id].bidPrice);
        
        items[_id].bidPrice = _bidPrice;
        items[_id].highestBidder = msg.sender;
    
    }
}