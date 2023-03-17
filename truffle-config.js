const HDWalletProvider = require('@truffle/hdwallet-provider');
const privateKeys = ['4ceb13b28203c0b6947c10e92f77c772be07479b57c7b9f5d90f1510b851bf5b'];

module.exports = {
  networks: {
    polygon: {
      provider: function() {
        return new HDWalletProvider(privateKeys, 'https://polygon-mumbai.infura.io/v3/2341a16b09ad43e4a98d0e75607640f0');
      },
      network_id: '80001',
      gasPrice: 1000000000, // 1 gwei
      gas: 8000000
    }
  },
  compilers: {
    solc: {
      version: "0.8.1",
    },
  },
}
