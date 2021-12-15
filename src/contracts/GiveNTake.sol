pragma solidity ^0.5.0;

contract GiveNTake {
  //string public name;
  uint public usersCount = 0;
  uint public cardsCount = 0;
  uint card_amount = 0;
  

  struct User {
    uint id;
    string name;
    uint rate;
    address owner;
    uint cardAmount;
    uint[] mycards;
  }

  struct Card {
        uint id;
        string headline;
        string content;
        uint price;
        uint soldCount;
        address payable owner;
        uint isActive;
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
        uint id,
        string name,
        uint rate
    );

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
    users[usersCount] = User(usersCount, _name, 0, msg.sender,0, my_cards);
    usersByAddress[msg.sender] = users[usersCount];

    emit UserAdded(usersCount, _name, msg.sender);
  }

  function postOffer(string memory _headline, string memory _content, uint _price) public {
        cardsCount ++;
        cards[cardsCount] = Card(cardsCount, _headline, _content, _price, 0, msg.sender, 1);
        User memory curr_user = usersByAddress[msg.sender];
      
        //add new card to user list
        add_cardToUser(curr_user, cards[cardsCount]);

        emit CardCreated(cardsCount, _headline, _content, _price, 0, msg.sender, 1);
    }
  function add_cardToUser(User memory currUser, Card memory currCard) private{
        //add card to user card list
        users[currUser.id].mycards.push(currCard.id);
        
        //currUser.my_cards[curr_amount] = currCard;
        currUser.cardAmount++;
    }
  function buyOffer(uint _cardId) public payable {
        require(_cardId > 0 && _cardId <= cardsCount);

        Card memory _card = cards[_cardId];
        address payable _owner = _card.owner;
        
        _owner.transfer(msg.value);
        _card.soldCount ++;
        cards[_cardId] = _card;     // update the card

        emit CardBought(cardsCount, _card.headline, _card.content, _card.price, _card.soldCount, msg.sender);

    }
  function rateSeller(uint _sellerId) private {
        require(_sellerId > 0 && _sellerId <= usersCount);
      
        // perhaps add that I can only rate a user once
        User memory _user =  users[_sellerId];
        _user.rate ++;
        users[_sellerId] = _user;

        emit UserRated(_sellerId, _user.name, _user.rate);
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