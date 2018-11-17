/*
Copyright 2018 Binod Nirvan @ CYBRToken (https://cybrtoken.io)
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol";
import "openzeppelin-solidity/contracts/token/ERC20/BurnableToken.sol";
import "./CustomPausable.sol";


///@title CYBRToken Base Contract
///@author Binod Nirvan
///@notice CYBR Tokens are designed to incentivize and provide 
///functionality for the three-pronged CYBR solution. 
///Subscription services and the provision of blockchain related services 
///will be solely transacted utilizing CYBR Tokens. 
///Rewards for CYBR community members will be a determined allocation of CYBR Tokens. 
///CYBR is a standard ERC20 smart contract-based to- ken running 
///on the Ethereum network and is implemented 
///within the business logic set forth by the Company’s developers.
/// 
///The CYBR utility token is redeemable for usage with BlindSpot 
///and global threat intelligence feeds. The CYBR initiative provides 
///protection to individual networks, SMEs and large-scale enterprise users. 
///Intelligence feeds are based on risk scores; packaged in a series of 
///products/services and delivered via a subscription model which can provide:
/// 
///- Assessed zero-day global threat feeds o Json, CSV and XML formats 
///  - Utilizing IP tables firewall rules
///  - Magento, Wordpress and related plugins
///- Global threat intelligence reports
///- Email alerts
///- Mobile apps
///- API key to access CYBR via apps/dapps
/// 
///Data feeds will be based on number of user licenses, to be purchased 
///on a yearly-based subscription model. Special needs assessments, customized solutions, 
///or any appliance applications can be purchased at an additional cost.
/// 
///The CYBR business model is simple: a subscription-based value-added service 
///with recurring revenues. The company has identified a number of ancillary 
///revenue streams, ranging from customized packages to the sale of propriety 
///and modded hardware devices. However, it should be noted that the potent
///solution that is BlindSpot will drive our quest for adoption.
contract TokenBase is StandardToken, CustomPausable, BurnableToken {
  //solhint-disable
  uint8 public constant decimals = 18;
  string public constant name = "CYBR Token";
  string public constant symbol = "CYBR";
  //solhint-enable

  bool public released = false;

  uint256 internal constant MILLION = 1000000 * 1 ether; 
  uint256 internal constant BILLION = 1000000000 * 1 ether; 
  uint256 public constant MAX_SUPPLY = 1 * BILLION;
  uint256 public constant INITIAL_SUPPLY = 510 * MILLION;

  event BulkTransferPerformed(address[] _destinations, uint256[] _amounts);
  event TokenReleased(bool _state);
  event Mint(address indexed to, uint256 amount);

  constructor() public {
    mintTokens(msg.sender, INITIAL_SUPPLY);
  }

  ///@notice Checks if the supplied address is able to perform transfers.
  ///@param _from The address to check against if the transfer is allowed.
  modifier canTransfer(address _from) {
    if(paused || !released) {
      if(!isAdmin(_from)) {
        revert("Operation not allowed. The transfer state is restricted.");
      }
    }

    _;
  }

  ///@notice Transfers all Ether held by the contract to the owner.
  function reclaimEther() external onlyAdmin {
    msg.sender.transfer(address(this).balance);
  }

  ///@notice Transfers all ERC20 tokens held by the contract to the owner.
  ///@param _token The amount of token to reclaim.
  function reclaimToken(address _token) external onlyAdmin {
    ERC20 erc20 = ERC20(_token);
    uint256 balance = erc20.balanceOf(this);
    require(erc20.transfer(msg.sender, balance));
  }

  ///@notice This function enables token transfers for everyone.
  ///Can only be enabled after the end of the ICO.
  function releaseTokenForTransfer() external onlyAdmin whenNotPaused returns(bool) {
    require(!released, "Invalid operation. The transfer state is no more restricted.");

    released = true;

    emit TokenReleased(released);
    return true;
  }

  ///@notice This function disables token transfers for everyone.
  function disableTokenTransfers() external onlyAdmin whenNotPaused returns(bool) {
    require(released, "Invalid operation. The transfer state is already restricted.");

    released = false;

    emit TokenReleased(released);
    return true;
  }

  ///@notice Transfers the specified value of CYBR tokens to the destination address. 
  //Transfers can only happen when the transfer state is enabled. 
  //Transfer state can only be enabled after the end of the crowdsale.
  ///@param _to The destination wallet address to transfer funds to.
  ///@param _value The amount of tokens to send to the destination address.
  function transfer(address _to, uint256 _value) public canTransfer(msg.sender) returns(bool) {
    require(_to != address(0), "Invalid address.");
    return super.transfer(_to, _value);
  }

  ///@notice Transfers tokens from a specified wallet address.
  ///@dev This function is overridden to leverage transfer state feature.
  ///@param _from The address to transfer funds from.
  ///@param _to The address to transfer funds to.
  ///@param _value The amount of tokens to transfer.
  function transferFrom(address _from, address _to, uint256 _value) public canTransfer(_from) returns(bool) {
    require(_to != address(0), "Invalid address.");
    return super.transferFrom(_from, _to, _value);
  }

  ///@notice Approves a wallet address to spend on behalf of the sender.
  ///@dev This function is overridden to leverage transfer state feature.
  ///@param _spender The address which is approved to spend on behalf of the sender.
  ///@param _value The amount of tokens approve to spend. 
  function approve(address _spender, uint256 _value) public canTransfer(msg.sender) returns(bool) {
    require(_spender != address(0), "Invalid address.");
    return super.approve(_spender, _value);
  }

  ///@notice Increases the approval of the spender.
  ///@dev This function is overridden to leverage transfer state feature.
  ///@param _spender The address which is approved to spend on behalf of the sender.
  ///@param _addedValue The added amount of tokens approved to spend.
  function increaseApproval(address _spender, uint256 _addedValue) public canTransfer(msg.sender) returns(bool) {
    require(_spender != address(0), "Invalid address.");
    return super.increaseApproval(_spender, _addedValue);
  }

  ///@notice Decreases the approval of the spender.
  ///@dev This function is overridden to leverage transfer state feature.
  ///@param _spender The address of the spender to decrease the allocation from.
  ///@param _subtractedValue The amount of tokens to subtract from the approved allocation.
  function decreaseApproval(address _spender, uint256 _subtractedValue) public canTransfer(msg.sender) returns(bool) {
    require(_spender != address(0), "Invalid address.");
    return super.decreaseApproval(_spender, _subtractedValue);
  }
  
  ///@notice Allows only the admins and/or whitelisted applications to perform bulk transfer operation.
  ///@param _destinations The destination wallet addresses to send funds to.
  ///@param _amounts The respective amount of fund to send to the specified addresses. 
  function bulkTransfer(address[] _destinations, uint256[] _amounts) public onlyAdmin returns(bool) {
    require(_destinations.length == _amounts.length, "Invalid operation.");

    //Saving gas by determining if the sender has enough balance
    //to post this transaction.
    uint256 requiredBalance = sumOf(_amounts);
    require(balances[msg.sender] >= requiredBalance, "You don't have sufficient funds to transfer amount that large.");
    
    for (uint256 i = 0; i < _destinations.length; i++) {
      transfer(_destinations[i], _amounts[i]);
    }

    emit BulkTransferPerformed(_destinations, _amounts);
    return true;
  }

  ///@notice Burns the coins held by the sender.
  ///@param _value The amount of coins to burn.
  ///@dev This function is overridden to leverage Pausable feature.
  function burn(uint256 _value) public whenNotPaused {
    super.burn(_value);
  }

  ///@notice Mints the supplied value of the tokens to the destination address.
  //Minting cannot be performed any further once the maximum supply is reached.
  //This function cannot be used by anyone except for this contract.
  ///@param _to The address which will receive the minted tokens.
  ///@param _value The amount of tokens to mint.
  function mintTokens(address _to, uint _value) internal returns(bool) {
    require(_to != address(0), "Invalid address.");
    require(totalSupply_.add(_value) <= MAX_SUPPLY, "Sorry but the total supply can't exceed the maximum supply.");

    balances[_to] = balances[_to].add(_value);
    totalSupply_ = totalSupply_.add(_value);

    emit Transfer(address(0), _to, _value);
    emit Mint(_to, _value);

    return true;
  }
  
  ///@notice Returns the sum of supplied values.
  ///@param _values The collection of values to create the sum from.  
  function sumOf(uint256[] _values) private pure returns(uint256) {
    uint256 total = 0;

    for (uint256 i = 0; i < _values.length; i++) {
      total = total.add(_values[i]);
    }

    return total;
  }
}