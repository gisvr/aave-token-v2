let conf = require('../config/index');
let host = conf[conf.network].node.url;
let network_id = conf[conf.network].node.network_id;
let Web3 = require("web3")
const web3 = new Web3(new Web3.providers.HttpProvider(host, { timeout: 100e3 }))
let contract = require("@truffle/contract");
const HDWalletProvider = require('truffle-hdwallet-provider');
let accounts = [];

const { mnemonic } = require('../../secrets.json');
let HD = new HDWalletProvider(mnemonic, host, 11, 5);

let getArttifact = async (path, addr) => {
  // let _chainId = await web3.eth.getChainId();
  if (accounts.length == 0) {
    accounts = HD.addresses;
    accounts.map((val) => {
      let priBuff = HD.wallets[val].privKey;
      let pri = '0x' + priBuff.toString('hex');
      web3.eth.accounts.wallet.add(pri);
      // console.log(val, pri);
    });
  }
  let sender = accounts[0];

  let _art = require(path);
  let artifact = contract(_art);
  artifact.setProvider(web3.currentProvider);
  artifact.setWallet(web3.eth.accounts.wallet);
  artifact.defaults({
    from: sender,
    gas: conf.deploy.gas,
    gasPrice: conf.deploy.gasPrice,
  });
  if (addr) {
    let actObj = await artifact.at(addr);
    let abi = artifact.abi;
    actObj.web3Obj = new artifact.web3.eth.Contract(abi, addr, {
      from: sender,
      gas: conf.deploy.gas,
      gasPrice: conf.deploy.gasPrice,
    });
    return actObj;
  }

  if (_art.networks &&_art.networks[network_id]) {
    addr = _art.networks[network_id].address;
    let actObj = await artifact.at(addr);
    let abi = artifact.abi;
    actObj.web3Obj = new artifact.web3.eth.Contract(abi, addr, {
      from: sender,
      gas: conf.deploy.gas,
      gasPrice: conf.deploy.gasPrice,
    });
    artifact = actObj;
  }
  return artifact;
};


module.exports = {


    async getMint(name, addr = false) {
        let path = "/Users/liyu/github/mars/mint-protocol-v2/build/contracts/" + name + ".json";
        return getArttifact(path, addr)
    },

    async getAaveV1(name, addr = false) {
        let path = "/Users/liyu/github/mars/aave-protocol/build/contracts/" + name + ".json";
        return getArttifact(path, addr);
    },

    async getAaveV2(name, addr = false) {
        let path = "/Users/liyu/github/defi/aave/protocol-v2/build/contracts/" + name + ".json";
        return getArttifact(path, addr)
    },

    async getCompound(name, addr = false) {
        ///Users/liyu/github/defi/compound/compound-protocol
        let path = "/Users/liyu/github/defi/compound/compound-protocol/build/contracts/" + name + ".json";
        return getArttifact(path, addr);
    },

    getAccounts() {
        web3.eth.defaultAccount = accounts[0];
        return accounts
    },
    getWeb3() {
        return web3
    }
}
