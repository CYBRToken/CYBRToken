# ERC20 interface (ERC20.sol)

View Source: [openzeppelin-solidity/contracts/token/ERC20/ERC20.sol](../openzeppelin-solidity/contracts/token/ERC20/ERC20.sol)

**↗ Extends: [ERC20Basic](ERC20Basic.md)**
**↘ Derived Contracts: [StandardToken](StandardToken.md)**

**ERC20**

see https://github.com/ethereum/EIPs/issues/20

**Events**

```js
event Approval(address indexed owner, address indexed spender, uint256  value);
```

## Functions

- [allowance(address _owner, address _spender)](#allowance)
- [transferFrom(address _from, address _to, uint256 _value)](#transferfrom)
- [approve(address _spender, uint256 _value)](#approve)

### allowance

⤿ Overridden Implementation(s): [StandardToken.allowance](StandardToken.md#allowance)

```js
function allowance(address _owner, address _spender) public view
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _owner | address |  | 
| _spender | address |  | 

### transferFrom

⤿ Overridden Implementation(s): [StandardToken.transferFrom](StandardToken.md#transferfrom),[TokenBase.transferFrom](TokenBase.md#transferfrom)

```js
function transferFrom(address _from, address _to, uint256 _value) public nonpayable
returns(bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _from | address |  | 
| _to | address |  | 
| _value | uint256 |  | 

### approve

⤿ Overridden Implementation(s): [StandardToken.approve](StandardToken.md#approve),[TokenBase.approve](TokenBase.md#approve)

```js
function approve(address _spender, uint256 _value) public nonpayable
returns(bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _spender | address |  | 
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
