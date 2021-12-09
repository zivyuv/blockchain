pragma solidity ^0.5.0;

contract Decentragram {
  string public name;
  uint public imageCount = 0;
  mapping(uint => Image) public images;

  struct Image {
    uint id;
  }

  event ImageCreated(
    uint id
  );


  constructor() public {
    name = "Decentragram";
  }

  function uploadImage(string memory _imgHash) public {
    // Increment image id
    imageCount ++;

    emit ImageCreated(imageCount);
  }

}