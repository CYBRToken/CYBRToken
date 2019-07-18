# Bulk Transfer Contract (BulkTransfer.sol)

View Source: [contracts/BulkTransfer.sol](../contracts/BulkTransfer.sol)

**↗ Extends: [StandardToken](StandardToken.md), [CustomAdmin](CustomAdmin.md)**
**↘ Derived Contracts: [TokenBase](TokenBase.md)**

**BulkTransfer**

This contract provides features for admins to perform bulk transfers.

**Events**

```js
event BulkTransferPerformed(address[]  _destinations, uint256[]  _amounts);
```

## Functions

- [bulkTransfer(address[] _destinations, uint256[] _amounts)](#bulktransfer)
- [sumOf(uint256[] _values)](#sumof)

### bulkTransfer

Allows only the admins and/or whitelisted applications to perform bulk transfer operation.

```js
function bulkTransfer(address[] _destinations, uint256[] _amounts) public nonpayable onlyAdmin 
returns(bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _destinations | address[] | The destination wallet addresses to send funds to. | 
| _amounts | uint256[] | The respective amount of fund to send to the specified addresses. | 

### sumOf

Returns the sum of supplied values.

```js
function sumOf(uint256[] _values) private pure
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _values | uint256[] | The collection of values to create the sum from. | 

## Contracts

* [BasicToken](BasicToken.md)
* [BulkTransfer](BulkTransfer.md)
* [BurnableToken](BurnableToken.md)
* [CustomAdmin](CustomAdmin.md)
* [CustomLockable](CustomLockable.md)
* [CustomOwnable](CustomOwnable.md)
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
