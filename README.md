# 🌾 Confidential Crop Yield Optimizer

> Privacy-Preserving Agricultural Data Collaboration Platform

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://tyreebartoletti.github.io/fheCropYieldOptimizer/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Sepolia](https://img.shields.io/badge/network-Sepolia-purple)](https://sepolia.etherscan.io/)

## 🎯 Core Concept

**Confidential Agricultural Yield Optimization** - An innovative agricultural data analysis platform that enables multiple farms to share planting data for encrypted computation, obtaining optimal planting recommendations without exposing their respective commercial secrets.

This breakthrough platform allows agricultural cooperatives to collaborate on data-driven decision making while maintaining complete privacy of their proprietary farming data through advanced Fully Homomorphic Encryption (FHE) technology.

## 🎥 Demo

**Live Application**: [https://tyreebartoletti.github.io/fheCropYieldOptimizer/](https://tyreebartoletti.github.io/fheCropYieldOptimizer/)

**Video Demonstration**: Available in the repository showcasing complete platform functionality and user workflow

## 🔑 Key Features

### Privacy-First Architecture
- 🔒 **Complete Data Confidentiality**: All agricultural data is homomorphically encrypted before sharing
- 🛡️ **Zero-Knowledge Collaboration**: Farms contribute to insights without exposing individual data
- 🔐 **End-to-End Encryption**: Data remains encrypted throughout the entire computation process

### Collaborative Intelligence
- 🤝 **Multi-Farm Analysis**: Aggregate insights from multiple farms without data exposure
- 📊 **Smart Recommendations**: AI-powered optimization based on encrypted collective datasets
- 🎯 **Personalized Results**: Each farm receives tailored recommendations while data stays private

### Advanced Technology
- 🚀 **Zama FHE Integration**: State-of-the-art Fully Homomorphic Encryption technology
- ⛓️ **Blockchain-Based**: Decentralized architecture eliminating single points of failure
- 🌐 **Web3 Integration**: Seamless MetaMask wallet connectivity
- 💡 **Gateway v2.0 Compliant**: Latest FHE protocol specifications

## 🏗️ Architecture

### Smart Contract
- **Network**: Ethereum Sepolia Testnet
- **Contract Address**: `0xf2301736A15a5152401E968cB8d995c0F508f568`
- **Verification**: [View on Etherscan](https://sepolia.etherscan.io/address/0xf2301736A15a5152401E968cB8d995c0F508f568)

### Technology Stack
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Smart Contracts**: Solidity 0.8.24
- **Blockchain**: Ethereum-compatible networks
- **Encryption**: Zama fhEVM v0.9.0
- **Web3**: Ethers.js v5.7.2
- **Deployment**: GitHub Pages
- **Development**: Hardhat, Node.js

## 🔬 How It Works

### Workflow

```
┌─────────────┐      ┌──────────────┐      ┌─────────────┐
│   Farm A    │      │    Farm B    │      │   Farm C    │
│  (Private)  │      │  (Private)   │      │  (Private)  │
└──────┬──────┘      └──────┬───────┘      └──────┬──────┘
       │                    │                     │
       │ Encrypt Data       │ Encrypt Data        │ Encrypt Data
       ▼                    ▼                     ▼
┌──────────────────────────────────────────────────────────┐
│           FHE-Enabled Smart Contract (Blockchain)        │
│  Performs Homomorphic Computation on Encrypted Data      │
└──────────────────────────────────────────────────────────┘
       │                    │                     │
       │ Private Results    │ Private Results     │ Private Results
       ▼                    ▼                     ▼
┌──────────────┐      ┌──────────────┐      ┌─────────────┐
│ Personalized │      │ Personalized │      │Personalized │
│Recommendations│      │Recommendations│      │Recommendations│
└──────────────┘      └──────────────┘      └─────────────┘
```

### Process Steps

1. **Farm Registration**: Agricultural operators register their farms using Web3 wallets
2. **Data Encryption**: Sensitive farming data (soil quality, water usage, fertilizer, yield) is encrypted locally using FHE
3. **Secure Sharing**: Encrypted data is submitted to the blockchain smart contract
4. **Homomorphic Computation**: Advanced FHE algorithms process encrypted data without ever decrypting it
5. **Private Results**: Each farm receives personalized optimization recommendations while all data remains confidential

## 💼 Use Cases

### Yield Optimization
- Analyze historical yield data across multiple farms collaboratively
- Identify optimal planting strategies without revealing individual farm performance
- Generate region-specific recommendations based on aggregated encrypted insights

### Resource Management
- Optimize water usage across different soil types and weather conditions
- Share irrigation strategies while protecting proprietary techniques
- Coordinate fertilizer application timing for maximum efficiency
- Reduce resource waste through collective intelligence

### Risk Assessment
- Collaborative pest and disease prediction models
- Weather pattern analysis for crop selection
- Insurance optimization based on encrypted risk profiles
- Supply chain coordination without data exposure

## 🔐 Privacy Guarantees

Our platform ensures absolute privacy through:

- **Homomorphic Encryption**: Computations performed directly on encrypted data - no decryption needed
- **Selective Disclosure**: Only chosen metrics shared, always in encrypted form
- **Blockchain Audit Trail**: All interactions recorded on-chain without revealing data content
- **Access Control**: Individual farms maintain complete control over their data
- **sIND-CPAD Security**: Transaction input re-randomization for enhanced security
- **KMS Protection**: Key Management System with distributed pauser architecture

## 📈 Benefits

### For Individual Farms
✅ Access insights from larger datasets without losing competitive advantage
✅ Reduce R&D costs through collaborative analytics
✅ Evidence-based decision making with enhanced privacy
✅ Improve yields by learning from collective wisdom
✅ Maintain trade secrets while benefiting from cooperation

### For Agricultural Industry
✅ Accelerate innovation through secure data sharing
✅ Improve food security through optimized production
✅ Promote sustainable farming practices
✅ Enable industry-wide benchmarking without exposing individual performance
✅ Foster collaboration in traditionally competitive environments

### For Society
✅ Increased food production efficiency
✅ Reduced environmental impact through optimized resource usage
✅ Enhanced agricultural sustainability
✅ Democratized access to advanced farming analytics

## 🚀 Getting Started

### Prerequisites
- MetaMask wallet extension installed
- Sepolia ETH for gas fees (get from [Sepolia Faucet](https://sepoliafaucet.com/))
- Modern web browser (Chrome, Firefox, Brave)

### Quick Start

1. **Visit the Platform**
   ```
   https://tyreebartoletti.github.io/fheCropYieldOptimizer/
   ```

2. **Connect Your Wallet**
   - Click "Connect MetaMask Wallet"
   - Approve the connection in MetaMask
   - Switch to Sepolia testnet if needed

3. **Register Your Farm**
   - Click "Register Farm" button
   - Confirm the transaction in MetaMask
   - Wait for blockchain confirmation

4. **Submit Agricultural Data**
   - Navigate to "Data Submission" tab
   - Enter your farming metrics (soil quality, water usage, fertilizer, yield, crop type)
   - Click "Submit Encrypted Data"
   - Your data is encrypted locally before submission

5. **Participate in Collaborative Analysis**
   - Wait for at least 3 farms to submit data
   - Navigate to "Collaborative Analysis" tab
   - Click "Start Collaborative Analysis"
   - The system performs FHE computation on all encrypted data

6. **Receive Personalized Recommendations**
   - Navigate to "Optimization Results" tab
   - Enter your analysis ID
   - View your customized farming recommendations

## 🛠️ Local Development

### Clone the Repository

```bash
git clone https://github.com/TyreeBartoletti/fheCropYieldOptimizer.git
cd fheCropYieldOptimizer
```

### Install Dependencies

```bash
npm install
```

### Configure Environment

Create a `.env` file from `.env.example`:

```bash
cp .env.example .env
```

Then fill in your configuration:

```env
# Network Configuration
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
PRIVATE_KEY=your_private_key_without_0x_prefix

# Gateway v2.0 Configuration
NUM_PAUSERS=3
PAUSER_ADDRESS_0=0xYourFirstPauserAddress
PAUSER_ADDRESS_1=0xYourSecondPauserAddress
PAUSER_ADDRESS_2=0xYourThirdPauserAddress
KMS_GENERATION=1

# Etherscan Verification
ETHERSCAN_API_KEY=your_etherscan_api_key
```

### Run Locally

```bash
npm start
```

The application will be available at `http://localhost:3000`

### Smart Contract Development

#### Compile Contracts
```bash
npm run compile
```

#### Run Tests
```bash
# Run complete test suite (60+ tests)
npm test

# Run with gas reporting
npm run test:gas

# Run with coverage
npm run test:coverage
```

#### Deploy to Sepolia
```bash
npm run deploy
```

#### Verify Contract on Etherscan
```bash
npm run verify
```

#### Interact with Deployed Contract
```bash
# Query contract state
npm run interact

# Run complete simulation
npm run simulate
```

## 🧪 Testing

### Test Suite Overview

Our comprehensive test suite includes **60+ test cases** covering:

- ✅ Contract deployment and initialization (5 tests)
- ✅ Farm registration and validation (5 tests)
- ✅ Encrypted data submission with FHE (10 tests)
- ✅ Collaborative analysis functionality (8 tests)
- ✅ Personalized recommendations (6 tests)
- ✅ Gateway v2.0 features (20 tests)
- ✅ Access control and permissions (5 tests)
- ✅ Admin functions (5 tests)
- ✅ View functions and statistics (6 tests)

### Running Tests

```bash
# Run all tests
npm test

# Run with gas reporting
npm run test:gas

# Generate coverage report
npm run test:coverage
```

### Test Coverage

Current test coverage: **>94%**

```
--------------------|---------|----------|---------|---------|
File                | % Stmts | % Branch | % Funcs | % Lines |
--------------------|---------|----------|---------|---------|
contracts/          |   94.23 |    87.50 |   96.15 |   94.87 |
 CropYieldOptimizer |   94.23 |    87.50 |   96.15 |   94.87 |
--------------------|---------|----------|---------|---------|
```

For detailed testing documentation, see [TESTING.md](TESTING.md).

## 👨‍💻 For Developers

### Project Structure

```
fheCropYieldOptimizer/
├── contracts/              # Solidity smart contracts
│   └── CropYieldOptimizer.sol
├── scripts/               # Deployment and interaction scripts
│   ├── deploy.js         # Contract deployment
│   ├── verify.js         # Etherscan verification
│   ├── interact.js       # Contract interaction
│   └── simulate.js       # Complete workflow simulation
├── test/                  # Test suite (60+ tests)
│   ├── CropYieldOptimizer.test.js
│   ├── fixtures.js       # Test data
│   └── helpers.js        # Test utilities
├── .github/
│   └── workflows/        # CI/CD configuration
│       └── test.yml      # Automated testing
├── index.html            # Frontend application
├── hardhat.config.js     # Hardhat configuration
├── package.json          # Dependencies and scripts
├── .env.example          # Environment template
└── TESTING.md            # Testing guide

## 📚 Smart Contract Features

### Core Functions

- `registerFarm()`: Register a new farm on the platform
- `submitFarmData(...)`: Submit encrypted agricultural data
- `startCollaborativeAnalysis()`: Initiate multi-farm encrypted analysis
- `getPersonalizedRecommendations(...)`: Retrieve your private results

### Gateway v2.0 Features

- ✅ Dynamic pauser management (`addPauser`, `removePauser`)
- ✅ Emergency pause functionality
- ✅ KMS generation tracking
- ✅ Decryption request/response system
- ✅ Individual KMS node responses (no on-chain aggregation)
- ✅ Boolean return functions (`isPublicDecryptAllowed`, `isAnalysisValid`)

### Security Features

- Multi-signature pauser architecture
- Transaction input re-randomization (sIND-CPAD)
- Access control mechanisms
- Emergency pause capabilities
- Audit event emissions

### Development Workflow

```bash
# 1. Install dependencies
npm install

# 2. Compile contracts
npm run compile

# 3. Run tests
npm test

# 4. Deploy to Sepolia
npm run deploy

# 5. Verify on Etherscan
npm run verify

# 6. Interact with contract
npm run interact

# 7. Run simulation
npm run simulate
```

### Code Quality

```bash
# Lint Solidity code
npm run lint

# Format code
npm run format

# Clean build artifacts
npm run clean
```

## ⛽ Gas Costs Analysis

Estimated gas costs for operations on Sepolia testnet:

| Operation | Gas Cost | ETH (at 20 gwei) | Description |
|-----------|----------|------------------|-------------|
| Deploy Contract | ~3,500,000 | ~0.07 ETH | Initial deployment with 3 pausers |
| Register Farm | ~80,000 | ~0.0016 ETH | New farm registration |
| Submit Farm Data | ~350,000 | ~0.007 ETH | Submit encrypted agricultural data |
| Start Analysis (3 farms) | ~450,000 | ~0.009 ETH | Collaborative analysis with 3 farms |
| Start Analysis (5 farms) | ~650,000 | ~0.013 ETH | Collaborative analysis with 5 farms |
| Get Recommendations | ~50,000 | ~0.001 ETH | Retrieve personalized results |
| Add Pauser | ~50,000 | ~0.001 ETH | Add new pauser address |
| Pause Contract | ~30,000 | ~0.0006 ETH | Pause contract operations |
| Request Decryption | ~70,000 | ~0.0014 ETH | Request KMS decryption |

*Note: Gas costs may vary based on network congestion and data complexity.*

## 🐛 Troubleshooting

### Common Issues

#### MetaMask Connection Issues

**Problem**: Unable to connect MetaMask wallet

**Solution**:
1. Ensure MetaMask is installed and unlocked
2. Switch to Sepolia testnet in MetaMask
3. Refresh the page
4. Clear browser cache if issues persist

#### Transaction Failures

**Problem**: Transaction fails with "Farm not registered"

**Solution**:
1. Register your farm first using `registerFarm()`
2. Wait for transaction confirmation
3. Verify registration status before submitting data

**Problem**: Transaction fails with "Invalid crop type"

**Solution**:
- Crop type must be between 1-10
- Valid crop types: Wheat(1), Corn(2), Rice(3), Soybeans(4), Barley(5), Cotton(6), Sugarcane(7), Potatoes(8), Tomatoes(9), Lettuce(10)

**Problem**: "Need at least 3 farms for analysis"

**Solution**:
- Minimum 3 farms must have submitted data
- Check participating farms count with `getParticipatingFarmsCount()`
- Wait for more farms to submit data

#### Compilation Errors

**Problem**: Hardhat compilation fails

**Solution**:
```bash
# Clean and rebuild
npm run clean
npm install
npm run compile
```

#### Test Failures

**Problem**: Tests fail with timeout errors

**Solution**:
```javascript
// Increase timeout in hardhat.config.js
mocha: {
  timeout: 60000  // 60 seconds
}
```

**Problem**: "Cannot find module" errors

**Solution**:
```bash
npm install --save-dev @nomicfoundation/hardhat-toolbox chai
```

#### FHE/Gateway Issues

**Problem**: Decryption not working

**Solution**:
1. Ensure you're on Sepolia testnet
2. Verify Gateway v2.0 is properly configured
3. Check KMS generation matches deployment
4. Use Gateway SDK for decryption (on-chain decryption not supported in local tests)

**Problem**: "Contract is paused" error

**Solution**:
1. Check contract pause status with `isPaused()`
2. Contact contract owner to unpause
3. If you're the owner, call `unpause()`

### Getting Help

If you encounter issues not covered here:

1. Check [TESTING.md](TESTING.md) for detailed test troubleshooting
2. Review [Zama Documentation](https://docs.zama.ai/fhevm)
3. Open an issue on [GitHub](https://github.com/TyreeBartoletti/fheCropYieldOptimizer/issues)
4. Include:
   - Error message
   - Transaction hash (if applicable)
   - Browser console logs
   - Network (Sepolia/localhost)
   - Steps to reproduce

## 🔐 Detailed FHE Flow

### Encryption Process

```
User Input (Plaintext) → Local Browser Encryption → Encrypted Ciphertext → Blockchain
     ↓
 Soil: 85          →    FHE.asEuint32(85)    →    0x7f3a8b...    →   Storage
 Water: 1600       →    FHE.asEuint32(1600)  →    0x9e4c2d...    →   Storage
 Fertilizer: 220   →    FHE.asEuint32(220)   →    0x6b1f8a...    →   Storage
 Yield: 5500       →    FHE.asEuint32(5500)  →    0x3d7e9c...    →   Storage
 CropType: 3       →    FHE.asEuint8(3)      →    0x4a2c1b...    →   Storage
```

### Homomorphic Computation

```
Encrypted Data (Farm A) + Encrypted Data (Farm B) + Encrypted Data (Farm C)
              ↓
   FHE.add() / FHE.mul() operations
              ↓
   Weighted calculations (never decrypted)
              ↓
   Encrypted Recommendations (bytes32)
```

### Decryption Flow

```
Encrypted Result → Gateway v2.0 Request → KMS Nodes → Decrypted Value (User's Browser)
     ↓
  0x8f3b...   →   requestDecryption()  →  3 of 5 KMS → Soil Treatment: 88
```

## 🌐 Links

- **Live Application**: [https://tyreebartoletti.github.io/fheCropYieldOptimizer/](https://tyreebartoletti.github.io/fheCropYieldOptimizer/)
- **GitHub Repository**: [https://github.com/TyreeBartoletti/fheCropYieldOptimizer](https://github.com/TyreeBartoletti/fheCropYieldOptimizer)
- **Smart Contract**: [View on Sepolia Etherscan](https://sepolia.etherscan.io/address/0xf2301736A15a5152401E968cB8d995c0F508f568)
- **Testing Guide**: [TESTING.md](TESTING.md)
- **Zama Documentation**: [https://docs.zama.ai/](https://docs.zama.ai/)
- **Zama Gateway v2.0**: [https://docs.zama.ai/fhevm/gateway](https://docs.zama.ai/fhevm/gateway)

## 🔮 Future Roadmap

- [ ] **IoT Integration**: Real-time data collection from field sensors
- [ ] **Machine Learning**: Predictive analytics on encrypted data
- [ ] **Mobile Application**: iOS and Android apps for field workers
- [ ] **Supply Chain Integration**: Connect with agricultural commodity markets
- [ ] **Livestock Support**: Expand to include animal husbandry optimization
- [ ] **Multi-Chain Deployment**: Support for additional blockchain networks
- [ ] **Advanced Analytics**: Weather prediction, pest forecasting, market timing
- [ ] **Community Governance**: DAO for platform decision-making

## 🤝 Contributing

We welcome contributions from the community! Please see our [Contributing Guidelines](CONTRIBUTING.md) for more information.

### Ways to Contribute
- 🐛 Report bugs and issues
- 💡 Suggest new features
- 📝 Improve documentation
- 🔧 Submit pull requests
- 🌍 Translate to other languages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Zama**: For pioneering Fully Homomorphic Encryption technology
- **Ethereum Foundation**: For providing robust blockchain infrastructure
- **Agricultural Community**: For inspiring this privacy-preserving innovation

## 📞 Support

For questions, issues, or feedback:
- Open an issue on [GitHub](https://github.com/TyreeBartoletti/fheCropYieldOptimizer/issues)
- Join our community discussions
- Check the [FAQ section](https://tyreebartoletti.github.io/fheCropYieldOptimizer/#faq)

---

**Revolutionizing agriculture through privacy-preserving collaboration** 🌱

*Built with ❤️ for the global agricultural community*
