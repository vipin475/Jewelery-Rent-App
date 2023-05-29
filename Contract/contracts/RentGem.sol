// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract RentGem {
    address owner;
    uint ownerBalance;

    constructor() {
        owner = msg.sender;
    }

    // Add yourself as a Renter
    struct Renter{
        address payable walletAddress;
        string firstName;
        string lastName;
        bool canRent;
        bool active;
        uint balance;
        uint due;
        uint start;
        uint end;
    }

    mapping (address => Renter) public renters;

    function addRenter(address payable walletAddress, string memory firstName, string memory lastName, bool canRent, bool active, uint balance, uint due, uint start, uint end) public {
        renters[walletAddress] = Renter(walletAddress, firstName, lastName, canRent, active, balance, due, start, end);
    }

    modifier isRenter(address walletAddress){
        require(msg.sender == walletAddress, "You can only manage your account");
        _;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "You are not awwloed to access this");
        _;
    }

    // Checkout jewellery
    function checkOut(address walletAddress) public isRenter(walletAddress){
        require(renters[walletAddress].due == 0, "You have a pending balance.");
        require(renters[walletAddress].canRent == true, "You cannot rent at this time.");
        renters[walletAddress].active = true;
        renters[walletAddress].start = block.timestamp;
        renters[walletAddress].canRent = false;
    }

    // CheckIn a jewellery
    function checkInt(address walletAddress) public isRenter(walletAddress){
        require(renters[walletAddress].active == true, "Please Check out a jewellery first.");
        renters[walletAddress].active = false;
        renters[walletAddress].end = block.timestamp;

        // set amount due
        setDue(walletAddress);
    }

    // Get total Duration of a boke use
    function rentersTimespan(uint start, uint end) internal pure returns(uint) {
        return end - start;
    }
    function getTotalDuration(address walletAddress) public isRenter(walletAddress) view returns(uint) { 
        if(renters[walletAddress].start == 0 || renters[walletAddress].end == 0) {
            return 0;
        } else{
            uint timespan = rentersTimespan(renters[walletAddress].start, renters[walletAddress].end);
            uint timespanInMinutes = timespan/60;
            return timespanInMinutes;
        }
    }

    // Get Contract balance
    function balanceOf() view public onlyOwner() returns(uint) {
        return address(this).balance;
    }

    function getOwnerBalance() view public onlyOwner() returns(uint) {
        return ownerBalance;
    }

    function withdrawOwnerBalance() payable public {
        payable(owner).transfer(ownerBalance);
        ownerBalance = 0;
    }

    // Get Renter's Balance
    function balanceOfRenter(address walletAddress) public isRenter(walletAddress) view returns(uint) {
        return renters[walletAddress].balance;
    }

    // Set Due Amount
    function setDue(address walletAddress) internal {
        uint timeSpanMinutes = getTotalDuration(walletAddress);
        uint basefees = 50000000000000;
        uint fiveMinIncrements = timeSpanMinutes / 5;
        renters[walletAddress].due = basefees + (fiveMinIncrements * 50000000000000);
    }

    function canRentJewellery(address walletAddress) public isRenter(walletAddress) view returns(bool){
        return renters[walletAddress].canRent;
    }

    // Deposit
    function deposit(address walletaddress) isRenter(walletaddress) payable public {
        renters[walletaddress].balance += msg.value;
    }
    // Make Payment
    function makePayment(address walletAddress, uint amount) public isRenter(walletAddress) {
        require(renters[walletAddress].due > 0, "You do not have anything this time");
        require(renters[walletAddress].balance > amount, "You do not have enough funds to cover your payment. Please make a Deposit. ");
        renters[walletAddress].balance -= amount;
        ownerBalance += amount;
        renters[walletAddress].canRent = true;
        renters[walletAddress].due = 0;
        renters[walletAddress].start = 0;
        renters[walletAddress].end = 0;
    }

    // getDue
    function getDue(address walletAddress) public isRenter(walletAddress) view returns(uint) {
        return renters[walletAddress].due;
    }

    function getRenter(address walletaddress) public isRenter(walletaddress) view returns(string memory firstName, string memory lastName, bool canRent, bool active) {
        firstName = renters[walletaddress].firstName;
        lastName = renters[walletaddress].lastName;
        canRent = renters[walletaddress].canRent;
        active = renters[walletaddress].active;
    }

    function renterExist(address walletAddress) public isRenter(walletAddress) view returns(bool){
        if(renters[walletAddress].walletAddress != address(0)){
            return true;
        }
        return false;
    }

}