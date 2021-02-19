module.exports = {
  network: 'ganache', 
  ganache: require('./ganache'),
  geth: require('./geth'), 
  deploy: {
    gas: 800e4, //gaslimit
    gasPrice: 20e9, //20 Wei
  },
};
