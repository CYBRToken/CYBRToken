const Token = artifacts.require("./TokenBase.sol");
const ForceEther = artifacts.require('./ForceEther.sol');
const ERC20 = artifacts.require('./ERC20Mock.sol');
const BigNumber = require("bignumber.js");
const EVMRevert = require("./helpers/EVMRevert").EVMRevert;
const ether = require("./helpers/ether").ether;
const getBalance = require('./helpers/web3').ethGetBalance
const million = 1000000;
const billion = 1000000000;

require("chai")
  .use(require("chai-as-promised"))
  .use(require("chai-bignumber")(BigNumber))
  .should();

contract("TokenBase:Reclaim", function (accounts) {
  describe("Reclaim Ruleset", () => {
    it('must allow an admin to recover accidentally sent ERC20 tokens.', async () => {
      let token = await Token.new();
      let erc20 = await ERC20.new(accounts[2], ether(100));
      
      await erc20.transfer(token.address, ether(1), {
        from: accounts[2]
      });

      assert.equal(await token.isAdmin(accounts[9]), false);

      await token.addAdmin(accounts[9]);

      token.reclaimToken(erc20.address, {
        from: accounts[9]
      });

      (await erc20.balanceOf(accounts[9])).should.be.bignumber.equal(ether(1));
    });

    it('must allow an admin to reclaim Ethers', async function () {
      let token = await Token.new();
      const amount = web3.toWei('1', 'ether');
      const balance = await getBalance(token.address);
      assert.equal(balance, 0);

      // Force ether
      const forceEther = await ForceEther.new({
        value: amount
      });
      await forceEther.destroyAndSend(token.address);
      const forcedBalance = await getBalance(token.address);
      assert.equal(forcedBalance, amount);

      // Reclaim
      const openingBalance = await getBalance(accounts[1]);

      await token.reclaimEther({
        from: accounts[1]
      }).should.be.rejectedWith(EVMRevert);

      await token.addAdmin(accounts[1]);
      await token.reclaimEther({
        from: accounts[1]
      });

      const closingBalance = await getBalance(accounts[1]);
      const tokenClosingBalance = await getBalance(token.address);
      assert.equal(tokenClosingBalance, 0);
      assert.isTrue(closingBalance.greaterThan(openingBalance));
    });
  });
});
