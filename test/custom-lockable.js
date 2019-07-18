const Contract = artifacts.require("./CYBRToken.sol");
const EVMRevert = require("./helpers/EVMRevert").EVMRevert;
const latestTime = require("./helpers/latestTime").latestTime;
const increaseTime = require("./helpers/increaseTime");
const increaseTimeTo = increaseTime.increaseTimeTo;
const duration = increaseTime.duration;
const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
const releaseDate = duration.days(90) + Math.floor(new Date().getTime() / 1000);
const ether = require("./helpers/ether").ether;
const BigNumber = require("bignumber.js");

require("chai")
  .use(require("chai-as-promised"))
  .use(require("chai-bignumber")(BigNumber))
  .should();

contract("Custom Lockable", function(accounts) {
  describe("Canlock Ruleset", () => {
    let customLockable;
    let owner = accounts[0];

    beforeEach(async () => {
      customLockable = await Contract.new();
    });

    it("must be correctly deployed with locking enabled by default.", async () => {
      assert.equal(await customLockable.canLock(), true);
    });

    it("must not allow non-admins/non-owner to disable locking.", async () => {
      await customLockable
        .disableLocking({ from: accounts[1] })
        .should.be.rejectedWith(EVMRevert);

      await customLockable
        .disableLocking({ from: accounts[2] })
        .should.be.rejectedWith(EVMRevert);
    });

    it("must allow the owner to completely disable locking feature and only once.", async () => {
      const { logs } = await customLockable.disableLocking({
        from: owner
      });

      assert.equal(await customLockable.canLock(), false);
      assert.equal(logs.length, 1);
      assert.equal(logs[0].event, "LockingDisabled");

      await customLockable
        .disableLocking({ from: owner })
        .should.be.rejectedWith(EVMRevert);
    });

    it("must allow an admin to completely disable locking feature and only once.", async () => {
      await customLockable.addManyAdmins([
        accounts[1],
        accounts[2],
        accounts[3]
      ]);

      await customLockable.disableLocking({ from: accounts[2] });
      assert.equal(await customLockable.canLock(), false);

      await customLockable
        .disableLocking({ from: owner })
        .should.be.rejectedWith(EVMRevert);
    });
  });

  describe("When Canlock Is Disabled Ruleset", () => {
    let customLockable;
    let owner = accounts[0];

    beforeEach(async () => {
      customLockable = await Contract.new();
      await customLockable.disableLocking({ from: owner });
    });

    it("must not allow adding locks.", async () => {
      await customLockable
        .addLock(accounts[9], releaseDate, { from: owner })
        .should.be.rejectedWith(EVMRevert);

      await customLockable
        .addLock(accounts[9], 0, { from: owner })
        .should.be.rejectedWith(EVMRevert);
    });

    it("must not allow adding many locks.", async () => {
      await customLockable
        .addManyLocks([accounts[1], accounts[2], accounts[3]], releaseDate, {
          from: owner
        })
        .should.be.rejectedWith(EVMRevert);

      await customLockable
        .addManyLocks([accounts[1], accounts[2], accounts[3]], 0, {
          from: owner
        })
        .should.be.rejectedWith(EVMRevert);
    });
  });

  describe("Add Lock Ruleset", () => {
    let customLockable;
    let owner = accounts[0];

    beforeEach(async () => {
      customLockable = await Contract.new();
    });

    it("must not allow zero address to be locked.", async () => {
      await customLockable
        .addLock(ZERO_ADDRESS, releaseDate, { from: owner })
        .should.be.rejectedWith(EVMRevert);

      await customLockable.addManyLocks(
        [accounts[1], accounts[2], ZERO_ADDRESS],
        releaseDate
      );

      assert.equal(await customLockable.lockingList(accounts[1]), releaseDate);
      assert.equal(await customLockable.isLocked(accounts[1]), true);
      assert.equal(await customLockable.lockingList(accounts[2]), releaseDate);
      assert.equal(await customLockable.isLocked(accounts[2]), true);

      assert.equal(await customLockable.lockingList(ZERO_ADDRESS), 0);
      assert.equal(await customLockable.isLocked(ZERO_ADDRESS), false);
    });

    it("must not allow owner to be locked.", async () => {
      await customLockable
        .addLock(owner, releaseDate, { from: owner })
        .should.be.rejectedWith(EVMRevert);

      await customLockable.addManyLocks(
        [accounts[1], accounts[2], owner],
        releaseDate
      );

      assert.equal(await customLockable.lockingList(accounts[1]), releaseDate);
      assert.equal(await customLockable.isLocked(accounts[1]), true);
      assert.equal(await customLockable.lockingList(accounts[2]), releaseDate);
      assert.equal(await customLockable.isLocked(accounts[2]), true);

      assert.equal(await customLockable.lockingList(owner), 0);
      assert.equal(await customLockable.isLocked(owner), false);
    });

    it("must not allow admins to be locked.", async () => {
      await customLockable.addManyAdmins([
        accounts[1],
        accounts[2],
        accounts[3]
      ]);

      await customLockable
        .addLock(accounts[1], releaseDate, { from: owner })
        .should.be.rejectedWith(EVMRevert);

      await customLockable
        .addLock(accounts[2], releaseDate, { from: owner })
        .should.be.rejectedWith(EVMRevert);
      await customLockable
        .addLock(accounts[3], releaseDate, { from: owner })
        .should.be.rejectedWith(EVMRevert);

      await customLockable.addManyLocks(
        [accounts[1], accounts[2], accounts[3], accounts[4]],
        releaseDate
      );

      assert.equal(await customLockable.lockingList(accounts[1]), 0);
      assert.equal(await customLockable.isLocked(accounts[1]), false);
      assert.equal(await customLockable.lockingList(accounts[2]), 0);
      assert.equal(await customLockable.isLocked(accounts[2]), false);
      assert.equal(await customLockable.lockingList(accounts[3]), 0);
      assert.equal(await customLockable.isLocked(accounts[3]), false);

      assert.equal(await customLockable.lockingList(accounts[4]), releaseDate);
      assert.equal(await customLockable.isLocked(accounts[4]), true);
    });

    it("must correctly update state variable", async () => {
      await customLockable.addLock(accounts[9], releaseDate, { from: owner });

      assert.equal(await customLockable.lockingList(accounts[9]), releaseDate);
      assert.equal(await customLockable.isLocked(accounts[9]), true);
    });

    it("must correctly update state variable when adding many locks", async () => {
      await customLockable.addManyLocks(
        [accounts[1], accounts[2], accounts[3], accounts[4]],
        releaseDate
      );

      assert.equal(await customLockable.lockingList(accounts[1]), releaseDate);
      assert.equal(await customLockable.isLocked(accounts[1]), true);
      assert.equal(await customLockable.lockingList(accounts[2]), releaseDate);
      assert.equal(await customLockable.isLocked(accounts[2]), true);
      assert.equal(await customLockable.lockingList(accounts[3]), releaseDate);
      assert.equal(await customLockable.isLocked(accounts[3]), true);
      assert.equal(await customLockable.lockingList(accounts[4]), releaseDate);
      assert.equal(await customLockable.isLocked(accounts[4]), true);
    });

    it("must not allow unlocking via addManyLocks function", async () => {
      await customLockable
        .addManyLocks([accounts[1], accounts[2], accounts[3], accounts[4]], 0)
        .should.be.rejectedWith(EVMRevert);
    });

    it("must correctly emit events: TokenLocked", async () => {
      const { logs } = await customLockable.addLock(accounts[9], releaseDate, {
        from: owner
      });

      assert.equal(logs.length, 1);
      assert.equal(logs[0].event, "TokenLocked");
      assert.equal(logs[0].args._address, accounts[9]);
      assert(logs[0].args._releaseDate.eq(releaseDate));
    });

    it("must correctly emit events: TokenUnlocked", async () => {
      await customLockable.addLock(accounts[9], releaseDate, {
        from: owner
      });

      const { logs } = await customLockable.addLock(accounts[9], 0, {
        from: owner
      });

      assert.equal(logs.length, 1);
      assert.equal(logs[0].event, "TokenUnlocked");
      assert.equal(logs[0].args._address, accounts[9]);
    });
  });

  describe("ERC20 Lock Ruleset", () => {
    let customLockable;
    let owner = accounts[0];

    beforeEach(async () => {
      customLockable = await Contract.new();
      await customLockable.enableTransfers();

      await customLockable.transfer(accounts[1], ether(100));
      await customLockable.transfer(accounts[2], ether(100));

      (await customLockable.balanceOf(accounts[1])).should.bignumber.equal(
        ether(100)
      );

      (await customLockable.balanceOf(accounts[2])).should.bignumber.equal(
        ether(100)
      );
    });

    it("must not allow allow transfer, transferFrom, approve, increaseApproval, decreaseApproval if locked", async () => {
      await customLockable.addLock(accounts[1], releaseDate);
      await customLockable.addLock(accounts[5], releaseDate);

      await customLockable
        .transfer(owner, ether(50), { from: accounts[1] })
        .should.be.rejectedWith(EVMRevert);
      await customLockable
        .approve(accounts[5], ether(50), { from: accounts[1] })
        .should.be.rejectedWith(EVMRevert);
      await customLockable
        .increaseApproval(accounts[5], ether(5), { from: accounts[1] })
        .should.be.rejectedWith(EVMRevert);
      await customLockable
        .decreaseApproval(accounts[5], ether(1), { from: accounts[1] })
        .should.be.rejectedWith(EVMRevert);

      //Account 2 is not locked
      await customLockable.transfer(accounts[5], ether(20), {
        from: accounts[2]
      });
      await customLockable.approve(accounts[5], ether(20), {
        from: accounts[2]
      });
      await customLockable.increaseApproval(accounts[5], ether(2), {
        from: accounts[2]
      });
      await customLockable.decreaseApproval(accounts[5], ether(1), {
        from: accounts[2]
      });
      await customLockable
        .approve(accounts[6], ether(50), { from: accounts[5] })
        .should.be.rejectedWith(EVMRevert);
      await customLockable.transferFrom(accounts[2], accounts[7], ether(2), {
        from: accounts[5]
      });
      await customLockable
        .approve(accounts[2], ether(10), { from: accounts[5] })
        .should.be.rejectedWith(EVMRevert);

      //Account 5 is locked
      await customLockable
        .transferFrom(accounts[5], accounts[7], ether(2), { from: accounts[2] })
        .should.be.rejectedWith(EVMRevert);

      (await customLockable.balanceOf(accounts[5])).should.bignumber.equal(
        ether(20)
      );
      (await customLockable.balanceOf(accounts[2])).should.bignumber.equal(
        ether(78)
      );

      await customLockable.transfer(accounts[1], ether(50), { from: owner });
      (await customLockable.balanceOf(accounts[1])).should.bignumber.equal(
        ether(150)
      );
    });

    it("must allow allow transfer, transferFrom, approve, increaseApproval, decreaseApproval after release date", async () => {
      await customLockable.addLock(accounts[1], releaseDate);
      await customLockable.addLock(accounts[5], releaseDate);

      await increaseTimeTo(releaseDate + duration.seconds(1));

      await customLockable.transfer(owner, ether(50), { from: accounts[1] });
      await customLockable.approve(accounts[5], ether(50), {
        from: accounts[1]
      });
      await customLockable.increaseApproval(accounts[5], ether(5), {
        from: accounts[1]
      });
      await customLockable.decreaseApproval(accounts[5], ether(1), {
        from: accounts[1]
      });

      //Account 2 is not locked
      await customLockable.transfer(accounts[5], ether(20), {
        from: accounts[2]
      });
      await customLockable.approve(accounts[5], ether(20), {
        from: accounts[2]
      });
      await customLockable.increaseApproval(accounts[5], ether(2), {
        from: accounts[2]
      });
      await customLockable.decreaseApproval(accounts[5], ether(1), {
        from: accounts[2]
      });
      await customLockable.approve(accounts[6], ether(50), {
        from: accounts[5]
      });
      await customLockable.transferFrom(accounts[2], accounts[7], ether(2), {
        from: accounts[5]
      });
      await customLockable.approve(accounts[2], ether(10), {
        from: accounts[5]
      });

      //Account 5 is locked
      await customLockable.transferFrom(accounts[5], accounts[7], ether(2), {
        from: accounts[2]
      });

      await customLockable.transfer(accounts[1], ether(50), { from: owner });
    });
  });
});
