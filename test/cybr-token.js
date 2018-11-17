const Token = artifacts.require('./CYBRToken.sol');
const BigNumber = require('bignumber.js');
const EVMRevert = require('./helpers/EVMRevert').EVMRevert;
const ether = require('./helpers/ether').ether;
const latestTime = require('./helpers/latestTime').latestTime;
const increaseTime = require('./helpers/increaseTime');
const increaseTimeTo = increaseTime.increaseTimeTo;
const duration = increaseTime.duration;
const icoEndsOn = duration.days(90) + Math.floor((new Date()).getTime() / 1000);
const million = 1000000;
const billion = 1000000000;

require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();

contract('CYBRToken', function (accounts) {
  describe('Token Creation Ruleset', () => {
    it('must correctly deploy with correct parameters and state variables.', async () => {
      let token = await Token.new();
      let owner = accounts[0];
      let expectedMaxSupply = 1 * billion;
      let expectedInitialSupply = 510 * million;

      assert.equal(await token.owner(), owner);
      assert.equal(await token.released(), false);
      assert.equal((await token.decimals()).toNumber(), 18);
      assert.equal(await token.name(), 'CYBR Token');
      assert.equal(await token.symbol(), 'CYBR');

      (await token.MAX_SUPPLY()).should.bignumber.equal(ether(expectedMaxSupply));
      (await token.totalSupply()).should.bignumber.equal(ether(expectedInitialSupply));
      (await token.balanceOf(owner)).should.bignumber.equal(ether(expectedInitialSupply));

      assert.equal((await token.icoEndDate()).toNumber(), 0);
    });
  });

  describe('ICO End Ruleset', () => {
    let token;

    beforeEach(async () => {
      token = await Token.new();
    });

    it('must properly set the ICO end date.', async () => {
      let currentTime = await latestTime();
      const icoEndDate = currentTime + duration.weeks(1);

      await token.setICOEndDate(icoEndDate);
      assert.equal((await token.icoEndDate()).toNumber(), icoEndDate);
    });

    it('must not allow non admins to set the ICO end date.', async () => {
      let currentTime = await latestTime();
      const icoEndDate = currentTime + duration.weeks(1);

      await token.setICOEndDate(icoEndDate, {
        from: accounts[1]
      }).should.be.rejectedWith(EVMRevert);
    });

    it('must not allow ICO end date to be set more than once.', async () => {
      let currentTime = await latestTime();
      const icoEndDate = currentTime + duration.weeks(1);

      await token.setICOEndDate(icoEndDate);
      await token.setICOEndDate(icoEndDate).should.be.rejectedWith(EVMRevert)
    });
  });

  describe('Minting feature ruleset', async () => {
    let token;

    beforeEach(async () => {
      token = await Token.new();
    });

    it('must correctly mint promotion tokens only once after the ICO and only if the ICO is successful.', async () => {
      const totalSupply = await token.totalSupply();
      const promotionTokens = ether(30 * million);

      /*-------------------------------------------------------------
       SHOULD NOT ALLOW MINTING BEFORE THE ICO STATE IS SET AS "SUCCESSFUL"
      -------------------------------------------------------------*/
      await token.addAdmin(accounts[1]);
      await token.setICOEndDate(icoEndsOn);

      await token.mintTokensForPromotion({ from : accounts[1] }).should.be.rejectedWith(EVMRevert);

      const endDate = (await token.icoEndDate()).toNumber();

      /*-------------------------------------------------------------
       SHOULD ALLOW MINTING ONLY WHEN THE ICO STATE IS SET AS SUCCESSFUL
      -------------------------------------------------------------*/
      await token.setSuccess({from: accounts[1]});
      await increaseTimeTo(endDate + duration.seconds(1));

      await token.mintTokensForPromotion({ from : accounts[1] });

      const balance = await token.balanceOf(accounts[1]);
      balance.should.be.bignumber.equal(promotionTokens);

      (await token.totalSupply()).should.be.bignumber.equal(totalSupply.add(promotionTokens));

      /*-------------------------------------------------------------
       ADDITIONAL CORRECTNESS RULE(S) 
      -------------------------------------------------------------*/

      //additional minting attempts of promotion tokens should be declined.
      await token.mintTokensForPromotion({ from : accounts[1] }).should.be.rejectedWith(EVMRevert);
    });

    it('must not allow minting of partnership tokens before the specified date.', async () => {
      await token.addAdmin(accounts[1]);
      await token.setSuccess();

      await token.mintTokensForPartnerships({
        from: accounts[1]
      }).should.be.rejectedWith(EVMRevert);
    });

    it('must allow minting of partnership tokens only once after 6 months from the ICO end date.', async () => {
      const totalSupply = await token.totalSupply();
      var balance = 0;

      const partnershipTokenCount = ether(50 * million);

      await token.addAdmin(accounts[1]);
      await token.setICOEndDate(icoEndsOn);
      await token.setSuccess();

      const endDate = (await token.icoEndDate()).toNumber();

      //Need to increase the EVM time after the lockup period.
      await increaseTimeTo(endDate + duration.days(182) + duration.seconds(1));

      /*-------------------------------------------------------------
       FOUNDER TOKEN MINTING
      -------------------------------------------------------------*/

      await token.mintTokensForPartnerships({
        from: accounts[1]
      });

      balance = await token.balanceOf(accounts[1]);
      balance.should.be.bignumber.equal(partnershipTokenCount);

      (await token.totalSupply()).should.be.bignumber.equal(totalSupply.add(partnershipTokenCount));

      /*-------------------------------------------------------------
       ADDITIONAL CORRECTNESS RULES
      -------------------------------------------------------------*/

      await token.mintTokensForPartnerships().should.be.rejectedWith(EVMRevert);
    });

    it('must not allow minting of founder tokens before the specified date.', async () => {
      await token.addAdmin(accounts[1]);
      await token.setSuccess();

      await token.mintTokensForFounders({
        from: accounts[1]
      }).should.be.rejectedWith(EVMRevert);
    });

    it('must allow minting of founder tokens only once after 1 year from the ICO end date.', async () => {
      const totalSupply = await token.totalSupply();
      var balance = 0;

      const founderTokenCount = ether(100 * million);

      await token.addAdmin(accounts[1]);
      await token.setICOEndDate(icoEndsOn);
      await token.setSuccess();

      const endDate = (await token.icoEndDate()).toNumber();

      //Need to increase the EVM time after the lockup period.
      await increaseTimeTo(endDate + duration.days(365) + duration.seconds(1));

      /*-------------------------------------------------------------
       FOUNDER TOKEN MINTING
      -------------------------------------------------------------*/

      await token.mintTokensForFounders({
        from: accounts[1]
      });

      balance = await token.balanceOf(accounts[1]);
      balance.should.be.bignumber.equal(founderTokenCount);

      (await token.totalSupply()).should.be.bignumber.equal(totalSupply.add(founderTokenCount));

      /*-------------------------------------------------------------
       ADDITIONAL CORRECTNESS RULES
      -------------------------------------------------------------*/

      await token.mintTokensForFounders().should.be.rejectedWith(EVMRevert);
    });

    it('must not allow minting of team tokens before the specified date.', async () => {
      await token.addAdmin(accounts[1]);
      await token.setSuccess();

      await token.mintTokensForTeam({
        from: accounts[1]
      }).should.be.rejectedWith(EVMRevert);
    });

    it('must allow minting of team tokens only once after 1 year from the ICO end date.', async () => {
      const totalSupply = await token.totalSupply();
      var balance = 0;

      const teamTokenCount = ether(150 * million);

      await token.addAdmin(accounts[1]);
      await token.setICOEndDate(icoEndsOn);
      await token.setSuccess();

      const endDate = (await token.icoEndDate()).toNumber();

      //Need to increase the EVM time after the lockup period.
      await increaseTimeTo(endDate + duration.days(365) + duration.minutes(1));

      /*-------------------------------------------------------------
       TEAM TOKEN MINTING
      -------------------------------------------------------------*/

      await token.mintTokensForTeam({
        from: accounts[1]
      });

      balance = await token.balanceOf(accounts[1]);
      balance.should.be.bignumber.equal(teamTokenCount);

      (await token.totalSupply()).should.be.bignumber.equal(totalSupply.add(teamTokenCount));

      /*-------------------------------------------------------------
       ADDITIONAL CORRECTNESS RULES
      -------------------------------------------------------------*/

      await token.mintTokensForTeam().should.be.rejectedWith(EVMRevert);
    });

    it('must not allow minting of reserve tokens before the specified date.', async () => {
      await token.addAdmin(accounts[1]);
      await token.setSuccess();
      await token.mintReserveTokens({
        from: accounts[1]
      }).should.be.rejectedWith(EVMRevert);
    });

    it('must allow minting of reserve tokens only once after 1 year from the ICO end date.', async () => {
      const totalSupply = await token.totalSupply();
      var balance = 0;

      const reserveTokenCount = ether(100 * million);

      await token.addAdmin(accounts[1]);
      await token.setICOEndDate(icoEndsOn);
      await token.setSuccess();

      const endDate = (await token.icoEndDate()).toNumber();
      assert.equal(icoEndsOn, endDate);

      //Need to increase the EVM time after the lockup period.
      await increaseTimeTo(endDate + duration.days(365) + duration.minutes(2));

      /*-------------------------------------------------------------
      RESERVE TOKEN MINTING
      -------------------------------------------------------------*/

      await token.mintReserveTokens({
        from: accounts[1]
      });

      balance = await token.balanceOf(accounts[1]);
      balance.should.be.bignumber.equal(reserveTokenCount);

      (await token.totalSupply()).should.be.bignumber.equal(totalSupply.add(reserveTokenCount));

      /*-------------------------------------------------------------
      ADDITIONAL CORRECTNESS RULES
      -------------------------------------------------------------*/

      await token.mintReserveTokens().should.be.rejectedWith(EVMRevert);
    });

    it('must not allow minting of advisor tokens before the specified date.', async () => {
      await token.addAdmin(accounts[1]);
      await token.setSuccess();

      await token.mintTokensForAdvisors({
        from: accounts[1]
      }).should.be.rejectedWith(EVMRevert);
    });

    it('must allow minting of advisor tokens only once after 1 year from the ICO end date.', async () => {
      const totalSupply = await token.totalSupply();
      var balance = 0;

      const advisorTokenCount = ether(60 * million);

      await token.addAdmin(accounts[1]);
      await token.setICOEndDate(icoEndsOn);
      await token.setSuccess();

      const endDate = (await token.icoEndDate()).toNumber();

      //Need to increase the EVM time after the lockup period.
      await increaseTimeTo(endDate + duration.days(365) + duration.minutes(5));

      /*-------------------------------------------------------------
       ADVISOR TOKEN MINTING
      -------------------------------------------------------------*/

      await token.mintTokensForAdvisors({
        from: accounts[1]
      });

      balance = await token.balanceOf(accounts[1]);
      balance.should.be.bignumber.equal(advisorTokenCount);

      (await token.totalSupply()).should.be.bignumber.equal(totalSupply.add(advisorTokenCount));

      /*-------------------------------------------------------------
       ADDITIONAL CORRECTNESS RULES
      -------------------------------------------------------------*/

      await token.mintTokensForAdvisors().should.be.rejectedWith(EVMRevert);
    });

    it('must exactly match the set maximum supply after all minting is performed.', async () => {
      const MAX_SUPPLY = await token.MAX_SUPPLY();

      await token.setICOEndDate(icoEndsOn);
      await token.setSuccess();

      //The EVM time is already increased to a date after the lockup period.
      // const endDate = (await token.icoEndDate()).toNumber();
      // await increaseTimeTo(endDate + duration.days(365) + duration.seconds(2));

      await token.mintTokensForFounders({ from : accounts[0] });
      await token.mintTokensForTeam({ from : accounts[0] });
      await token.mintReserveTokens({ from : accounts[0] });
      await token.mintTokensForPartnerships({ from : accounts[0] });
      await token.mintTokensForAdvisors({ from : accounts[0] });

      let totalSupply = await token.totalSupply();
      totalSupply.should.not.be.bignumber.equal(MAX_SUPPLY);

      (await token.balanceOf(accounts[0])).should.not.be.bignumber.equal(MAX_SUPPLY);

      /*-------------------------------------------------------------
       PROMOTION TOKEN ISN'T MINTED YET
      -------------------------------------------------------------*/

      await token.mintTokensForPromotion({ from : accounts[0] });

      totalSupply = await token.totalSupply();
      totalSupply.should.be.bignumber.equal(MAX_SUPPLY);

      (await token.balanceOf(accounts[0])).should.be.bignumber.equal(MAX_SUPPLY);
    });
  });
});