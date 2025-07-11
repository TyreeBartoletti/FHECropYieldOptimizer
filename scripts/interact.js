/**
 * Contract Interaction Script for CropYieldOptimizer v2.0
 * Demonstrates how to interact with the deployed contract
 */

const hre = require("hardhat");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

async function main() {
  console.log("🌾 CropYieldOptimizer Contract Interaction\n");

  // Load deployment info
  const deploymentInfoPath = path.join(__dirname, "..", "deployment-info.json");

  if (!fs.existsSync(deploymentInfoPath)) {
    console.error("❌ deployment-info.json not found!");
    console.error("💡 Please deploy the contract first using: npm run deploy");
    process.exit(1);
  }

  const deploymentInfo = JSON.parse(fs.readFileSync(deploymentInfoPath, "utf8"));
  const contractAddress = deploymentInfo.contractAddress;

  console.log("📍 Contract address:", contractAddress);
  console.log("🌐 Network:", hre.network.name);

  // Get contract instance
  const CropYieldOptimizer = await hre.ethers.getContractFactory("CropYieldOptimizer");
  const contract = CropYieldOptimizer.attach(contractAddress);

  // Get signer
  const [signer] = await hre.ethers.getSigners();
  console.log("👤 Signer address:", signer.address);
  console.log("💰 Balance:", hre.ethers.formatEther(await hre.ethers.provider.getBalance(signer.address)), "ETH");

  console.log("\n" + "=".repeat(60));
  console.log("📊 PLATFORM STATISTICS");
  console.log("=".repeat(60));

  try {
    // Get platform stats
    const [totalFarms, totalAnalyses, farmsWithData] = await contract.getPlatformStats();

    console.log("Total registered farms:", totalFarms.toString());
    console.log("Total analyses:", totalAnalyses.toString());
    console.log("Farms with submitted data:", farmsWithData.toString());

    // Get owner
    const owner = await contract.owner();
    console.log("Contract owner:", owner);

    // Get KMS generation
    const kmsGeneration = await contract.kmsGeneration();
    console.log("KMS Generation:", kmsGeneration.toString());

    // Get pauser count
    const pauserCount = await contract.getPauserCount();
    console.log("Number of pausers:", pauserCount.toString());

    // Get pause status
    const isPaused = await contract.isPaused();
    console.log("Contract paused:", isPaused);

    console.log("\n" + "=".repeat(60));
    console.log("🔐 PAUSER ADDRESSES");
    console.log("=".repeat(60));

    for (let i = 0; i < pauserCount; i++) {
      const pauser = await contract.getPauserAtIndex(i);
      const isActive = await contract.isPauserAddress(pauser);
      console.log(`Pauser ${i}: ${pauser} (Active: ${isActive})`);
    }

    console.log("\n" + "=".repeat(60));
    console.log("👨‍🌾 YOUR FARM STATUS");
    console.log("=".repeat(60));

    // Check if signer is registered
    const isRegistered = await contract.isFarmRegistered(signer.address);
    console.log("Registered:", isRegistered);

    if (isRegistered) {
      const [hasSubmittedData, timestamp] = await contract.getFarmDataStatus(signer.address);
      console.log("Data submitted:", hasSubmittedData);
      if (hasSubmittedData) {
        const date = new Date(Number(timestamp) * 1000);
        console.log("Last submission:", date.toLocaleString());
      }
    } else {
      console.log("\n💡 To register your farm, run:");
      console.log("   const tx = await contract.registerFarm();");
      console.log("   await tx.wait();");
    }

    console.log("\n" + "=".repeat(60));
    console.log("🔍 RECENT ANALYSES");
    console.log("=".repeat(60));

    if (totalAnalyses > 0n) {
      const recentCount = totalAnalyses > 5n ? 5 : Number(totalAnalyses);
      console.log(`Showing last ${recentCount} analyses:\n`);

      for (let i = 0; i < recentCount; i++) {
        const analysisId = Number(totalAnalyses) - i;
        const [isActive, participatingFarms, createdAt] = await contract.getAnalysisInfo(analysisId);

        const date = new Date(Number(createdAt) * 1000);
        console.log(`Analysis #${analysisId}:`);
        console.log(`  Active: ${isActive}`);
        console.log(`  Participating farms: ${participatingFarms.toString()}`);
        console.log(`  Created: ${date.toLocaleString()}`);
        console.log("");
      }
    } else {
      console.log("No analyses have been conducted yet.");
      console.log("\n💡 To start an analysis, you need at least 3 farms with submitted data.");
    }

    console.log("=".repeat(60));
    console.log("📋 AVAILABLE ACTIONS");
    console.log("=".repeat(60));

    console.log("\n1. Register Farm:");
    console.log("   await contract.registerFarm()");

    console.log("\n2. Submit Farm Data:");
    console.log("   await contract.submitFarmData(");
    console.log("     80,    // Soil quality (1-100)");
    console.log("     1500,  // Water usage (liters)");
    console.log("     200,   // Fertilizer usage (kg)");
    console.log("     5000,  // Yield amount (kg)");
    console.log("     3      // Crop type (1-10)");
    console.log("   )");

    console.log("\n3. Start Collaborative Analysis:");
    console.log("   await contract.startCollaborativeAnalysis()");

    console.log("\n4. Get Personalized Recommendations:");
    console.log("   await contract.getPersonalizedRecommendations(analysisId)");

    console.log("\n5. Request Decryption (for encrypted values):");
    console.log("   await contract.requestDecryption(encryptedValue)");

    console.log("\n" + "=".repeat(60));
    console.log("✅ Interaction completed successfully!");
    console.log("=".repeat(60) + "\n");

  } catch (error) {
    console.error("\n❌ Error interacting with contract:");
    console.error(error.message);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Script failed:");
    console.error(error);
    process.exit(1);
  });
