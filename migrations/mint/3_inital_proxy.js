const MockTransferHook = artifacts.require("MockTransferHook");
const InitializableAdminUpgradeabilityProxy = artifacts.require("InitializableAdminUpgradeabilityProxy");
const AaveToken = artifacts.require("AaveToken");

const AaveTokenV2 = artifacts.require("AaveTokenV2");

module.exports = async (deployer, network, accounts) => {
  let sender = accounts[0];
  let admin = accounts[1];

  await deployer.deploy(MockTransferHook);

  // V1 token
  await deployer.deploy(InitializableAdminUpgradeabilityProxy);

  let upgradeabilityProxyV1 = await InitializableAdminUpgradeabilityProxy.deployed();
  
  await upgradeabilityProxyV1.initialize(AaveToken.address, admin, "0x") 

  let aave = await AaveToken.at(upgradeabilityProxyV1.address);

  await aave.initialize(sender, sender, MockTransferHook.address);

  console.log("aave token v1 ", await aave.name(),InitializableAdminUpgradeabilityProxy.address);

  // V2 token

  await deployer.deploy(InitializableAdminUpgradeabilityProxy);

  let upgradeabilityProxyV2 = await InitializableAdminUpgradeabilityProxy.deployed();
  
  await upgradeabilityProxyV2.initialize(AaveTokenV2.address, admin, "0x") 

  let aaveV2 = await AaveTokenV2.at(upgradeabilityProxyV2.address);

  await aaveV2.initialize(); 
  console.log("aave token v2 ", await aave.name(),InitializableAdminUpgradeabilityProxy.address);
  
};
