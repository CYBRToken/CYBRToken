# Cyber Security Ecosystem Token (CYBRToken.sol)

View Source: [contracts/CYBRToken.sol](../contracts/CYBRToken.sol)

**↗ Extends: [TokenBase](TokenBase.md)**

**CYBRToken**

Cyber Security Ecosystem Tokens are designed to incentivize and provide
functionality for the three-pronged CYBR solution.
Subscription services and the provision of blockchain related services
will be solely transacted utilizing Cyber Security Ecosystem Tokens.
Rewards for CYBR community members will be a determined allocation of Cyber Security Ecosystem Tokens.
CYBR is a standard ERC20 smart contract-based to- ken running
on the Ethereum network and is implemented
within the business logic set forth by the Company’s developers.
&nbsp;
The CYBR utility token is redeemable for usage with BlindSpot
and global threat intelligence feeds. The CYBR initiative provides
protection to individual networks, SMEs and large-scale enterprise users.
Intelligence feeds are based on risk scores; packaged in a series of
products/services and delivered via a subscription model which can provide:
&nbsp;
- Assessed zero-day global threat feeds o Json, CSV and XML formats
  - Utilizing IP tables firewall rules
  - Magento, Wordpress and related plugins
- Global threat intelligence reports
- Email alerts
- Mobile apps
- API key to access CYBR via apps/dapps
&nbsp;
Data feeds will be based on number of user licenses, to be purchased
on a yearly-based subscription model. Special needs assessments, customized solutions,
or any appliance applications can be purchased at an additional cost.
&nbsp;
The CYBR business model is simple: a subscription-based value-added service
with recurring revenues. The company has identified a number of ancillary
revenue streams, ranging from customized packages to the sale of propriety
and modded hardware devices. However, it should be noted that the potent
solution that is BlindSpot will drive our quest for adoption.

## Contract Members
**Constants & Variables**

```js
//public members
uint256 public icoEndDate;
uint256 public constant ALLOCATION_FOR_FOUNDERS;
uint256 public constant ALLOCATION_FOR_TEAM;
uint256 public constant ALLOCATION_FOR_RESERVE;
uint256 public constant ALLOCATION_FOR_INITIAL_PARTNERSHIPS;
uint256 public constant ALLOCATION_FOR_PARTNERSHIPS;
uint256 public constant ALLOCATION_FOR_ADVISORS;
uint256 public constant ALLOCATION_FOR_PROMOTION;
bool public targetReached;

//private members
mapping(bytes32 => bool) private mintingList;

```

**Events**

```js
event ICOEndDateSet(uint256  _date);
event TargetReached();
```

## Modifiers

- [whenNotMinted](#whennotminted)

### whenNotMinted

Checks if the minting for the supplied key was already performed.

```js
modifier whenNotMinted(string _key) internal
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _key | string | The key or category name of minting. | 

## Functions

- [setSuccess()](#setsuccess)
- [setICOEndDate(uint256 _date)](#seticoenddate)
- [mintTokensForFounders()](#minttokensforfounders)
- [mintTokensForTeam()](#minttokensforteam)
- [mintReserveTokens()](#mintreservetokens)
- [mintTokensForInitialPartnerships()](#minttokensforinitialpartnerships)
- [mintTokensForPartnerships()](#minttokensforpartnerships)
- [mintTokensForAdvisors()](#minttokensforadvisors)
- [mintTokensForPromotion()](#minttokensforpromotion)
- [computeHash(string _key)](#computehash)
- [mintOnce(string _key, address _to, uint256 _amount)](#mintonce)

### setSuccess

This function signifies that the minimum fundraising target was met.
Please note that this can only be called once.

```js
function setSuccess() external nonpayable onlyAdmin 
returns(bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### setICOEndDate

This function enables the whitelisted application (internal application) to set the
ICO end date and can only be used once.

```js
function setICOEndDate(uint256 _date) external nonpayable onlyAdmin 
returns(bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _date | uint256 | The date to set as the ICO end date. | 

### mintTokensForFounders

Mints the 100 million Cyber Security Ecosystem Tokens allocated to the CYBRToken founders.
The tokens are only available to the founders after 18 months of the ICO end.

```js
function mintTokensForFounders() external nonpayable onlyAdmin 
returns(bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### mintTokensForTeam

Mints 100 million Cyber Security Ecosystem Tokens allocated to the CYBRToken team.
The tokens are only available to the founders after 1 year of the ICO end.

```js
function mintTokensForTeam() external nonpayable onlyAdmin 
returns(bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### mintReserveTokens

Mints the 100 million Cyber Security Ecosystem Tokens allocated to the operational reserves.
The tokens are only available in the reserves after 1 year of the ICO end.

```js
function mintReserveTokens() external nonpayable onlyAdmin 
returns(bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### mintTokensForInitialPartnerships

Mints the 50 million tokens allocated for initial partnerships.
The tokens are only available to the partners after 6 months of the ICO end.

```js
function mintTokensForInitialPartnerships() external nonpayable onlyAdmin 
returns(bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### mintTokensForPartnerships

Mints the 50 million tokens allocated for partnerships.
The tokens are only available to the partners after 6 months of the ICO end.

```js
function mintTokensForPartnerships() external nonpayable onlyAdmin 
returns(bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### mintTokensForAdvisors

Mints the 60 million tokens allocated to the CYBRToken advisors.
The tokens are only available to the advisors after 1 year of the ICO end.

```js
function mintTokensForAdvisors() external nonpayable onlyAdmin 
returns(bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### mintTokensForPromotion

Mints the 30 million Cyber Security Ecosystem Tokens allocated to promotion.
The tokens are available at the end of the ICO.

```js
function mintTokensForPromotion() external nonpayable onlyAdmin 
returns(bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### computeHash

Computes keccak256 hash of the supplied value.

```js
function computeHash(string _key) private pure
returns(bytes32)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _key | string | The string value to compute hash from. | 

### mintOnce

Mints the tokens only once against the supplied key (category).

```js
function mintOnce(string _key, address _to, uint256 _amount) private nonpayable whenNotPaused whenNotMinted 
returns(bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _key | string | The key or the category of the allocation to mint the tokens for. | 
| _to | address | The address receiving the minted tokens. | 
| _amount | uint256 | The amount of tokens to mint. | 

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
