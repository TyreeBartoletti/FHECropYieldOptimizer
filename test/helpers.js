/**
 * Test Helper Functions for CropYieldOptimizer
 * Provides utility functions to simplify test code
 */

const { ethers } = require("hardhat");

/**
 * Deploy CropYieldOptimizer contract with custom configuration
 */
async function deployContract(pauserAddresses, kmsGeneration = 1) {
  const CropYieldOptimizer = await ethers.getContractFactory("CropYieldOptimizer");
  const contract = await CropYieldOptimizer.deploy(pauserAddresses, kmsGeneration);
  await contract.waitForDeployment();
  return contract;
}

/**
 * Register multiple farms at once
 */
async function registerFarms(contract, farmAccounts) {
  const promises = farmAccounts.map(farm =>
    contract.connect(farm).registerFarm()
  );
  await Promise.all(promises);
}

/**
 * Submit farm data for multiple farms
 */
async function submitMultipleFarmData(contract, farmAccounts, dataArray) {
  const promises = farmAccounts.map((farm, index) => {
    const data = dataArray[index];
    return contract.connect(farm).submitFarmData(
      data.soilQuality,
      data.waterUsage,
      data.fertilizerUsage,
      data.yieldAmount,
      data.cropType
    );
  });
  await Promise.all(promises);
}

/**
 * Setup a complete test scenario with registered farms and submitted data
 */
async function setupAnalysisScenario(contract, farmAccounts, dataArray) {
  await registerFarms(contract, farmAccounts);
  await submitMultipleFarmData(contract, farmAccounts, dataArray);
}

/**
 * Get current block timestamp
 */
async function getCurrentBlockTimestamp() {
  const block = await ethers.provider.getBlock('latest');
  return block.timestamp;
}

/**
 * Advance blockchain time (for testing time-dependent functions)
 */
async function advanceTime(seconds) {
  await ethers.provider.send("evm_increaseTime", [seconds]);
  await ethers.provider.send("evm_mine");
}

/**
 * Advance to next block
 */
async function advanceBlock() {
  await ethers.provider.send("evm_mine");
}

/**
 * Get the next block number
 */
async function getNextBlockNumber() {
  return await ethers.provider.getBlockNumber() + 1;
}

/**
 * Validate encrypted output format (bytes32)
 */
function isValidEncryptedOutput(bytes32Value) {
  return /^0x[0-9a-fA-F]{64}$/.test(bytes32Value);
}

/**
 * Create test pauser addresses from signers
 */
function createPauserAddresses(signers, count) {
  return signers.slice(0, count).map(s => s.address);
}

/**
 * Wait for transaction and return receipt
 */
async function waitForTx(txPromise) {
  const tx = await txPromise;
  return await tx.wait();
}

/**
 * Get gas used from transaction receipt
 */
async function getGasUsed(txPromise) {
  const tx = await txPromise;
  const receipt = await tx.wait();
  return receipt.gasUsed;
}

/**
 * Expect transaction to emit specific event with args
 */
async function expectEvent(txPromise, contract, eventName, args) {
  const tx = await txPromise;
  const receipt = await tx.wait();
  const event = receipt.logs.find(
    log => log.fragment && log.fragment.name === eventName
  );
  return event;
}

/**
 * Setup pausers and verify they are configured correctly
 */
async function setupAndVerifyPausers(contract, pauserAddresses) {
  for (let i = 0; i < pauserAddresses.length; i++) {
    const isPauser = await contract.isPauserAddress(pauserAddresses[i]);
    if (!isPauser) {
      throw new Error(`Pauser ${i} not properly configured`);
    }
  }
  return true;
}

/**
 * Get analysis statistics
 */
async function getAnalysisStats(contract, analysisId) {
  const [isActive, participatingFarms, createdAt] =
    await contract.getAnalysisInfo(analysisId);

  return {
    isActive,
    participatingFarms: Number(participatingFarms),
    createdAt: Number(createdAt)
  };
}

/**
 * Get platform statistics
 */
async function getPlatformStats(contract) {
  const [totalFarms, totalAnalyses, farmsWithData] =
    await contract.getPlatformStats();

  return {
    totalFarms: Number(totalFarms),
    totalAnalyses: Number(totalAnalyses),
    farmsWithData: Number(farmsWithData)
  };
}

/**
 * Create encrypted value for testing (simulated)
 */
function createMockEncryptedValue(data) {
  return ethers.id(`encrypted_${data}`);
}

/**
 * Verify farm is properly registered
 */
async function verifyFarmRegistered(contract, farmAddress) {
  const isRegistered = await contract.isFarmRegistered(farmAddress);
  const [hasSubmittedData] = await contract.getFarmDataStatus(farmAddress);

  return {
    isRegistered,
    hasSubmittedData
  };
}

module.exports = {
  deployContract,
  registerFarms,
  submitMultipleFarmData,
  setupAnalysisScenario,
  getCurrentBlockTimestamp,
  advanceTime,
  advanceBlock,
  getNextBlockNumber,
  isValidEncryptedOutput,
  createPauserAddresses,
  waitForTx,
  getGasUsed,
  expectEvent,
  setupAndVerifyPausers,
  getAnalysisStats,
  getPlatformStats,
  createMockEncryptedValue,
  verifyFarmRegistered
};
