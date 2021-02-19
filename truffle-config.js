const HDWalletProvider = require('truffle-hdwallet-provider');

const { mnemonic, projectId, privateKeys, etherscanKey } = require('../secrets.json');

const conf = require('./config/index');

let nodeProvider = conf[conf.network].node;
nodeProvider.provider = new HDWalletProvider(mnemonic, nodeProvider.url, 10, 15);

let network = 'mint';
process.argv.forEach(function (val, index, array) {
  console.log(index + ': ' + val);
  if (index == 4) {
    network = val;
  }
});

module.exports = {
  migrations_directory: './migrations/' + network,
  api_keys: {
    etherscan: etherscanKey,
  },
  /**
   * Networks define how you connect to your ethereum client and let you set the
   * defaults web3 uses to send transactions. If you don't specify one truffle
   * will spin up a development blockchain for you on port 9545 when you
   * run `develop` or `test`. You can ask a truffle command to use a specific
   * network from the command line, e.g
   *
   * $ truffle test --network <network-name>
   */

  networks: {
    // Useful for testing. The `development` name is special - truffle uses it by default
    // if it's defined here and no other network is specified at the command line.
    // You should run a client (like ganache-cli, geth or parity) in a separate terminal
    // tab if you use this network and you must also set the `host`, `port` and `network_id`
    // options below to some value.
    //
    local: {
      // 本机节点
      provider: () => new HDWalletProvider(privateKeys, `http://127.0.0.1:8545`, 0, 5),
      network_id: '*',
      gas: 16748983,
      gasPrice: 20,
    },

    private: {
      // ETH公网私有链
      provider: () => new HDWalletProvider(privateKeys, `http://39.102.101.142:8545`, 2, 2),
      // host: "47.242.65.230",     // Localhost (default: none)
      // port: 8545,            // Standard Ethereum port (default: none)
      network_id: '1337', // Any network (default: none)
      timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
      gas: 6700000,
      gasPrice: 20000000000,
      // skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    },

    development1: {
      provider: () => new HDWalletProvider(privateKeys, `http://127.0.0.1:8545`),
      // host: "47.242.65.230",     // Localhost (default: none)
      // port: 8545,            // Standard Ethereum port (default: none)
      network_id: '*', // Any network (default: none)
      timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
      gas: 8000000,
      gasPrice: 1000000,
      // skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    },
    development: nodeProvider,

    // Another network with more advanced options...
    // advanced: {
    // port: 8777,             // Custom port
    // network_id: 1342,       // Custom network
    // gas: 8500000,           // Gas sent with each transaction (default: ~6700000)
    // gasPrice: 20000000000,  // 20 gwei (in wei) (default: 100 gwei)
    // from: <address>,        // Account to send txs from (default: accounts[0])
    // websockets: true        // Enable EventEmitter interface for web3 (default: false)
    // },

    // Useful for deploying to a public network.
    // NB: It's important to wrap the provider as a function.
    ropsten: {
      provider: () =>
        new HDWalletProvider(privateKeys, `https://ropsten.infura.io/v3/${projectId}`),
      network_id: 3, // Ropsten's id
      gas: 5500000, // Ropsten has a lower block limit than mainnet
      confirmations: 0, // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true, // Skip dry run before migrations? (default: false for public nets )
    },
    rinkeby: {
      provider: () =>
        new HDWalletProvider(privateKeys, `https://rinkeby.infura.io/v3/${projectId}`),
      network_id: 4, // Ropsten's id
      gas: 6700000,
      confirmations: 0, // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true, // Skip dry run before migrations? (default: false for public nets )
    },
    kovan: {
      provider: () => new HDWalletProvider(privateKeys, `https://kovan.infura.io/v3/${projectId}`),
      network_id: 42, // kovan's id
      gas: 6700000,
      confirmations: 0, // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true, // Skip dry run before migrations? (default: false for public nets )
    },
    mainnet: {
      provider: () =>
        new HDWalletProvider(privateKeys, `https://mainnet.infura.io/v3/${projectId}`),
      network_id: 1, // Ropsten's id
      gas: 5500000, // Ropsten has a lower block limit than mainnet
      confirmations: 0, // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true, // Skip dry run before migrations? (default: false for public nets )
    },

    // Useful for private networks
    // private: {
    // provider: () => new HDWalletProvider(mnemonic, `https://network.io`),
    // network_id: 2111,   // This network is yours, in the cloud.
    // production: true    // Treats this network as if it was a public net. (default: false)
    // }
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: '0.7.5', // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {
        // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
          enabled: true,
          runs: 200,
        },
        //  evmVersion: "byzantium"
      },
    },
  },
  plugins: ['truffle-plugin-verify', '@chainsafe/truffle-plugin-abigen'],
};