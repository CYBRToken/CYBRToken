# CYBRToken Base Contract (TokenBase.sol)

View Source: [contracts/TokenBase.sol](../contracts/TokenBase.sol)

**↗ Extends: [StandardToken](StandardToken.md), [TransferState](TransferState.md), [BulkTransfer](BulkTransfer.md), [Reclaimable](Reclaimable.md), [BurnableToken](BurnableToken.md)**
**↘ Derived Contracts: [CYBRToken](CYBRToken.md)**

**TokenBase**

CYBR Tokens are designed to incentivize and provide 
functionality for the three-pronged CYBR solution. 
Subscription services and the provision of blockchain related services 
will be solely transacted utilizing CYBR Tokens. 
Rewards for CYBR community members will be a determined allocation of CYBR Tokens. 
CYBR is a standard ERC20 smart contract-based to- ken running 
on the Ethereum network and is implemented 
within the business logic set forth by the Company’s developers.

The CYBR utility token is redeemable for usage with BlindSpot 
and global threat intelligence feeds. The CYBR initiative provides 
protection to individual networks, SMEs and large-scale enterprise users. 
Intelligence feeds are based on risk scores; packaged in a series of 
products/services and delivered via a subscription model which can provide:

- Assessed zero-day global threat feeds o Json, CSV and XML formats 
  - Utilizing IP tables firewall rules
  - Magento, Wordpress and related plugins
- Global threat intelligence reports
- Email alerts
- Mobile apps
- API key to access CYBR via apps/dapps

Data feeds will be based on number of user licenses, to be purchased 
on a yearly-based subscription model. Special needs assessments, customized solutions, 
or any appliance applications can be purchased at an additional cost.

The CYBR business model is simple: a subscription-based value-added service 
with recurring revenues. The company has identified a number of ancillary 
revenue streams, ranging from customized packages to the sale of propriety 
and modded hardware devices. However, it should be noted that the potent
solution that is BlindSpot will drive our quest for adoption.

## Contract Members
**Constants & Variables**

```js
//public members
uint8 public constant decimals;
string public constant name;
string public constant symbol;
uint256 public constant MAX_SUPPLY;
uint256 public constant INITIAL_SUPPLY;

//internal members
uint256 internal constant MILLION;
uint256 internal constant BILLION;

```

**Events**

```js
event Mint(address indexed to, uint256  amount);
```

## Functions

- [transfer(address _to, uint256 _value)](#transfer)
- [transferFrom(address _from, address _to, uint256 _value)](#transferfrom)
- [approve(address _spender, uint256 _value)](#approve)
- [increaseApproval(address _spender, uint256 _addedValue)](#increaseapproval)
- [decreaseApproval(address _spender, uint256 _subtractedValue)](#decreaseapproval)
- [burn(uint256 _value)](#burn)
- [mintTokens(address _to, uint256 _value)](#minttokens)

### transfer

⤾ overrides [BasicToken.transfer](BasicToken.md#transfer)

```js
function transfer(address _to, uint256 _value) public nonpayable canTransfer 
returns(bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _to | address | The destination wallet address to transfer funds to. | 
| _value | uint256 | The amount of tokens to send to the destination address. | 

### transferFrom

⤾ overrides [StandardToken.transferFrom](StandardToken.md#transferfrom)

Transfers tokens from a specified wallet address.

```js
function transferFrom(address _from, address _to, uint256 _value) public nonpayable canTransfer 
returns(bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _from | address | The address to transfer funds from. | 
| _to | address | The address to transfer funds to. | 
| _value | uint256 | The amount of tokens to transfer. | 

### approve

⤾ overrides [StandardToken.approve](StandardToken.md#approve)

Approves a wallet address to spend on behalf of the sender.

```js
function approve(address _spender, uint256 _value) public nonpayable canTransfer 
returns(bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _spender | address | The address which is approved to spend on behalf of the sender. | 
| _value | uint256 | The amount of tokens approve to spend. | 

### increaseApproval

⤾ overrides [StandardToken.increaseApproval](StandardToken.md#increaseapproval)

Increases the approval of the spender.

```js
function increaseApproval(address _spender, uint256 _addedValue) public nonpayable canTransfer 
returns(bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _spender | address | The address which is approved to spend on behalf of the sender. | 
| _addedValue | uint256 | The added amount of tokens approved to spend. | 

### decreaseApproval

⤾ overrides [StandardToken.decreaseApproval](StandardToken.md#decreaseapproval)

Decreases the approval of the spender.

```js
function decreaseApproval(address _spender, uint256 _subtractedValue) public nonpayable canTransfer 
returns(bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _spender | address | The address of the spender to decrease the allocation from. | 
| _subtractedValue | uint256 | The amount of tokens to subtract from the approved allocation. | 

### burn

⤾ overrides [BurnableToken.burn](BurnableToken.md#burn)

Burns the coins held by the sender.

```js
function burn(uint256 _value) public nonpayable whenNotPaused 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _value | uint256 | The amount of coins to burn. | 

### mintTokens

```js
function mintTokens(address _to, uint256 _value) internal nonpayable
returns(bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _to | address | The address which will receive the minted tokens. | 
| _value | uint256 | The amount of tokens to mint. | 

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
