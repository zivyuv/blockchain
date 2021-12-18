pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract GiveNTake {
  //string public name;
  uint public usersCount = 0;
  uint public cardsCount = 0;
  uint public transactionsCount = 0;
  

  struct User {
    uint id;
    string name;
    uint rate;
    address owner;
    uint cardAmount;
    uint[] mycards;
    uint ratingCount;
  }

  struct Card {
        uint id;
        string headline;
        string content;
        uint price;
        uint soldCount;
        address payable owner;
        uint ownerRate;  
        uint isActive;
    }

  struct Transaction {
    User buyer;
    Card card;
  }

  event UserAdded(
    uint id,
    string name,
    address owner
  );

  event CardCreated(
        uint id,
        string headline,
        string content,
        uint price,
        uint soldCount,
        address payable owner,
        uint isActive
    );

  event CardBought(
        uint id,
        string headline,
        string content,
        uint price,
        uint soldCount,
        address payable owner
    );

  event UserRated(
        address userAddress,
        string name,
        uint rate
    );

    mapping (uint => Transaction) public transactions;
    mapping(uint => User) public users;
    mapping(uint => Card) public cards;
    mapping (address => User) public usersByAddress;

  constructor() public {
    //name = "Decentragram";
    // postOffer("Example offer", "Example content", 10);
  }

  function addUser(string memory _name) public {
    // Increment image id
    usersCount ++;
    uint[] memory my_cards;
    users[usersCount] = User(usersCount, _name, 0, msg.sender,0, my_cards, 0);
    usersByAddress[msg.sender] = users[usersCount];

    emit UserAdded(usersCount, _name, msg.sender);
  }

  function postOffer(string memory _headline, string memory _content, uint _price) public {
        cardsCount ++;
        User memory _owner = usersByAddress[msg.sender];
        uint rate = _owner.rate;
        cards[cardsCount] = Card(cardsCount, _headline, _content, _price, 0, msg.sender,rate, 1);
        User memory curr_user = usersByAddress[msg.sender];
      
        //add new card to user list
        add_cardToUser(curr_user.id, cards[cardsCount]);

        emit CardCreated(cardsCount, _headline, _content, _price, 0, msg.sender, 1);
    }
  function add_cardToUser(uint currUserId, Card memory currCard) private{
        //add card to user card list
        uint [] storage mycards = users[currUserId].mycards;
        mycards.push(currCard.id);
        users[currUserId].mycards = mycards;
        usersByAddress[users[currUserId].owner].mycards.push(currCard.id);

        
        //currUser.my_cards[curr_amount] = currCard;
        users[currUserId].cardAmount++;
    }
  function buyOffer(uint _cardId) public payable {
        require(_cardId > 0 && _cardId <= cardsCount);

        Card memory _card = cards[_cardId];
        address payable _owner = _card.owner;
        
        _owner.transfer(msg.value);
        _card.soldCount ++;
        cards[_cardId] = _card;     // update the card

        // add transaction 
        transactionsCount++;
        User memory buyer = usersByAddress[msg.sender];
        transactions[transactionsCount] = Transaction(buyer, _card);

        emit CardBought(cardsCount, _card.headline, _card.content, _card.price, _card.soldCount, msg.sender);

    }
  function rateSeller(address _sellerAddress) public {
        // require(_sellerId > 0 && _sellerId <= usersCount);
      
        // perhaps add that I can only rate a user once
        usersByAddress[_sellerAddress].rate++;
        User memory _user =  usersByAddress[_sellerAddress];
        users[_user.id].rate++;   // update the user in the second array as well

        // for each 5 times rating others, user earns a rate for himself
        uint flag = 0;
        User memory rater = usersByAddress[msg.sender];
        if (rater.ratingCount % 3 == 0) {
          rater.rate++;
          flag = 1;
        }
        rater.ratingCount++;
        usersByAddress[msg.sender] = rater;
        users[rater.id] = rater;
        
        // update all their cards
        uint i = 1;
        for (i=1; i<=cardsCount; i++) {
          if (cards[i].owner == _sellerAddress) {
              cards[i].ownerRate++;
          }
          if (flag == 1 && cards[i].owner == msg.sender) {
              cards[i].ownerRate++;
          }
        }

        emit UserRated(_sellerAddress, _user.name, _user.rate);
    }
  function deleteCard(uint id) public {
      Card storage toDelete = cards[id];
      toDelete.isActive = 0;

       /* Card storage toDelete = cards[id];
        require(toDelete.owner == msg.sender);
        User memory card_owner = usersByAddress[toDelete.owner];
        for(uint i = 1; i<card_owner.mycards.length; i++){
          if(card_owner.mycards[i]==id){
            for(uint j = i ; j<card_owner.mycards.length; j++){
              card_owner.mycards[j] = card_owner.mycards[j+1];
            }
          }
        }
        //need to find card id in mycards array, delete it and move everything one to the left
       /* for (uint i = card_owner.id; i<card_owner.mycards.length-1; i++){
            card_owner.mycards[i] = card_owner.mycards[i+1];
        }*/
        //move all cards in cards array 
        /*for(uint i = cards[toDelete.id]; i <cards.length()-1; i++){
            cards[i] = cards[i+1];
        }*/
        //delete card_owner.mycards[card_owner.mycards.length-1];
      delete cards[id];
      cardsCount--;
  }    

}