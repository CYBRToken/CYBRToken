const Reclaimable = artifacts.require("./Reclaimable.sol");
const ForceEther = artifacts.require("./ForceEther.sol");
const ERC20 = artifacts.require("./ERC20Mock.sol");
const BigNumber = require("bignumber.js");
const EVMRevert = require("./helpers/EVMRevert").EVMRevert;
const ether = require("./helpers/ether").ether;
const getBalance = require("./helpers/web3").ethGetBalance;

require("chai")
  .use(require("chai-as-promised"))
  .use(require("chai-bignumber")(BigNumber))
  .should();

contract("Reclaimable", function(accounts) {
  describe("Reclaim Ruleset", () => {
    it("must allow an admin to recover accidentally sent ERC20 tokens.", async () => {
      let reclaimable = await Reclaimable.new();
      let erc20 = await ERC20.new(accounts[2], ether(100));

      await erc20.transfer(reclaimable.address, ether(1), {
        from: accounts[2]
      });

      assert.equal(await reclaimable.isAdmin(accounts[9]), false);

      await reclaimable.addAdmin(accounts[9]);

      await reclaimable.reclaimToken(erc20.address, {
        from: accounts[9]
      });

      (await erc20.balanceOf(accounts[9])).should.be.bignumber.equal(ether(1));
    });

    it("must allow an admin to reclaim Ethers", async function() {
      let reclaimable = await Reclaimable.new();
      const amount = web3.toWei("1", "ether");
      const balance = await getBalance(reclaimable.address);
      assert.equal(balance, 0);

      // Force ether
      const forceEther = await ForceEther.new({
        value: amount
      });
      await forceEther.destroyAndSend(reclaimable.address);
      const forcedBalance = await getBalance(reclaimable.address);
      assert.equal(forcedBalance, amount);

      // Reclaim
      const openingBalance = await getBalance(accounts[1]);

      await reclaimable
        .reclaimEther({
          from: accounts[1]
        })
        .should.be.rejectedWith(EVMRevert);

      await reclaimable.addAdmin(accounts[1]);
      await reclaimable.reclaimEther({
        from: accounts[1]
      });

      const closingBalance = await getBalance(accounts[1]);
      const tokenClosingBalance = await getBalance(reclaimable.address);
      assert.equal(tokenClosingBalance, 0);
      assert.isTrue(closingBalance.greaterThan(openingBalance));
    });
  });
});
