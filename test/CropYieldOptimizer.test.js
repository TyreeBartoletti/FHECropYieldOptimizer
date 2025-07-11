const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CropYieldOptimizer v2.0", function () {
  let cropYieldOptimizer;
  let owner;
  let farm1, farm2, farm3, farm4, farm5;
  let pauser1, pauser2, pauser3;
  let pauserAddresses;
  const KMS_GENERATION = 1;

  beforeEach(async function () {
    // Get signers
    [owner, farm1, farm2, farm3, farm4, farm5, pauser1, pauser2, pauser3] = await ethers.getSigners();

    // Setup pauser addresses
    pauserAddresses = [pauser1.address, pauser2.address, pauser3.address];

    // Deploy contract
    const CropYieldOptimizer = await ethers.getContractFactory("CropYieldOptimizer");
    cropYieldOptimizer = await CropYieldOptimizer.deploy(pauserAddresses, KMS_GENERATION);
    await cropYieldOptimizer.waitForDeployment();
  });

  // ==================== DEPLOYMENT TESTS ====================
  describe("1. Contract Deployment", function () {
    it("1.1 Should deploy with correct owner", async function () {
      expect(await cropYieldOptimizer.owner()).to.equal(owner.address);
    });

    it("1.2 Should initialize with correct KMS generation", async function () {
      expect(await cropYieldOptimizer.kmsGeneration()).to.equal(KMS_GENERATION);
    });

    it("1.3 Should register all pauser addresses correctly", async function () {
      expect(await cropYieldOptimizer.getPauserCount()).to.equal(3);
      expect(await cropYieldOptimizer.isPauserAddress(pauser1.address)).to.be.true;
      expect(await cropYieldOptimizer.isPauserAddress(pauser2.address)).to.be.true;
      expect(await cropYieldOptimizer.isPauserAddress(pauser3.address)).to.be.true;
    });

    it("1.4 Should start unpaused", async function () {
      expect(await cropYieldOptimizer.isPaused()).to.be.false;
    });

    it("1.5 Should initialize with zero farms", async function () {
      expect(await cropYieldOptimizer.totalFarms()).to.equal(0);
    });
  });

  // ==================== FARM REGISTRATION TESTS ====================
  describe("2. Farm Registration", function () {
    it("2.1 Should allow new farm to register", async function () {
      await expect(cropYieldOptimizer.connect(farm1).registerFarm())
        .to.emit(cropYieldOptimizer, "FarmRegistered")
        .withArgs(farm1.address, await ethers.provider.getBlockNumber() + 1);

      expect(await cropYieldOptimizer.isFarmRegistered(farm1.address)).to.be.true;
    });

    it("2.2 Should increment totalFarms on registration", async function () {
      await cropYieldOptimizer.connect(farm1).registerFarm();
      expect(await cropYieldOptimizer.totalFarms()).to.equal(1);
    });

    it("2.3 Should reject duplicate registration", async function () {
      await cropYieldOptimizer.connect(farm1).registerFarm();
      await expect(
        cropYieldOptimizer.connect(farm1).registerFarm()
      ).to.be.revertedWith("Farm already registered");
    });

    it("2.4 Should allow multiple farms to register", async function () {
      await cropYieldOptimizer.connect(farm1).registerFarm();
      await cropYieldOptimizer.connect(farm2).registerFarm();
      await cropYieldOptimizer.connect(farm3).registerFarm();

      expect(await cropYieldOptimizer.totalFarms()).to.equal(3);
    });

    it("2.5 Should reject registration when paused", async function () {
      await cropYieldOptimizer.connect(pauser1).pause();
      await expect(
        cropYieldOptimizer.connect(farm1).registerFarm()
      ).to.be.revertedWith("Contract is paused");
    });
  });

  // ==================== DATA SUBMISSION TESTS ====================
  describe("3. Encrypted Data Submission", function () {
    beforeEach(async function () {
      await cropYieldOptimizer.connect(farm1).registerFarm();
    });

    it("3.1 Should accept valid encrypted farm data", async function () {
      await expect(
        cropYieldOptimizer.connect(farm1).submitFarmData(80, 1500, 200, 5000, 3)
      ).to.emit(cropYieldOptimizer, "DataSubmitted")
        .withArgs(farm1.address, await ethers.provider.getBlockNumber() + 1);
    });

    it("3.2 Should reject invalid crop type (zero)", async function () {
      await expect(
        cropYieldOptimizer.connect(farm1).submitFarmData(80, 1500, 200, 5000, 0)
      ).to.be.revertedWith("Invalid crop type");
    });

    it("3.3 Should reject invalid crop type (>10)", async function () {
      await expect(
        cropYieldOptimizer.connect(farm1).submitFarmData(80, 1500, 200, 5000, 11)
      ).to.be.revertedWith("Invalid crop type");
    });

    it("3.4 Should reject zero soil quality", async function () {
      await expect(
        cropYieldOptimizer.connect(farm1).submitFarmData(0, 1500, 200, 5000, 3)
      ).to.be.revertedWith("Invalid input data");
    });

    it("3.5 Should reject zero water usage", async function () {
      await expect(
        cropYieldOptimizer.connect(farm1).submitFarmData(80, 0, 200, 5000, 3)
      ).to.be.revertedWith("Invalid input data");
    });

    it("3.6 Should only allow registered farms to submit data", async function () {
      await expect(
        cropYieldOptimizer.connect(farm2).submitFarmData(80, 1500, 200, 5000, 3)
      ).to.be.revertedWith("Farm not registered");
    });

    it("3.7 Should update farm data status after submission", async function () {
      await cropYieldOptimizer.connect(farm1).submitFarmData(80, 1500, 200, 5000, 3);
      const [submitted] = await cropYieldOptimizer.getFarmDataStatus(farm1.address);
      expect(submitted).to.be.true;
    });

    it("3.8 Should accept data for all valid crop types (1-10)", async function () {
      for (let cropType = 1; cropType <= 10; cropType++) {
        const farm = [farm1, farm2, farm3, farm4, farm5][cropType % 5];
        if (cropType > 1) {
          await cropYieldOptimizer.connect(farm).registerFarm();
        }
        await expect(
          cropYieldOptimizer.connect(farm).submitFarmData(80, 1500, 200, 5000, cropType)
        ).to.not.be.reverted;
      }
    });

    it("3.9 Should reject data submission when paused", async function () {
      await cropYieldOptimizer.connect(pauser1).pause();
      await expect(
        cropYieldOptimizer.connect(farm1).submitFarmData(80, 1500, 200, 5000, 3)
      ).to.be.revertedWith("Contract is paused");
    });

    it("3.10 Should allow farms to update their data", async function () {
      await cropYieldOptimizer.connect(farm1).submitFarmData(80, 1500, 200, 5000, 3);
      await expect(
        cropYieldOptimizer.connect(farm1).submitFarmData(85, 1600, 210, 5200, 3)
      ).to.not.be.reverted;
    });
  });

  // ==================== COLLABORATIVE ANALYSIS TESTS ====================
  describe("4. Collaborative Analysis", function () {
    beforeEach(async function () {
      // Register 3 farms and submit data
      await cropYieldOptimizer.connect(farm1).registerFarm();
      await cropYieldOptimizer.connect(farm2).registerFarm();
      await cropYieldOptimizer.connect(farm3).registerFarm();

      await cropYieldOptimizer.connect(farm1).submitFarmData(80, 1500, 200, 5000, 3);
      await cropYieldOptimizer.connect(farm2).submitFarmData(75, 1400, 180, 4800, 3);
      await cropYieldOptimizer.connect(farm3).submitFarmData(85, 1600, 220, 5200, 3);
    });

    it("4.1 Should start analysis with minimum 3 farms", async function () {
      await expect(cropYieldOptimizer.startCollaborativeAnalysis())
        .to.emit(cropYieldOptimizer, "AnalysisStarted")
        .withArgs(1, 3);
    });

    it("4.2 Should reject analysis with less than 3 farms", async function () {
      const CropYieldOptimizer = await ethers.getContractFactory("CropYieldOptimizer");
      const newContract = await CropYieldOptimizer.deploy(pauserAddresses, KMS_GENERATION);

      await newContract.connect(farm1).registerFarm();
      await newContract.connect(farm2).registerFarm();
      await newContract.connect(farm1).submitFarmData(80, 1500, 200, 5000, 3);
      await newContract.connect(farm2).submitFarmData(75, 1400, 180, 4800, 3);

      await expect(
        newContract.startCollaborativeAnalysis()
      ).to.be.revertedWith("Need at least 3 farms for analysis");
    });

    it("4.3 Should generate recommendation event", async function () {
      await expect(cropYieldOptimizer.startCollaborativeAnalysis())
        .to.emit(cropYieldOptimizer, "RecommendationGenerated")
        .withArgs(1);
    });

    it("4.4 Should create active analysis result", async function () {
      await cropYieldOptimizer.startCollaborativeAnalysis();
      const [isActive, participatingFarms] = await cropYieldOptimizer.getAnalysisInfo(1);

      expect(isActive).to.be.true;
      expect(participatingFarms).to.equal(3);
    });

    it("4.5 Should increment analysis ID", async function () {
      await cropYieldOptimizer.startCollaborativeAnalysis();
      await cropYieldOptimizer.startCollaborativeAnalysis();

      const [isActive1] = await cropYieldOptimizer.getAnalysisInfo(1);
      const [isActive2] = await cropYieldOptimizer.getAnalysisInfo(2);

      expect(isActive1).to.be.true;
      expect(isActive2).to.be.true;
    });

    it("4.6 Should reject analysis when paused", async function () {
      await cropYieldOptimizer.connect(pauser1).pause();
      await expect(
        cropYieldOptimizer.startCollaborativeAnalysis()
      ).to.be.revertedWith("Contract is paused");
    });

    it("4.7 Should count only farms with submitted data", async function () {
      await cropYieldOptimizer.connect(farm4).registerFarm();
      await cropYieldOptimizer.startCollaborativeAnalysis();

      const [, participatingFarms] = await cropYieldOptimizer.getAnalysisInfo(1);
      expect(participatingFarms).to.equal(3); // Only 3 farms have data
    });

    it("4.8 Should work with more than minimum farms", async function () {
      await cropYieldOptimizer.connect(farm4).registerFarm();
      await cropYieldOptimizer.connect(farm5).registerFarm();
      await cropYieldOptimizer.connect(farm4).submitFarmData(90, 1700, 230, 5500, 3);
      await cropYieldOptimizer.connect(farm5).submitFarmData(88, 1650, 225, 5400, 3);

      await cropYieldOptimizer.startCollaborativeAnalysis();
      const [, participatingFarms] = await cropYieldOptimizer.getAnalysisInfo(1);
      expect(participatingFarms).to.equal(5);
    });
  });

  // ==================== PERSONALIZED RECOMMENDATIONS TESTS ====================
  describe("5. Personalized Recommendations", function () {
    beforeEach(async function () {
      await cropYieldOptimizer.connect(farm1).registerFarm();
      await cropYieldOptimizer.connect(farm2).registerFarm();
      await cropYieldOptimizer.connect(farm3).registerFarm();

      await cropYieldOptimizer.connect(farm1).submitFarmData(80, 1500, 200, 5000, 3);
      await cropYieldOptimizer.connect(farm2).submitFarmData(75, 1400, 180, 4800, 3);
      await cropYieldOptimizer.connect(farm3).submitFarmData(85, 1600, 220, 5200, 3);

      await cropYieldOptimizer.startCollaborativeAnalysis();
    });

    it("5.1 Should allow registered farm with data to get recommendations", async function () {
      const result = await cropYieldOptimizer.connect(farm1).getPersonalizedRecommendations(1);
      expect(result).to.have.lengthOf(4); // [soilTreatment, waterAmount, fertilizerAmount, yieldIncrease]
    });

    it("5.2 Should reject unregistered farm", async function () {
      await expect(
        cropYieldOptimizer.connect(farm4).getPersonalizedRecommendations(1)
      ).to.be.revertedWith("Farm not registered");
    });

    it("5.3 Should reject farm without submitted data", async function () {
      await cropYieldOptimizer.connect(farm4).registerFarm();
      await expect(
        cropYieldOptimizer.connect(farm4).getPersonalizedRecommendations(1)
      ).to.be.revertedWith("Must have submitted data");
    });

    it("5.4 Should reject invalid analysis ID", async function () {
      await expect(
        cropYieldOptimizer.connect(farm1).getPersonalizedRecommendations(999)
      ).to.be.revertedWith("Analysis not found or inactive");
    });

    it("5.5 Should return encrypted recommendations (bytes32)", async function () {
      const [soilTreatment, waterAmount, fertilizerAmount, yieldIncrease] =
        await cropYieldOptimizer.connect(farm1).getPersonalizedRecommendations(1);

      expect(soilTreatment).to.match(/^0x[0-9a-fA-F]{64}$/);
      expect(waterAmount).to.match(/^0x[0-9a-fA-F]{64}$/);
      expect(fertilizerAmount).to.match(/^0x[0-9a-fA-F]{64}$/);
      expect(yieldIncrease).to.match(/^0x[0-9a-fA-F]{64}$/);
    });

    it("5.6 Should work for multiple analyses", async function () {
      await cropYieldOptimizer.startCollaborativeAnalysis();

      const result1 = await cropYieldOptimizer.connect(farm1).getPersonalizedRecommendations(1);
      const result2 = await cropYieldOptimizer.connect(farm1).getPersonalizedRecommendations(2);

      expect(result1).to.have.lengthOf(4);
      expect(result2).to.have.lengthOf(4);
    });
  });

  // ==================== GATEWAY V2.0 FEATURES ====================
  describe("6. Gateway v2.0 - Pauser Management", function () {
    it("6.1 Should allow owner to add new pauser", async function () {
      const newPauser = farm4.address;
      await expect(cropYieldOptimizer.addPauser(newPauser))
        .to.emit(cropYieldOptimizer, "PauserAdded")
        .withArgs(newPauser, await ethers.provider.getBlockNumber() + 1);

      expect(await cropYieldOptimizer.isPauserAddress(newPauser)).to.be.true;
    });

    it("6.2 Should reject non-owner adding pauser", async function () {
      await expect(
        cropYieldOptimizer.connect(farm1).addPauser(farm2.address)
      ).to.be.revertedWith("Not authorized");
    });

    it("6.3 Should reject adding duplicate pauser", async function () {
      await expect(
        cropYieldOptimizer.addPauser(pauser1.address)
      ).to.be.revertedWith("Already a pauser");
    });

    it("6.4 Should reject adding zero address pauser", async function () {
      await expect(
        cropYieldOptimizer.addPauser(ethers.ZeroAddress)
      ).to.be.revertedWith("Invalid pauser address");
    });

    it("6.5 Should allow owner to remove pauser", async function () {
      await expect(cropYieldOptimizer.removePauser(pauser1.address))
        .to.emit(cropYieldOptimizer, "PauserRemoved")
        .withArgs(pauser1.address, await ethers.provider.getBlockNumber() + 1);

      expect(await cropYieldOptimizer.isPauserAddress(pauser1.address)).to.be.false;
    });

    it("6.6 Should reject removing non-pauser", async function () {
      await expect(
        cropYieldOptimizer.removePauser(farm1.address)
      ).to.be.revertedWith("Not a pauser");
    });
  });

  describe("7. Gateway v2.0 - Pause/Unpause", function () {
    it("7.1 Should allow pauser to pause contract", async function () {
      await expect(cropYieldOptimizer.connect(pauser1).pause())
        .to.emit(cropYieldOptimizer, "ContractPaused")
        .withArgs(pauser1.address, await ethers.provider.getBlockNumber() + 1);

      expect(await cropYieldOptimizer.isPaused()).to.be.true;
    });

    it("7.2 Should reject non-pauser pausing", async function () {
      await expect(
        cropYieldOptimizer.connect(farm1).pause()
      ).to.be.revertedWith("Not a pauser");
    });

    it("7.3 Should reject pausing when already paused", async function () {
      await cropYieldOptimizer.connect(pauser1).pause();
      await expect(
        cropYieldOptimizer.connect(pauser2).pause()
      ).to.be.revertedWith("Already paused");
    });

    it("7.4 Should allow owner to unpause", async function () {
      await cropYieldOptimizer.connect(pauser1).pause();
      await expect(cropYieldOptimizer.unpause())
        .to.emit(cropYieldOptimizer, "ContractUnpaused")
        .withArgs(owner.address, await ethers.provider.getBlockNumber() + 1);

      expect(await cropYieldOptimizer.isPaused()).to.be.false;
    });

    it("7.5 Should reject non-owner unpausing", async function () {
      await cropYieldOptimizer.connect(pauser1).pause();
      await expect(
        cropYieldOptimizer.connect(pauser1).unpause()
      ).to.be.revertedWith("Not authorized");
    });

    it("7.6 Should reject unpausing when not paused", async function () {
      await expect(
        cropYieldOptimizer.unpause()
      ).to.be.revertedWith("Not paused");
    });
  });

  describe("8. Gateway v2.0 - KMS Generation", function () {
    it("8.1 Should allow owner to update KMS generation", async function () {
      await expect(cropYieldOptimizer.updateKmsGeneration(2))
        .to.emit(cropYieldOptimizer, "KmsGenerationUpdated")
        .withArgs(1, 2);

      expect(await cropYieldOptimizer.kmsGeneration()).to.equal(2);
    });

    it("8.2 Should reject non-owner updating KMS generation", async function () {
      await expect(
        cropYieldOptimizer.connect(farm1).updateKmsGeneration(2)
      ).to.be.revertedWith("Not authorized");
    });
  });

  describe("9. Gateway v2.0 - Decryption Requests", function () {
    beforeEach(async function () {
      await cropYieldOptimizer.connect(farm1).registerFarm();
    });

    it("9.1 Should allow registered farm to request decryption", async function () {
      const encryptedValue = ethers.id("test_encrypted_value");

      await expect(cropYieldOptimizer.connect(farm1).requestDecryption(encryptedValue))
        .to.emit(cropYieldOptimizer, "DecryptionRequested");
    });

    it("9.2 Should increment decryption request counter", async function () {
      const encryptedValue1 = ethers.id("value1");
      const encryptedValue2 = ethers.id("value2");

      await cropYieldOptimizer.connect(farm1).requestDecryption(encryptedValue1);
      await cropYieldOptimizer.connect(farm1).requestDecryption(encryptedValue2);

      expect(await cropYieldOptimizer.decryptionRequestCounter()).to.equal(2);
    });

    it("9.3 Should reject unregistered farm requesting decryption", async function () {
      const encryptedValue = ethers.id("test");
      await expect(
        cropYieldOptimizer.connect(farm2).requestDecryption(encryptedValue)
      ).to.be.revertedWith("Farm not registered");
    });

    it("9.4 Should emit DecryptionResponse event", async function () {
      const encryptedValue = ethers.id("test");
      await cropYieldOptimizer.connect(farm1).requestDecryption(encryptedValue);

      const encryptedShare = "0x1234";
      const signature = "0x5678";

      await expect(
        cropYieldOptimizer.submitDecryptionResponse(1, encryptedShare, signature)
      ).to.emit(cropYieldOptimizer, "DecryptionResponse")
        .withArgs(1, owner.address, encryptedShare, signature, await ethers.provider.getBlockNumber() + 1);
    });

    it("9.5 Should reject invalid decryption request ID", async function () {
      await expect(
        cropYieldOptimizer.submitDecryptionResponse(999, "0x1234", "0x5678")
      ).to.be.revertedWith("Invalid request");
    });

    it("9.6 Should store correct KMS generation in request", async function () {
      const encryptedValue = ethers.id("test");
      await cropYieldOptimizer.connect(farm1).requestDecryption(encryptedValue);

      const request = await cropYieldOptimizer.decryptionRequests(1);
      expect(request.kmsGeneration).to.equal(KMS_GENERATION);
    });
  });

  // ==================== PERMISSION CONTROL TESTS ====================
  describe("10. Access Control & Permissions", function () {
    it("10.1 Should check isPublicDecryptAllowed returns true when not paused", async function () {
      expect(await cropYieldOptimizer.isPublicDecryptAllowed()).to.be.true;
    });

    it("10.2 Should check isPublicDecryptAllowed returns false when paused", async function () {
      await cropYieldOptimizer.connect(pauser1).pause();
      expect(await cropYieldOptimizer.isPublicDecryptAllowed()).to.be.false;
    });

    it("10.3 Should verify isAnalysisValid returns correct status", async function () {
      await cropYieldOptimizer.connect(farm1).registerFarm();
      await cropYieldOptimizer.connect(farm2).registerFarm();
      await cropYieldOptimizer.connect(farm3).registerFarm();

      await cropYieldOptimizer.connect(farm1).submitFarmData(80, 1500, 200, 5000, 3);
      await cropYieldOptimizer.connect(farm2).submitFarmData(75, 1400, 180, 4800, 3);
      await cropYieldOptimizer.connect(farm3).submitFarmData(85, 1600, 220, 5200, 3);

      await cropYieldOptimizer.startCollaborativeAnalysis();

      expect(await cropYieldOptimizer.isAnalysisValid(1)).to.be.true;
      expect(await cropYieldOptimizer.isAnalysisValid(999)).to.be.false;
    });

    it("10.4 Should verify isPauser function", async function () {
      expect(await cropYieldOptimizer.isPauser(pauser1.address)).to.be.true;
      expect(await cropYieldOptimizer.isPauser(farm1.address)).to.be.false;
    });

    it("10.5 Should verify isContractPaused function", async function () {
      expect(await cropYieldOptimizer.isContractPaused()).to.be.false;
      await cropYieldOptimizer.connect(pauser1).pause();
      expect(await cropYieldOptimizer.isContractPaused()).to.be.true;
    });
  });

  // ==================== ADMIN FUNCTIONS TESTS ====================
  describe("11. Admin Functions", function () {
    it("11.1 Should allow owner to reset analysis", async function () {
      await cropYieldOptimizer.connect(farm1).registerFarm();
      await cropYieldOptimizer.connect(farm2).registerFarm();
      await cropYieldOptimizer.connect(farm3).registerFarm();

      await cropYieldOptimizer.connect(farm1).submitFarmData(80, 1500, 200, 5000, 3);
      await cropYieldOptimizer.connect(farm2).submitFarmData(75, 1400, 180, 4800, 3);
      await cropYieldOptimizer.connect(farm3).submitFarmData(85, 1600, 220, 5200, 3);

      await cropYieldOptimizer.startCollaborativeAnalysis();
      await cropYieldOptimizer.resetAnalysis(1);

      const [isActive] = await cropYieldOptimizer.getAnalysisInfo(1);
      expect(isActive).to.be.false;
    });

    it("11.2 Should reject non-owner resetting analysis", async function () {
      await expect(
        cropYieldOptimizer.connect(farm1).resetAnalysis(1)
      ).to.be.revertedWith("Not authorized");
    });

    it("11.3 Should allow pauser to emergency pause", async function () {
      await cropYieldOptimizer.connect(farm1).registerFarm();
      await cropYieldOptimizer.connect(farm2).registerFarm();
      await cropYieldOptimizer.connect(farm3).registerFarm();

      await cropYieldOptimizer.connect(farm1).submitFarmData(80, 1500, 200, 5000, 3);
      await cropYieldOptimizer.connect(farm2).submitFarmData(75, 1400, 180, 4800, 3);
      await cropYieldOptimizer.connect(farm3).submitFarmData(85, 1600, 220, 5200, 3);

      await cropYieldOptimizer.startCollaborativeAnalysis();

      await cropYieldOptimizer.connect(pauser1).emergencyPause();

      expect(await cropYieldOptimizer.isPaused()).to.be.true;
      const [isActive] = await cropYieldOptimizer.getAnalysisInfo(1);
      expect(isActive).to.be.false;
    });

    it("11.4 Should reject non-pauser emergency pause", async function () {
      await expect(
        cropYieldOptimizer.connect(farm1).emergencyPause()
      ).to.be.revertedWith("Not a pauser");
    });

    it("11.5 Should deactivate all analyses on emergency pause", async function () {
      await cropYieldOptimizer.connect(farm1).registerFarm();
      await cropYieldOptimizer.connect(farm2).registerFarm();
      await cropYieldOptimizer.connect(farm3).registerFarm();

      await cropYieldOptimizer.connect(farm1).submitFarmData(80, 1500, 200, 5000, 3);
      await cropYieldOptimizer.connect(farm2).submitFarmData(75, 1400, 180, 4800, 3);
      await cropYieldOptimizer.connect(farm3).submitFarmData(85, 1600, 220, 5200, 3);

      await cropYieldOptimizer.startCollaborativeAnalysis();
      await cropYieldOptimizer.startCollaborativeAnalysis();

      await cropYieldOptimizer.connect(pauser1).emergencyPause();

      const [isActive1] = await cropYieldOptimizer.getAnalysisInfo(1);
      const [isActive2] = await cropYieldOptimizer.getAnalysisInfo(2);

      expect(isActive1).to.be.false;
      expect(isActive2).to.be.false;
    });
  });

  // ==================== VIEW FUNCTIONS TESTS ====================
  describe("12. View Functions & Platform Stats", function () {
    beforeEach(async function () {
      await cropYieldOptimizer.connect(farm1).registerFarm();
      await cropYieldOptimizer.connect(farm2).registerFarm();
      await cropYieldOptimizer.connect(farm3).registerFarm();

      await cropYieldOptimizer.connect(farm1).submitFarmData(80, 1500, 200, 5000, 3);
      await cropYieldOptimizer.connect(farm2).submitFarmData(75, 1400, 180, 4800, 3);
    });

    it("12.1 Should return correct participating farms count", async function () {
      expect(await cropYieldOptimizer.getParticipatingFarmsCount()).to.equal(2);
    });

    it("12.2 Should return correct platform stats", async function () {
      const [totalRegisteredFarms, totalAnalyses, farmsWithData] =
        await cropYieldOptimizer.getPlatformStats();

      expect(totalRegisteredFarms).to.equal(3);
      expect(totalAnalyses).to.equal(0); // No analysis started yet
      expect(farmsWithData).to.equal(2);
    });

    it("12.3 Should return correct farm registration status", async function () {
      expect(await cropYieldOptimizer.isFarmRegistered(farm1.address)).to.be.true;
      expect(await cropYieldOptimizer.isFarmRegistered(farm4.address)).to.be.false;
    });

    it("12.4 Should return correct farm data status", async function () {
      const [submitted1] = await cropYieldOptimizer.getFarmDataStatus(farm1.address);
      const [submitted3] = await cropYieldOptimizer.getFarmDataStatus(farm3.address);

      expect(submitted1).to.be.true;
      expect(submitted3).to.be.false;
    });

    it("12.5 Should return correct pauser at index", async function () {
      expect(await cropYieldOptimizer.getPauserAtIndex(0)).to.equal(pauser1.address);
      expect(await cropYieldOptimizer.getPauserAtIndex(1)).to.equal(pauser2.address);
      expect(await cropYieldOptimizer.getPauserAtIndex(2)).to.equal(pauser3.address);
    });

    it("12.6 Should reject out of bounds pauser index", async function () {
      await expect(
        cropYieldOptimizer.getPauserAtIndex(10)
      ).to.be.revertedWith("Index out of bounds");
    });
  });
});
