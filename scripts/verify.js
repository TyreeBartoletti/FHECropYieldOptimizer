/**
 * Etherscan Verification Script for CropYieldOptimizer v2.0
 * Automatically verifies the deployed contract on Etherscan
 */

const hre = require("hardhat");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

async function main() {
  console.log("🔍 Starting Etherscan verification...\n");

  // Load deployment info
  const deploymentInfoPath = path.join(__dirname, "..", "deployment-info.json");

  if (!fs.existsSync(deploymentInfoPath)) {
    console.error("❌ deployment-info.json not found!");
    console.error("💡 Please deploy the contract first using: npm run deploy");
    process.exit(1);
  }

  const deploymentInfo = JSON.parse(fs.readFileSync(deploymentInfoPath, "utf8"));

  const contractAddress = deploymentInfo.contractAddress;
  const pauserAddresses = deploymentInfo.configuration.pauserAddresses;
  const kmsGeneration = deploymentInfo.configuration.kmsGeneration;

  console.log("📍 Contract address:", contractAddress);
  console.log("🌐 Network:", deploymentInfo.network);
  console.log("⚙️  Constructor arguments:");
  console.log("   - Pauser addresses:", pauserAddresses);
  console.log("   - KMS Generation:", kmsGeneration);

  console.log("\n🔄 Submitting to Etherscan...");

  try {
    await hre.run("verify:verify", {
      address: contractAddress,
      constructorArguments: [pauserAddresses, kmsGeneration],
    });

    console.log("\n✅ Contract verified successfully!");
    console.log("🔗 View on Etherscan:");
    console.log(`   https://sepolia.etherscan.io/address/${contractAddress}#code`);
  } catch (error) {
    if (error.message.includes("Already Verified")) {
      console.log("\n✅ Contract is already verified!");
      console.log("🔗 View on Etherscan:");
      console.log(`   https://sepolia.etherscan.io/address/${contractAddress}#code`);
    } else {
      console.error("\n❌ Verification failed:");
      console.error(error.message);

      console.log("\n💡 Manual verification command:");
      console.log(`npx hardhat verify --network ${deploymentInfo.network} ${contractAddress} \\`);
      console.log(`  '[${pauserAddresses.map(addr => `"${addr}"`).join(",")}]' \\`);
      console.log(`  ${kmsGeneration}`);

      process.exit(1);
    }
  }

  console.log("\n✨ Verification process completed! ✨\n");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Error during verification:");
    console.error(error);
    process.exit(1);
  });
