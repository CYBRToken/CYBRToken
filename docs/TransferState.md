# Transfer State Contract (TransferState.sol)

View Source: [contracts/TransferState.sol](../contracts/TransferState.sol)

**↗ Extends: [CustomPausable](CustomPausable.md)**
**↘ Derived Contracts: [TokenBase](TokenBase.md)**

**TransferState**

Enables the admins to maintain the transfer state.
Transfer state when disabled disallows everyone but admins to transfer tokens.

## Contract Members
**Constants & Variables**

```js
bool public released;

```

**Events**

```js
event TokenReleased(bool  _state);
```

## Modifiers

- [canTransfer](#cantransfer)

### canTransfer

Checks if the supplied address is able to perform transfers.

```js
modifier canTransfer(address _from) internal
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _from | address | The address to check against if the transfer is allowed. | 

## Functions

- [enableTransfers()](#enabletransfers)
- [disableTransfers()](#disabletransfers)

### enableTransfers

This function enables token transfers for everyone.
Can only be enabled after the end of the ICO.

```js
function enableTransfers() external nonpayable onlyAdmin whenNotPaused 
returns(bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### disableTransfers

This function disables token transfers for everyone.

```js
function disableTransfers() external nonpayable onlyAdmin whenNotPaused 
returns(bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

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
