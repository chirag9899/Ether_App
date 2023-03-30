//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Transactions {
// in javascript we use let test =5 
// test= '5'
uint256 transactionCount; 
event Transfer(address from,address receiver,uint amount , string message, uint256 timestamp ,string keyword); // here address is type and from is variable

struct TransferStruct{
    address sender;
    address receiver;
    uint amount;
    string message;
    uint timestamp;
    string keyword; 
}


TransferStruct[] transactions; //transaction variables is an array of TransferStruct(array of object)

function addToBlockchain(address payable receiver,uint amount , string memory message , string memory keyword) public{
    transactionCount+=1;
    transactions.push(TransferStruct(msg.sender,receiver,amount,message,block.timestamp,keyword));  //adding transaction to list of all transactions but not transfer

    emit Transfer(msg.sender,receiver,amount,message,block.timestamp,keyword); //transfer

}

function getAllTransactions() public view returns(TransferStruct[] memory){ 
return transactions;
}
//  it return array of diffrent structure from memory


function getTransactionCount() public view returns(uint256){
return transactionCount;

}

}
//serving a purpose of class in oops