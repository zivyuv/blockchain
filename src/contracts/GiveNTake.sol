// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract GiveNTake {
    
    struct User {
        uint id;
        string name;
        uint rate; 
        uint soldCount;
        uint cardAmount;
        //need to add with push - make sure that the delete covers this 
        uint[] my_cards;
        
    }

    struct Card {
        uint id;
        string headline;
        string content;
        uint price;
        uint soldCount;
        address payable owner;
    }

    // key, value dictionary 
    mapping(uint => User) public users;
    mapping(uint => Card) public cards;
    mapping (address => User) public usersByAddress;
    
    // TODO: Add middle man --> buyer offers (and pays) ether. if seller approves, then approve(cardId) is executed. 
    //      Else, it is declined and ehter is returned.

    uint public usersCount;
    uint public cardsCount;
    
    event UserAdded(
        uint id,
        string name,
        uint rate,
        uint soldCount,
        uint cardAmount,
        uint[] my_cards
    );
    
    event CardCreated(
        uint id,
        string headline,
        string content,
        uint price,
        uint soldCount,
        address payable owner
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
        uint soldCount,
        uint rate
    );

   constructor() public {
     addUSer("Sahar");
     addUSer("Yuval");
    }

    function addUSer (string memory _name) public {
        usersCount ++;
        //Card [] storage userCards;
        uint[] memory my_cards;
        users[usersCount] = User(usersCount, _name,0,0,0,my_cards);
        //when adding a new user, they dont have any cards yet
        emit UserAdded(usersCount, _name,0,0,0,my_cards);
    }
 
    function postOffer(string memory _headline, string memory _content, uint _price) public {
        cardsCount ++;
        cards[cardsCount] = Card(cardsCount, _headline, _content, _price, 0, msg.sender);
        User memory curr_user = usersByAddress[msg.sender];
        //add new card to user list
        add_cardToUser(curr_user, cards[cardsCount]);

        emit CardCreated(cardsCount, _headline, _content, _price, 0, msg.sender);
    }

    function add_cardToUser(User memory currUser, Card memory currCard) public pure{
        uint curr_amount = currUser.cardAmount;
        //add card to user card list
        currUser.my_cards[curr_amount] = currCard.id;
        currUser.cardAmount = curr_amount+1;
    }

    function buyOffer(uint _cardId) public {
        require(_cardId > 0 && _cardId <= cardsCount);

        Card memory _card = cards[_cardId];
        address payable _owner = _card.owner;
        
        _owner.transfer(_card.price);   // change to valid currency before transfer - not to mention type number, not string
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


        emit UserRated(_sellerId, _user.name, _user.rate, _user.soldCount);
    }

    function deleteCard(Card memory toDelete) private{
        require(toDelete.owner == msg.sender);
        User memory card_owner = usersByAddress[toDelete.owner];
        //move all cards in user card array
        for (uint i = card_owner.id; i<card_owner.my_cards.length-1; i++){
            card_owner.my_cards[i] = card_owner.my_cards[i+1];
        }
        //move all cards in cards array 
        /*for(uint i = cards[toDelete.id]; i <cards.length-1; i++){
            cards[i] = cards[i+1];
        }*/
        delete card_owner.my_cards[card_owner.my_cards.length-1];
        delete cards[toDelete.id];
    }
}