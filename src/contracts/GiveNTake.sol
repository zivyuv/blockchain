pragma solidity ^0.5.0;

contract GiveNTake {
  string public name;
  uint public usersCount = 0;
  mapping(uint => User) public users;

  struct User {
    uint id;
    string name;
    address owner;
  }

  event UserAdded(
    uint id,
    string name,
    address owner
  );


  constructor() public {
    name = "Decentragram";
  }

  function addUser(string memory _name) public {
    // Increment image id
    usersCount ++;
    users[usersCount] = User(usersCount, _name, msg.sender);

    emit UserAdded(usersCount, _name, msg.sender);
  }

}