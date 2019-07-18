# Custom Ownable (CustomOwnable.sol)

View Source: [contracts/CustomOwnable.sol](../contracts/CustomOwnable.sol)

**↗ Extends: [Ownable](Ownable.md)**
**↘ Derived Contracts: [CustomAdmin](CustomAdmin.md)**

**CustomOwnable**

Custom ownable contract.

## Contract Members
**Constants & Variables**

```js
address private _trustee;

```

**Events**

```js
event TrusteeAssigned(address indexed account);
```

## Modifiers

- [onlyTrustee](#onlytrustee)

### onlyTrustee

Validates if the sender is actually the trustee.

```js
modifier onlyTrustee() internal
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

## Functions

- [assignTrustee(address _account)](#assigntrustee)
- [reassignOwner(address _newOwner)](#reassignowner)
- [getTrustee()](#gettrustee)

### assignTrustee

Assigns or changes the trustee wallet.

```js
function assignTrustee(address _account) external nonpayable onlyOwner 
returns(bool)
```

**Returns**

Returns true if the operation was successful.

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _account | address | A wallet address which will become the new trustee. | 

### reassignOwner

Changes the owner of this contract.

```js
function reassignOwner(address _newOwner) external nonpayable onlyTrustee 
returns(bool)
```

**Returns**

Returns true if the operation was successful.

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _newOwner | address | Specify a wallet address which will become the new owner. | 

### getTrustee

The trustee wallet has the power to change the owner in case of unforeseen or unavoidable situation.

```js
function getTrustee() external view
returns(address)
```

**Returns**

Wallet address of the trustee account.

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

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
