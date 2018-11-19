# SafeERC20 (SafeERC20.sol)

View Source: [openzeppelin-solidity/contracts/token/ERC20/SafeERC20.sol](../openzeppelin-solidity/contracts/token/ERC20/SafeERC20.sol)

**SafeERC20**

Wrappers around ERC20 operations that throw on failure.
To use this library you can add a `using SafeERC20 for ERC20;` statement to your contract,
which allows you to call the safe operations as `token.safeTransfer(...)`, etc.

## Functions

- [safeTransfer(ERC20Basic _token, address _to, uint256 _value)](#safetransfer)
- [safeTransferFrom(ERC20 _token, address _from, address _to, uint256 _value)](#safetransferfrom)
- [safeApprove(ERC20 _token, address _spender, uint256 _value)](#safeapprove)

### safeTransfer

```js
function safeTransfer(ERC20Basic _token, address _to, uint256 _value) internal nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _token | ERC20Basic |  | 
| _to | address |  | 
| _value | uint256 |  | 

### safeTransferFrom

```js
function safeTransferFrom(ERC20 _token, address _from, address _to, uint256 _value) internal nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _token | ERC20 |  | 
| _from | address |  | 
| _to | address |  | 
| _value | uint256 |  | 

### safeApprove

```js
function safeApprove(ERC20 _token, address _spender, uint256 _value) internal nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _token | ERC20 |  | 
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
