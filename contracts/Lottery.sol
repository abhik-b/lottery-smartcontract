// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

error Lottery__NotEnoughETH();

contract Lottery {
    uint256 private immutable i_entranceFee;
    address payable[] private s_players;

    // Events
    event LotteryEnter(address indexed player);

    constructor(uint256 entranceFee) {
        i_entranceFee = entranceFee;
    }

    function enterRaffle() public payable {
        if (msg.value < i_entranceFee) {
            revert Lottery__NotEnoughETH();
        }
        s_players.push(payable(msg.sender));
        emit LotteryEnter(msg.sender);
    }

    function pickRandomWinner() external {
        //1. request the random number
        //2. once we get it do something with it...
    }

    // views / pure
    function getEntranceFee() public view returns (uint256) {
        return i_entranceFee;
    }

    function getPlayer(uint256 index) public view returns (address) {
        return s_players[index];
    }
}
