# Reclaimable Contract (Reclaimable.sol)

View Source: [contracts/Reclaimable.sol](../contracts/Reclaimable.sol)

**↗ Extends: [CustomAdmin](CustomAdmin.md)**
**↘ Derived Contracts: [TokenBase](TokenBase.md)**

**Reclaimable**

Reclaimable contract enables the administrators 
to reclaim accidentally sent Ethers and ERC20 token(s)
to this contract.

## Functions

- [reclaimEther()](#reclaimether)
- [reclaimToken(address _token)](#reclaimtoken)

### reclaimEther

Transfers all Ether held by the contract to the owner.

```js
function reclaimEther() external nonpayable onlyAdmin 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### reclaimToken

Transfers all ERC20 tokens held by the contract to the owner.

```js
function reclaimToken(address _token) external nonpayable onlyAdmin 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _token | address | The amount of token to reclaim. | 

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
