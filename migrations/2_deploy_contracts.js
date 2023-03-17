const Certificate = artifacts.require("Certificate");



module.exports = function(deployer) {
  const gasLimit = 19000000;
deployer.deploy(Certificate, { gas: gasLimit });

};


