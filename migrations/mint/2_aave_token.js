

const LendToAaveMigrator = artifacts.require("LendToAaveMigrator");

const AaveToken = artifacts.require("AaveToken");

const AaveTokenV2 = artifacts.require("AaveTokenV2");

module.exports = async (deployer, network, accounts) => {

  // LendToAaveMigrator address，AAVE distribution contract，governance address
  await deployer.deploy(AaveToken);

  await deployer.deploy(AaveTokenV2);

};
