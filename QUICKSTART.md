# 🚀 Quick Start Guide

Get started with the Confidential Crop Yield Optimizer in 5 minutes.

## Prerequisites

- Node.js v18+ installed
- MetaMask wallet
- Sepolia testnet ETH (get from [Sepolia Faucet](https://sepoliafaucet.com/))

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd FHECropYieldOptimizer

# Install dependencies
npm install

# Copy environment template
cp env.example .env
```

## Configuration

Edit `.env` with your values:

```env
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_API_KEY
PRIVATE_KEY=your_private_key_without_0x
ETHERSCAN_API_KEY=your_etherscan_api_key

NUM_PAUSERS=3
PAUSER_ADDRESS_0=0xAddress1
PAUSER_ADDRESS_1=0xAddress2
PAUSER_ADDRESS_2=0xAddress3
KMS_GENERATION=1
```

## Development Workflow

### 1. Compile Contracts

```bash
npm run compile
```

### 2. Run Tests

```bash
npm test
```

### 3. Deploy to Sepolia

```bash
npm run deploy
```

### 4. Verify on Etherscan

```bash
npm run verify
```

### 5. Interact with Contract

```bash
npm run interact
```

### 6. Run Simulation

```bash
npm run simulate
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run compile` | Compile smart contracts |
| `npm test` | Run test suite |
| `npm run test:gas` | Run tests with gas reporting |
| `npm run test:coverage` | Generate coverage report |
| `npm run deploy` | Deploy to Sepolia |
| `npm run deploy:local` | Deploy to local network |
| `npm run verify` | Verify contract on Etherscan |
| `npm run interact` | Interact with deployed contract |
| `npm run simulate` | Run complete workflow simulation |
| `npm run lint` | Lint Solidity code |
| `npm run format` | Format code |
| `npm run clean` | Clean build artifacts |
| `npm run node` | Start local Hardhat node |
| `npm start` | Start frontend dev server |

## Project Structure

```
FHECropYieldOptimizer/
├── contracts/          # Solidity smart contracts
├── scripts/           # Hardhat scripts
│   ├── deploy.js     # Deployment script
│   ├── verify.js     # Verification script
│   ├── interact.js   # Interaction script
│   └── simulate.js   # Simulation script
├── test/             # Test files
├── hardhat.config.js # Hardhat configuration
└── package.json      # npm scripts
```

## Next Steps

- Read [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment guide
- Read [TESTING.md](TESTING.md) for testing documentation
- Read [README.md](README.md) for complete documentation

## Support

For issues or questions:
- Check [Troubleshooting](DEPLOYMENT.md#troubleshooting) section
- Review contract on [Etherscan](https://sepolia.etherscan.io/)
- Consult [Hardhat Documentation](https://hardhat.org/docs)

---

**Version**: 2.0.0  
**Framework**: Hardhat v2.22.16
