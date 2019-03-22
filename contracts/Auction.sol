pragma solidity ^0.5.0;

contract Auction {
    
    struct Item {
        uint id;                            //Item's ID
        string name;                        //Item's name
        string imgPath;                     //Item's image path
        bool inProgress;                    //Is auction in progress
        
        address owner;
        uint askingPrice;
        uint updatePrice;
        
        address highestBidder;
        uint bidPrice;
        
    }
    
    uint public itemsCount;
    
    mapping(uint => Item) public items;
    
    // Constructor
    constructor() public {
        addItem("IPhone X", "img/i1.png", 1000, 100);
        addItem("Watch", "img/i2.png", 2000, 100);
    }

    modifier onlyOwner(uint _id) {
        require (msg.sender != items[_id].owner);
        _;
    }

    function addItem(string memory _name, string memory _imgPath, uint _askingPrice, uint _updatePrice) public {
        itemsCount ++;
        items[itemsCount] = Item(itemsCount, _name, _imgPath, true, msg.sender, _askingPrice, _updatePrice, address(0), _askingPrice);
    }
    
    function closeBid(uint _id) onlyOwner(_id) public{
        items[_id].inProgress = false;
    }
    
    function bid(uint _id) public{
    
        require(items[_id].inProgress);
        //require(_bidPrice > items[_id].askingPrice && _bidPrice > items[_id].bidPrice);
        
        items[_id].bidPrice += items[_id].updatePrice;
        items[_id].highestBidder = msg.sender;
    
    }
}