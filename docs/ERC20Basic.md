# ERC20Basic (ERC20Basic.sol)

View Source: [openzeppelin-solidity/contracts/token/ERC20/ERC20Basic.sol](../openzeppelin-solidity/contracts/token/ERC20/ERC20Basic.sol)

**↘ Derived Contracts: [BasicToken](BasicToken.md), [ERC20](ERC20.md)**

**ERC20Basic**

Simpler version of ERC20 interface
See https://github.com/ethereum/EIPs/issues/179

**Events**

```js
event Transfer(address indexed from, address indexed to, uint256  value);
```

## Functions

- [totalSupply()](#totalsupply)
- [balanceOf(address _who)](#balanceof)
- [transfer(address _to, uint256 _value)](#transfer)

### totalSupply

⤿ Overridden Implementation(s): [BasicToken.totalSupply](BasicToken.md#totalsupply)

```js
function totalSupply() public view
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### balanceOf

⤿ Overridden Implementation(s): [BasicToken.balanceOf](BasicToken.md#balanceof)

```js
function balanceOf(address _who) public view
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _who | address |  | 

### transfer

⤿ Overridden Implementation(s): [BasicToken.transfer](BasicToken.md#transfer),[TokenBase.transfer](TokenBase.md#transfer)

```js
function transfer(address _to, uint256 _value) public nonpayable
returns(bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _to | address |  | 
| _value | uint256 |  | 

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
