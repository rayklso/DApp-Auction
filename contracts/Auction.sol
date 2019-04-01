pragma solidity ^0.5.0;

import "./BidToken.sol";

contract Auction {
    
    struct Item {
        uint id;                            //Item's ID
        string name;                        //Item's name
        string description;                 //Item's description
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
    
    
    event itemEvent ();
    
    // Constructor
    constructor() public {    
        
        itemsCount ++;
        items[itemsCount] = Item(itemsCount, "IPhone X", "This is Apple's new IPhone!", "img/i1.png", true, address(0), 1000, 500, address(0), 1000);
        
        itemsCount ++;
        items[itemsCount] = Item(itemsCount, "Watch", "This an expensive watch!", "img/i2.png", true, address(0), 2000, 1000, address(0), 2000);
        
        
    }

    function newItem(string memory _name, string memory _description, string memory _imgPath, uint _askingPrice, uint _updatePrice) public {
  
        itemsCount ++;
        items[itemsCount] = Item(itemsCount, _name, _description, _imgPath, true, msg.sender, _askingPrice, _updatePrice, address(0), _askingPrice);
  
        emit itemEvent();
    }
    
    modifier checkUserType(uint _id, bool ownerOrBidder) {                        //true for owner and false bidder
        require ((msg.sender == items[_id].owner) == ownerOrBidder, ownerOrBidder ? "For owner only" : "Not for owner");
        _;
    }
    
    function closeBid(uint _id) checkUserType(_id, true) public{
        items[_id].inProgress = false;
    }
    
    function bidItem(uint _id) checkUserType(_id, false) public{
   
        require(items[_id].inProgress);
        
        items[_id].bidPrice += items[_id].updatePrice;
        items[_id].highestBidder = msg.sender;
    
    }
    
    function transferBidToken(uint _id) public {
        require(msg.sender == items[_id].highestBidder);
        require(!items[_id].inProgress);
        
        BidToken b;
        b.transfer(items[_id].owner, items[_id].bidPrice);
    }
    
    
}