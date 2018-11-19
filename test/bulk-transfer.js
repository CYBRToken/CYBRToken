const Token = artifacts.require("./TokenBase.sol");
const BigNumber = require("bignumber.js");
const EVMRevert = require("./helpers/EVMRevert").EVMRevert;

require("chai")
  .use(require("chai-as-promised"))
  .use(require("chai-bignumber")(BigNumber))
  .should();

contract("BulkTransfer", function (accounts) {
  describe("Bulk Token Transfer Ruleset", async () => {
    let token;

    beforeEach(async () => {
      token = await Token.new();
      await token.addAdmin(accounts[2]);
    });

    it("must correctly perform bulk transfers.", async () => {
      const destinations = [];
      const balances = [];

      for (let i = 3; i < 7; i++) {
        destinations.push(accounts[i]);
        balances.push(i);
      };

      await token.bulkTransfer(destinations, balances);

      for (let i = 0; i < destinations.length; i++) {
        let balance = await token.balanceOf(destinations[i]);
        assert.equal(balance, balances[i]);
      };
    });

    it("must not allow non-whitelisted (non-admin) addresses to bulk transfers.", async () => {
      const balances = [];
      const destinations = [];

      for (let i = 1; i < 4; i++) {
        destinations.push(accounts[i]);
        balances.push(i);
      };

      await token.bulkTransfer(destinations, balances, {
        from: accounts[1]
      }).should.be.rejectedWith(EVMRevert);
    });

    it("must revert when the balance is less than the sum.", async () => {
      const balances = [];
      const destinations = [];

      for (let i = 1; i < 4; i++) {
        destinations.push(accounts[i]);
        balances.push(i);
      };

      let currentBalance = await token.balanceOf(accounts[0]);

      await token.transfer(accounts[6], currentBalance);
      await token.bulkTransfer(destinations, balances, {
        from: accounts[0]
      }).should.be.rejectedWith(EVMRevert);
    });
  });
});
