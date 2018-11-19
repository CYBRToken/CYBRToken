# Basic token (BasicToken.sol)

View Source: [openzeppelin-solidity/contracts/token/ERC20/BasicToken.sol](../openzeppelin-solidity/contracts/token/ERC20/BasicToken.sol)

**↗ Extends: [ERC20Basic](ERC20Basic.md)**
**↘ Derived Contracts: [BurnableToken](BurnableToken.md), [StandardToken](StandardToken.md)**

**BasicToken**

Basic version of StandardToken, with no allowances.

## Contract Members
**Constants & Variables**

```js
mapping(address => uint256) internal balances;
uint256 internal totalSupply_;

```

## Functions

- [totalSupply()](#totalsupply)
- [transfer(address _to, uint256 _value)](#transfer)
- [balanceOf(address _owner)](#balanceof)

### totalSupply

⤾ overrides [ERC20Basic.totalSupply](ERC20Basic.md#totalsupply)

Total number of tokens in existence

```js
function totalSupply() public view
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### transfer

⤾ overrides [ERC20Basic.transfer](ERC20Basic.md#transfer)

⤿ Overridden Implementation(s): [TokenBase.transfer](TokenBase.md#transfer)

Transfer token for a specified address

```js
function transfer(address _to, uint256 _value) public nonpayable
returns(bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _to | address | The address to transfer to. | 
| _value | uint256 | The amount to be transferred. | 

### balanceOf

⤾ overrides [ERC20Basic.balanceOf](ERC20Basic.md#balanceof)

Gets the balance of the specified address.

```js
function balanceOf(address _owner) public view
returns(uint256)
```

**Returns**

An uint256 representing the amount owned by the passed address.

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _owner | address | The address to query the the balance of. | 

## Contracts

* [BasicToken](BasicToken.md)
* [BulkTransfer](BulkTransfer.md)
* [BurnableToken](BurnableToken.md)
* [CustomAdmin](CustomAdmin.md)
* [CustomPausable](CustomPausable.md)
* [CYBRToken](CYBRToken.md)
* [ERC20](ERC20.md)
* [ERC20Basic](ERC20Basic.md)
* [ERC20Mock](ERC20Mock.md)
* [ForceEther](ForceEther.md)
* [Migrations](Migrations.md)
* [Ownable](Ownable.md)
* [Reclaimable](Reclaimable.md)
* [SafeERC20](SafeERC20.md)
* [SafeMath](SafeMath.md)
* [StandardToken](StandardToken.md)
* [TokenBase](TokenBase.md)
* [TransferState](TransferState.md)
