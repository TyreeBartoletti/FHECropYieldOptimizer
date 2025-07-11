/**
 * Full Workflow Simulation Script for CropYieldOptimizer v2.0
 * Demonstrates complete user journey from registration to recommendations
 */

const hre = require("hardhat");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

// Sample farm data for simulation
const FARM_DATA = [
  { name: "Green Valley Farm", soilQuality: 85, waterUsage: 1600, fertilizerUsage: 220, yieldAmount: 5500, cropType: 3 },
  { name: "Sunny Acres", soilQuality: 78, waterUsage: 1450, fertilizerUsage: 190, yieldAmount: 5100, cropType: 3 },
  { name: "Mountain View Ranch", soilQuality: 82, waterUsage: 1550, fertilizerUsage: 210, yieldAmount: 5300, cropType: 3 },
  { name: "River Bend Farm", soilQuality: 88, waterUsage: 1700, fertilizerUsage: 230, yieldAmount: 5700, cropType: 3 },
  { name: "Prairie Harvest", soilQuality: 80, waterUsage: 1500, fertilizerUsage: 200, yieldAmount: 5200, cropType: 3 }
];

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  console.log("🌾 CropYieldOptimizer - Complete Workflow Simulation\n");
  console.log("=".repeat(70));
  console.log("This script simulates a complete user journey:");
  console.log("1. Register 5 farms");
  console.log("2. Submit encrypted agricultural data");
  console.log("3. Start collaborative analysis");
  console.log("4. Retrieve personalized recommendations");
  console.log("=".repeat(70) + "\n");

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
  console.log("");

  // Get contract instance
  const CropYieldOptimizer = await hre.ethers.getContractFactory("CropYieldOptimizer");
  const contract = CropYieldOptimizer.attach(contractAddress);

  // Get signers (simulate multiple farms)
  const signers = await hre.ethers.getSigners();
  const farmAccounts = signers.slice(0, 5); // Use first 5 accounts

  console.log("👨‍🌾 Using 5 test farm accounts:");
  for (let i = 0; i < farmAccounts.length; i++) {
    console.log(`   Farm ${i + 1}: ${farmAccounts[i].address}`);
  }
  console.log("");

  // Check if contract is paused
  const isPaused = await contract.isPaused();
  if (isPaused) {
    console.error("❌ Contract is currently paused!");
    console.error("💡 Please unpause the contract first.");
    process.exit(1);
  }

  console.log("=".repeat(70));
  console.log("STEP 1: REGISTERING FARMS");
  console.log("=".repeat(70) + "\n");

  for (let i = 0; i < farmAccounts.length; i++) {
    const farm = farmAccounts[i];
    const farmName = FARM_DATA[i].name;

    try {
      // Check if already registered
      const isRegistered = await contract.isFarmRegistered(farm.address);

      if (isRegistered) {
        console.log(`✓ ${farmName} is already registered`);
      } else {
        console.log(`📝 Registering ${farmName}...`);
        const tx = await contract.connect(farm).registerFarm();
        await tx.wait();
        console.log(`✅ ${farmName} registered successfully!`);
      }
    } catch (error) {
      console.error(`❌ Failed to register ${farmName}:`, error.message);
      process.exit(1);
    }

    await delay(500); // Small delay between transactions
  }

  console.log("\n" + "=".repeat(70));
  console.log("STEP 2: SUBMITTING ENCRYPTED AGRICULTURAL DATA");
  console.log("=".repeat(70) + "\n");

  for (let i = 0; i < farmAccounts.length; i++) {
    const farm = farmAccounts[i];
    const data = FARM_DATA[i];

    try {
      console.log(`📊 Submitting data for ${data.name}...`);
      console.log(`   Soil Quality: ${data.soilQuality}`);
      console.log(`   Water Usage: ${data.waterUsage} liters`);
      console.log(`   Fertilizer: ${data.fertilizerUsage} kg`);
      console.log(`   Yield: ${data.yieldAmount} kg`);
      console.log(`   Crop Type: ${data.cropType} (Rice)`);

      const tx = await contract.connect(farm).submitFarmData(
        data.soilQuality,
        data.waterUsage,
        data.fertilizerUsage,
        data.yieldAmount,
        data.cropType
      );

      const receipt = await tx.wait();
      const gasUsed = receipt.gasUsed;

      console.log(`✅ Data submitted! (Gas used: ${gasUsed.toString()})`);
      console.log("");
    } catch (error) {
      console.error(`❌ Failed to submit data for ${data.name}:`, error.message);
      process.exit(1);
    }

    await delay(500);
  }

  console.log("=".repeat(70));
  console.log("STEP 3: STARTING COLLABORATIVE ANALYSIS");
  console.log("=".repeat(70) + "\n");

  try {
    console.log("🔬 Initiating collaborative analysis across all farms...");
    console.log("⏳ This may take a moment as FHE computations are performed...");

    const tx = await contract.connect(farmAccounts[0]).startCollaborativeAnalysis();
    const receipt = await tx.wait();

    // Extract analysis ID from events
    const analysisStartedEvent = receipt.logs.find(
      log => log.fragment && log.fragment.name === "AnalysisStarted"
    );

    const analysisId = analysisStartedEvent ? analysisStartedEvent.args[0] : 1n;
    const participatingFarms = analysisStartedEvent ? analysisStartedEvent.args[1] : 5n;

    console.log(`✅ Analysis started successfully!`);
    console.log(`   Analysis ID: ${analysisId.toString()}`);
    console.log(`   Participating Farms: ${participatingFarms.toString()}`);
    console.log(`   Gas used: ${receipt.gasUsed.toString()}`);

    console.log("\n" + "=".repeat(70));
    console.log("STEP 4: RETRIEVING PERSONALIZED RECOMMENDATIONS");
    console.log("=".repeat(70) + "\n");

    for (let i = 0; i < farmAccounts.length; i++) {
      const farm = farmAccounts[i];
      const farmName = FARM_DATA[i].name;

      try {
        console.log(`🔍 Getting recommendations for ${farmName}...`);

        const [soilTreatment, waterAmount, fertilizerAmount, yieldIncrease] =
          await contract.connect(farm).getPersonalizedRecommendations(analysisId);

        console.log(`✅ Encrypted recommendations retrieved:`);
        console.log(`   Soil Treatment: ${soilTreatment}`);
        console.log(`   Water Amount: ${waterAmount}`);
        console.log(`   Fertilizer Amount: ${fertilizerAmount}`);
        console.log(`   Predicted Yield Increase: ${yieldIncrease}`);
        console.log("");
        console.log(`   ℹ️  These are encrypted values (bytes32 format)`);
        console.log(`   ℹ️  Use Gateway v2.0 to decrypt with your private key`);
        console.log("");
      } catch (error) {
        console.error(`❌ Failed to get recommendations for ${farmName}:`, error.message);
      }

      await delay(500);
    }

    console.log("=".repeat(70));
    console.log("STEP 5: PLATFORM STATISTICS");
    console.log("=".repeat(70) + "\n");

    const [totalFarms, totalAnalyses, farmsWithData] = await contract.getPlatformStats();

    console.log("📊 Final Platform Statistics:");
    console.log(`   Total Registered Farms: ${totalFarms.toString()}`);
    console.log(`   Total Analyses Conducted: ${totalAnalyses.toString()}`);
    console.log(`   Farms with Submitted Data: ${farmsWithData.toString()}`);

    const [isActive, participants, createdAt] = await contract.getAnalysisInfo(analysisId);
    const date = new Date(Number(createdAt) * 1000);

    console.log(`\n📈 Latest Analysis (ID: ${analysisId.toString()}):`);
    console.log(`   Status: ${isActive ? 'Active' : 'Inactive'}`);
    console.log(`   Participating Farms: ${participants.toString()}`);
    console.log(`   Created At: ${date.toLocaleString()}`);

    console.log("\n" + "=".repeat(70));
    console.log("✨ SIMULATION COMPLETED SUCCESSFULLY! ✨");
    console.log("=".repeat(70) + "\n");

    console.log("🎉 Summary:");
    console.log(`   ✅ ${farmAccounts.length} farms registered`);
    console.log(`   ✅ ${farmAccounts.length} datasets submitted (encrypted with FHE)`);
    console.log(`   ✅ 1 collaborative analysis performed`);
    console.log(`   ✅ ${farmAccounts.length} personalized recommendations generated`);
    console.log("");
    console.log("💡 Next Steps:");
    console.log("   1. Use the frontend to view and decrypt recommendations");
    console.log("   2. Use Gateway v2.0 to decrypt encrypted values");
    console.log("   3. Run 'npm run interact' to query contract state");
    console.log("");

  } catch (error) {
    console.error("\n❌ Error during analysis:");
    console.error(error.message);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Simulation failed:");
    console.error(error);
    process.exit(1);
  });
