# This contract enables you to create pausable mechanism to stop in case of emergency. (CustomPausable.sol)

View Source: [contracts/CustomPausable.sol](../contracts/CustomPausable.sol)

**↗ Extends: [CustomAdmin](CustomAdmin.md)**
**↘ Derived Contracts: [TokenBase](TokenBase.md)**

**CustomPausable**

## Contract Members
**Constants & Variables**

```js
bool public paused;

```

**Events**

```js
event Paused();
event Unpaused();
```

## Modifiers

- [whenNotPaused](#whennotpaused)
- [whenPaused](#whenpaused)

### whenNotPaused

Verifies whether the contract is not paused.

```js
modifier whenNotPaused() internal
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### whenPaused

Verifies whether the contract is paused.

```js
modifier whenPaused() internal
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

## Functions

- [pause()](#pause)
- [unpause()](#unpause)

### pause

Pauses the contract.

```js
function pause() external nonpayable onlyAdmin whenNotPaused 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### unpause

Unpauses the contract and returns to normal state.

```js
function unpause() external nonpayable onlyAdmin whenPaused 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

## Contracts

* [BasicToken](BasicToken.md)
* [BurnableToken](BurnableToken.md)
* [CustomAdmin](CustomAdmin.md)
* [CustomPausable](CustomPausable.md)
* [CYBRToken](CYBRToken.md)
* [ERC20](ERC20.md)
* [ERC20Basic](ERC20Basic.md)
* [Migrations](Migrations.md)
* [Ownable](Ownable.md)
* [SafeMath](SafeMath.md)
* [StandardToken](StandardToken.md)
* [TokenBase](TokenBase.md)
