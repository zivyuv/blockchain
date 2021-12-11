pragma solidity ^0.5.0;

contract GiveNTake {
  string public name;
  uint public usersCount = 0;
  mapping(uint => User) public users;

  struct User {
    uint id;
    string name;
    string password;
    address owner;
  }

  event UserAdded(
    uint id,
    string name,
    string password,
    address owner
  );


  constructor() public {
    name = "Decentragram";
  }

  function addUser(string memory _name, string memory _password) public {
    // Increment image id
    usersCount ++;
    users[usersCount] = User(usersCount, _name, _password, msg.sender);

    emit UserAdded(usersCount, _name, _password, msg.sender);
  }

}