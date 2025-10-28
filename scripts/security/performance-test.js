/**
 * Performance Testing Script
 * Tests contract performance under various load conditions
 */

const { ethers } = require("hardhat");

async function main() {
  console.log("🚀 Performance Testing Suite");
  console.log("=" .repeat(60));
  console.log("");

  const [deployer] = await ethers.getSigners();

  // Performance metrics
  const metrics = {
    deployment: {},
    registration: {},
    dataSubmission: {},
    analysis: {},
  };

  try {
    // 1. Deployment Performance
    console.log("📦 Testing Deployment Performance...");
    const startDeploy = Date.now();

    const CropYieldOptimizer = await ethers.getContractFactory("CropYieldOptimizer");
    const pausers = [deployer.address, deployer.address, deployer.address];
    const contract = await CropYieldOptimizer.deploy(pausers, 1);
    await contract.waitForDeployment();

    const deployTime = Date.now() - startDeploy;
    metrics.deployment = {
      time: `${deployTime}ms`,
      status: deployTime < 30000 ? "✅ Fast" : "⚠️  Slow",
    };

    console.log(`  Time: ${deployTime}ms`);
    console.log(`  ${metrics.deployment.status}`);
    console.log("");

    // 2. Farm Registration Performance
    console.log("👨‍🌾 Testing Farm Registration Performance...");
    const signers = await ethers.getSigners();
    const registrationTimes = [];

    for (let i = 0; i < 5; i++) {
      const start = Date.now();
      const tx = await contract.connect(signers[i]).registerFarm();
      await tx.wait();
      const time = Date.now() - start;
      registrationTimes.push(time);
    }

    const avgRegistration = registrationTimes.reduce((a, b) => a + b, 0) / registrationTimes.length;
    metrics.registration = {
      average: `${avgRegistration.toFixed(0)}ms`,
      min: `${Math.min(...registrationTimes)}ms`,
      max: `${Math.max(...registrationTimes)}ms`,
      status: avgRegistration < 5000 ? "✅ Fast" : "⚠️  Slow",
    };

    console.log(`  Average: ${avgRegistration.toFixed(0)}ms`);
    console.log(`  Range: ${Math.min(...registrationTimes)}ms - ${Math.max(...registrationTimes)}ms`);
    console.log(`  ${metrics.registration.status}`);
    console.log("");

    // 3. Data Submission Performance
    console.log("📊 Testing Data Submission Performance...");
    const submissionTimes = [];

    for (let i = 0; i < 5; i++) {
      const start = Date.now();
      const tx = await contract.connect(signers[i]).submitFarmData(
        80,    // soilQuality
        1500,  // waterUsage
        200,   // fertilizerUsage
        5000,  // yieldAmount
        i + 1  // cropType
      );
      await tx.wait();
      const time = Date.now() - start;
      submissionTimes.push(time);
    }

    const avgSubmission = submissionTimes.reduce((a, b) => a + b, 0) / submissionTimes.length;
    metrics.dataSubmission = {
      average: `${avgSubmission.toFixed(0)}ms`,
      min: `${Math.min(...submissionTimes)}ms`,
      max: `${Math.max(...submissionTimes)}ms`,
      status: avgSubmission < 10000 ? "✅ Acceptable" : "⚠️  Slow",
    };

    console.log(`  Average: ${avgSubmission.toFixed(0)}ms`);
    console.log(`  Range: ${Math.min(...submissionTimes)}ms - ${Math.max(...submissionTimes)}ms`);
    console.log(`  ${metrics.dataSubmission.status}`);
    console.log("");

    // 4. Analysis Performance
    console.log("🔬 Testing Analysis Performance...");
    const start = Date.now();
    const tx = await contract.startCollaborativeAnalysis();
    await tx.wait();
    const analysisTime = Date.now() - start;

    metrics.analysis = {
      time: `${analysisTime}ms`,
      participants: "5 farms",
      status: analysisTime < 15000 ? "✅ Acceptable" : "⚠️  Slow",
    };

    console.log(`  Time: ${analysisTime}ms`);
    console.log(`  Participants: 5 farms`);
    console.log(`  ${metrics.analysis.status}`);
    console.log("");

    // Performance Summary
    console.log("=" .repeat(60));
    console.log("📈 Performance Summary:");
    console.log("");
    console.log("Deployment:");
    console.log(`  Time: ${metrics.deployment.time} ${metrics.deployment.status}`);
    console.log("");
    console.log("Farm Registration:");
    console.log(`  Average: ${metrics.registration.average} ${metrics.registration.status}`);
    console.log(`  Range: ${metrics.registration.min} - ${metrics.registration.max}`);
    console.log("");
    console.log("Data Submission:");
    console.log(`  Average: ${metrics.dataSubmission.average} ${metrics.dataSubmission.status}`);
    console.log(`  Range: ${metrics.dataSubmission.min} - ${metrics.dataSubmission.max}`);
    console.log("");
    console.log("Analysis (5 farms):");
    console.log(`  Time: ${metrics.analysis.time} ${metrics.analysis.status}`);
    console.log("");

    // Recommendations
    console.log("💡 Performance Recommendations:");
    console.log("");

    if (avgSubmission > 5000) {
      console.log("  ⚠️  Data submission is relatively slow");
      console.log("     - Expected due to FHE encryption overhead");
      console.log("     - Consider batching submissions for multiple data points");
    }

    if (analysisTime > 10000) {
      console.log("  ⚠️  Analysis time increases with farm count");
      console.log("     - Implement maximum participants limit");
      console.log("     - Consider pagination for large datasets");
    }

    console.log("");
    console.log("✅ Performance testing complete");

  } catch (error) {
    console.error("❌ Performance test failed:", error.message);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
