/*
 * NB: since truffle-hdwallet-provider 0.0.5 you must wrap HDWallet providers in a
 * function when declaring them. Failure to do so will cause commands to hang. ex:
 * ```
 * mainnet: {
 *     provider: function() {
 *       return new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/<infura-key>')
 *     },
 *     network_id: '1',
 *     gas: 4500000,
 *     gasPrice: 10000000000,
 *   },
 */

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*",
      gas: 7984452,
      gasPrice: 1
    },
    coverage: {
      host: "localhost",
      network_id: "*",
      port: 8545, // <-- If you change this, also set the port option in .solcover.js.
      gas: 7984452,
      gasPrice: 1
    }
  },
  mocha: {
    useColors: true
  },
  compilers: {
    solc: {
      version: "^0.4.24", // A version or constraint - Ex. "^0.5.0"
      // Can also be set to "native" to use a native solc
      docker: false, // Use a version obtained through docker
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    }
  }
};
