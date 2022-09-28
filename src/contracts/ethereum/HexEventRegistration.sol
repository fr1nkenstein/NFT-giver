// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';
import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';


contract HexEventRegistration is  ERC721URIStorage,ReentrancyGuard  {
      using Counters for Counters.Counter;
      Counters.Counter private _tokenIds;
      //Counters.Counter private _itemsSold;

        address payable owner;
        address payable participent;
        uint256 listingPrice = 0.00001 ether;

        struct RegNft {
            uint256 tokenId;
            address payable seller;
            string gmail;
            string name;
            string organisation;
            string designation;
        }

        mapping(uint256 => RegNft) private idToRegNft;

        event RegNftCreatyed(
            uint256 indexed tokenId,
            address seller,
            string gmail,
            string name,
            string organisation,
            string designation
        );

        // REG Mayank - give correct Token name
        constructor() ERC721('REG-hexNft', 'hexNFT') {
            
        }
        // REG - Mayank
        /* Mints a token and lists it in the marketplace original */
        function createHexRegTokenWithAccount(string memory tokenURI,string memory gmail,string memory name,string memory organisation,string memory designation) public payable returns (uint256){
            participent = payable(msg.sender);
            uint256 newTokenIdWA = createHexRegToken(participent,tokenURI,gmail,name,organisation,designation);
            return newTokenIdWA;
        }

        // REG - Mayank
        /* Mints a token and lists it in the marketplace */
        function createHexRegTokenWithoutAccount(string memory tokenURI,string memory gmail,string memory name,string memory organisation,string memory designation) public payable returns (uint256){
            participent = payable(0xca891C5AFAb66BB9Fb9AFA1840443477Bc81bd88);
            uint256 newTokenIdWA = createHexRegToken(participent,tokenURI,gmail,name,organisation,designation);
            return newTokenIdWA;
        }

        // REG - Mayank
        /* Mints a token and lists it in the marketplace */
        function createHexRegToken(address newOwner,string memory tokenURI,string memory gmail,string memory name,string memory organisation,string memory designation) public payable returns (uint256){
            owner = payable(newOwner);
            _tokenIds.increment();
            uint256 newTokenId = _tokenIds.current();
            _mint(newOwner, newTokenId);
            _setTokenURI(newTokenId, tokenURI);
            createHexRegNftWithAccount(newOwner,newTokenId,gmail,name,organisation,designation);
            return newTokenId;
        }


        // REG Vishal
        function createHexRegNftWithAccount(address newOwner,uint256 tokenId,string memory gmail,string memory name,string memory organisation,string memory designation) private {

            idToRegNft[tokenId] = RegNft(
            tokenId,
            payable(newOwner),
            // payable(address(0xca891C5AFAb66BB9Fb9AFA1840443477Bc81bd88)),
            gmail,
            name,
            organisation,
            designation
            );

            _transfer(newOwner, address(this), tokenId);
            emit RegNftCreatyed(tokenId, newOwner,gmail,name,organisation,designation);
        }

        function getParticipentsCount() public view returns (uint256){
            uint256 itemCount = _tokenIds.current();
            return itemCount;
        }

}