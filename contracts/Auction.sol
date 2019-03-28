pragma solidity ^0.5.0;

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
        addItem("IPhone X", "IPhone X", "img/i1.png", address(0), 1000, 100);
        addItem("Watch", "Watch", "img/i2.png", address(0), 2000, 100);
    }

    function addItem(string memory _name, string memory _description, string memory _imgPath, address _owner, uint _askingPrice, uint _updatePrice) private {
        itemsCount ++;
        items[itemsCount] = Item(itemsCount, _name, _description, _imgPath, true, _owner, _askingPrice, _updatePrice, address(0), _askingPrice);
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
        //require(_bidPrice > items[_id].askingPrice && _bidPrice > items[_id].bidPrice);
        
        items[_id].bidPrice += items[_id].updatePrice;
        items[_id].highestBidder = msg.sender;
   //     emit itemEvent();
    
    }
    
    function newItem(string memory _name, string memory _description, string memory _imgPath, uint _askingPrice, uint _updatePrice) public {
        addItem(_name, _description, _imgPath, msg.sender, _askingPrice, _updatePrice);
        emit itemEvent();
    }
    
    
}