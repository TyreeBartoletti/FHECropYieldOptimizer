/**
 * Test Fixtures for CropYieldOptimizer
 * Provides reusable test data for consistent testing
 */

module.exports = {
  // Sample farm data configurations
  farmData: {
    valid: {
      soilQuality: 80,
      waterUsage: 1500,
      fertilizerUsage: 200,
      yieldAmount: 5000,
      cropType: 3
    },
    highQuality: {
      soilQuality: 95,
      waterUsage: 1800,
      fertilizerUsage: 250,
      yieldAmount: 6000,
      cropType: 5
    },
    lowQuality: {
      soilQuality: 60,
      waterUsage: 1200,
      fertilizerUsage: 150,
      yieldAmount: 4000,
      cropType: 2
    },
    invalidCropType: {
      soilQuality: 80,
      waterUsage: 1500,
      fertilizerUsage: 200,
      yieldAmount: 5000,
      cropType: 0 // Invalid
    },
    invalidSoilQuality: {
      soilQuality: 0, // Invalid
      waterUsage: 1500,
      fertilizerUsage: 200,
      yieldAmount: 5000,
      cropType: 3
    },
    invalidWaterUsage: {
      soilQuality: 80,
      waterUsage: 0, // Invalid
      fertilizerUsage: 200,
      yieldAmount: 5000,
      cropType: 3
    }
  },

  // Different crop types (1-10)
  cropTypes: {
    WHEAT: 1,
    CORN: 2,
    RICE: 3,
    SOYBEANS: 4,
    BARLEY: 5,
    COTTON: 6,
    SUGARCANE: 7,
    POTATOES: 8,
    TOMATOES: 9,
    LETTUCE: 10
  },

  // KMS configuration
  kmsConfig: {
    generation: 1,
    defaultPauserCount: 3
  },

  // Analysis thresholds
  analysisThresholds: {
    minimumFarms: 3,
    recommendedFarms: 5,
    optimalFarms: 10
  },

  // Error messages
  errorMessages: {
    notAuthorized: "Not authorized",
    notRegistered: "Farm not registered",
    alreadyRegistered: "Farm already registered",
    invalidCropType: "Invalid crop type",
    invalidInputData: "Invalid input data",
    contractPaused: "Contract is paused",
    alreadyPaused: "Already paused",
    notPaused: "Not paused",
    notAPauser: "Not a pauser",
    alreadyAPauser: "Already a pauser",
    invalidPauserAddress: "Invalid pauser address",
    needMinimumFarms: "Need at least 3 farms for analysis",
    analysisNotFound: "Analysis not found or inactive",
    mustSubmitData: "Must have submitted data",
    invalidRequest: "Invalid request",
    indexOutOfBounds: "Index out of bounds"
  },

  // Sample addresses (for testing purposes)
  testAddresses: {
    zero: "0x0000000000000000000000000000000000000000",
    invalid: "not_an_address",
  },

  // Helper function to create multiple farm data entries
  createMultipleFarmData(count) {
    const data = [];
    for (let i = 0; i < count; i++) {
      data.push({
        soilQuality: 70 + (i * 2),
        waterUsage: 1400 + (i * 50),
        fertilizerUsage: 180 + (i * 10),
        yieldAmount: 4800 + (i * 100),
        cropType: (i % 10) + 1
      });
    }
    return data;
  },

  // Expected weights for analysis calculations
  analysisWeights: {
    soil: 110,
    water: 95,
    fertilizer: 105,
    yieldIncrease: 115
  }
};
