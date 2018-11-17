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

contract("TokenBase", function (accounts) {
  describe("Token Creation Ruleset", () => {
    it("must correctly deploy with correct parameters and state variables.", async () => {
      let token = await Token.new();
      let owner = accounts[0];
      let expectedMaxSupply = 1 * billion;
      let expectedInitialSupply = 510 * million;

      assert.equal(await token.owner(), owner);
      assert.equal(await token.released(), false);
      assert.equal((await token.decimals()).toNumber(), 18);
      assert.equal(await token.name(), "CYBR Token");
      assert.equal(await token.symbol(), "CYBR");

      (await token.MAX_SUPPLY()).should.bignumber.equal(ether(expectedMaxSupply));
      (await token.totalSupply()).should.bignumber.equal(ether(expectedInitialSupply));
      (await token.balanceOf(owner)).should.bignumber.equal(ether(expectedInitialSupply));
    });
  });

  describe("Token Transfer State Ruleset", () => {
    it("must properly set the release state variable.", async () => {
      let token = await Token.new();
      await token.releaseTokenForTransfer();

      let released = await token.released();
      assert.equal(released, true);
    });

    it("must only allow admins to release tokens for transfers.", async () => {
      let token = await Token.new();

      await token.releaseTokenForTransfer({
        from: accounts[1]
      }).should.be.rejectedWith(EVMRevert);
    });

    it("must not allow anyone to release tokens for transfer when the token is paused.", async () => {
      let token = await Token.new();
      await token.pause();
      await token.releaseTokenForTransfer({
        from: accounts[1]
      }).should.be.rejectedWith(EVMRevert);
    });
  });

  describe("ERC20 Feature Ruleset (When Transfer State is Disabled)", async () => {
    let token;

    beforeEach(async () => {
      token = await Token.new();
      await token.addAdmin(accounts[1]);

      await token.releaseTokenForTransfer();
      await token.disableTokenTransfers();

      assert.equal(await token.isAdmin(accounts[0]), true);
      assert.equal(await token.isAdmin(accounts[1]), true);
    });

    it("must only allow an admin to transfer tokens when the transfer state is disabled.", async () => {
      await token.transfer(accounts[1], 10);
      let balance = await token.balanceOf(accounts[1]);
      assert.equal(balance.toNumber(), 10);

      await token.transfer(accounts[2], 9, {
        from: accounts[1]
      });
      let accounts2Balance = await token.balanceOf(accounts[2]);
      assert.equal(accounts2Balance.toNumber(), 9);

      await token.transfer(accounts[3], 8, {
        from: accounts[2]
      }).should.be.rejectedWith(EVMRevert);
    });

    it("must only allow an admin to approve spenders when the transfer state is disabled.", async () => {
      await token.approve(accounts[3], 10);
      let account3Allowance = await token.allowance(accounts[0], accounts[3]);
      assert.equal(account3Allowance.toNumber(), 10);

      await token.transfer(accounts[3], 10);
      await token.approve(accounts[2], 9, {
        from: accounts[3]
      }).should.be.rejectedWith(EVMRevert);
    });

    it("must only allow an admin to increase approvals when the transfer state is disabled.", async () => {
      await token.approve(accounts[3], 10);
      await token.increaseApproval(accounts[3], 1);

      let account3Allowance = await token.allowance(accounts[0], accounts[3]);
      assert.equal(account3Allowance.toNumber(), 11);

      await token.transfer(accounts[1], 11);
      await token.approve(accounts[3], 10, {
        from: accounts[1]
      });
      await token.removeAdmin(accounts[1]);
      await token.increaseApproval(accounts[3], 1, {
        from: accounts[1]
      }).should.be.rejectedWith(EVMRevert);
    });

    it("must only allow an admin to decrease approvals when the transfer state is disabled.", async () => {
      await token.approve(accounts[3], 10);
      await token.decreaseApproval(accounts[3], 1);

      let account3Allowance = await token.allowance(accounts[0], accounts[3]);
      assert.equal(account3Allowance.toNumber(), 9);

      await token.transfer(accounts[1], 11);
      await token.approve(accounts[3], 10, {
        from: accounts[1]
      });
      await token.removeAdmin(accounts[1]);
      await token.decreaseApproval(accounts[3], 1, {
        from: accounts[1]
      }).should.be.rejectedWith(EVMRevert);
    });

    it("must only allow an admin to transfer from approved accounts when the transfer state is disabled.", async () => {
      await token.approve(accounts[3], 10);
      await token.transferFrom(accounts[0], accounts[2], 1, {
        from: accounts[3]
      });

      let balance = await token.balanceOf(accounts[2]);
      assert.equal(balance.toNumber(), 1);

      await token.transfer(accounts[1], 10);
      await token.approve(accounts[4], 10, {
        from: accounts[1]
      });
      await token.removeAdmin(accounts[1]);
      await token.transferFrom(accounts[1], accounts[0], 1, {
        from: accounts[4]
      }).should.be.rejectedWith(EVMRevert);
    });
  });

  describe("ERC20 Feature Ruleset (When Paused)", async () => {
    let token;

    beforeEach(async () => {
      token = await Token.new();
      await token.addAdmin(accounts[1]);
      await token.releaseTokenForTransfer();
      await token.pause();
    });

    it("must only allow an admin to transfer when the token is paused.", async () => {
      await token.transfer(accounts[1], 10);
      let balance = await token.balanceOf(accounts[1]);
      assert.equal(balance.toNumber(), 10);

      await token.transfer(accounts[2], 9, {
        from: accounts[1]
      });
      let accounts2Balance = await token.balanceOf(accounts[2]);
      assert.equal(accounts2Balance.toNumber(), 9);

      await token.transfer(accounts[3], 8, {
        from: accounts[2]
      }).should.be.rejectedWith(EVMRevert);
    });

    it("must only allow an admin to approve spenders when the token is paused.", async () => {
      await token.approve(accounts[3], 10);
      let account3Allowance = await token.allowance(accounts[0], accounts[3]);
      assert.equal(account3Allowance.toNumber(), 10);

      await token.transfer(accounts[3], 10);
      await token.approve(accounts[2], 9, {
        from: accounts[3]
      }).should.be.rejectedWith(EVMRevert);
    });

    it("must only allow an admin to increase approvals when the token is paused.", async () => {
      await token.approve(accounts[3], 10);

      await token.increaseApproval(accounts[3], 1);
      let account3Allowance = await token.allowance(accounts[0], accounts[3]);
      assert.equal(account3Allowance.toNumber(), 11);

      await token.transfer(accounts[1], 11);
      await token.approve(accounts[3], 10, {
        from: accounts[1]
      });
      await token.removeAdmin(accounts[1]);
      await token.increaseApproval(accounts[3], 1, {
        from: accounts[1]
      }).should.be.rejectedWith(EVMRevert);
    });

    it("must only allow an admin to decrease approvals when the token is paused.", async () => {
      await token.approve(accounts[3], 10);

      await token.decreaseApproval(accounts[3], 1);
      let account3Allowance = await token.allowance(accounts[0], accounts[3]);
      assert.equal(account3Allowance.toNumber(), 9);

      await token.transfer(accounts[1], 11);
      await token.approve(accounts[3], 10, {
        from: accounts[1]
      });
      await token.removeAdmin(accounts[1]);
      await token.decreaseApproval(accounts[3], 1, {
        from: accounts[1]
      }).should.be.rejectedWith(EVMRevert);
    });

    it("must only allow an admin to transfer from approved accounts when the token is paused.", async () => {
      await token.approve(accounts[3], 10);

      await token.transferFrom(accounts[0], accounts[2], 1, {
        from: accounts[3]
      });
      let balance = await token.balanceOf(accounts[2]);
      assert.equal(balance.toNumber(), 1);

      await token.transfer(accounts[1], 10);
      await token.approve(accounts[4], 10, {
        from: accounts[1]
      });
      await token.removeAdmin(accounts[1]);
      await token.transferFrom(accounts[1], accounts[0], 1, {
        from: accounts[4]
      }).should.be.rejectedWith(EVMRevert);
    });
  });

  describe("Token Burn Ruleset", async () => {
    let token;

    beforeEach(async () => {
      token = await Token.new();
      await token.addAdmin(accounts[2]);
      await token.transfer(accounts[2], 10);
    });

    it("must correctly reduce the total supply when the burn feature is used.", async () => {
      let totalSupply = await token.totalSupply();
      await token.burn(1, {
        from: accounts[2]
      });

      (await token.totalSupply()).should.be.bignumber.equal(totalSupply.sub(1));
    });

    it("must correctly reduce the balance when the burn feature is used.", async () => {
      let balance = await token.balanceOf(accounts[2]);
      await token.burn(1, {
        from: accounts[2]
      });

      (await token.balanceOf(accounts[2])).should.be.bignumber.equal(balance.sub(1));
    });
  });

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

  describe("ERC20 Feature Ruleset (When Transfer State is Enabled)", async () => {
    let token;
    beforeEach(async () => {
      token = await Token.new();
      await token.transfer(accounts[1], 10);
      await token.releaseTokenForTransfer();
    });

    it("must enable transfers for everyone when the token is not paused and the transfer state is released.", async () => {
      await token.transfer(accounts[2], 10, {
        from: accounts[1]
      });
      let balance = await token.balanceOf(accounts[2]);
      assert.equal(balance.toNumber(), 10);
    });

    it("must enable approvals for everyone when the token is not paused and the transfer state is released.", async () => {
      await token.approve(accounts[3], 10, {
        from: accounts[1]
      });
      let account3Allowance = await token.allowance(accounts[1], accounts[3]);
      assert.equal(account3Allowance.toNumber(), 10);
    });

    it("must allow increasing approvals for everyone when the token is not paused and the transfer state is released.", async () => {
      await token.approve(accounts[3], 8, {
        from: accounts[1]
      });
      await token.increaseApproval(accounts[3], 1, {
        from: accounts[1]
      });
      let account3Allowance = await token.allowance(accounts[1], accounts[3]);
      assert.equal(account3Allowance.toNumber(), 9);
    });

    it("must allow decreasing approvals for everyone when the token is not paused and the transfer state is released.", async () => {
      await token.approve(accounts[3], 10, {
        from: accounts[1]
      });
      await token.decreaseApproval(accounts[3], 1, {
        from: accounts[1]
      });
      let account3Allowance = await token.allowance(accounts[1], accounts[3]);
      assert.equal(account3Allowance.toNumber(), 9);
    });

    it("must allow transfer from approved accounts for everyone when the token is not paused and the transfer state is released.", async () => {
      await token.approve(accounts[3], 10, {
        from: accounts[1]
      });
      await token.transferFrom(accounts[1], accounts[2], 1, {
        from: accounts[3]
      });
      let balance = await token.balanceOf(accounts[2]);
      assert.equal(balance.toNumber(), 1);
    });
  });
});
