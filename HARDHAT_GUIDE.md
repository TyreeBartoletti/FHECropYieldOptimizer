# Hardhat Development Framework Guide

Complete guide for developing, testing, and deploying using Hardhat.

## Hardhat Setup

### Configuration: hardhat.config.js

- Solidity Version: 0.8.24
- Optimizer: Enabled (200 runs)
- Networks: Hardhat, Localhost, Sepolia
- Etherscan Integration: Enabled
- Gas Reporter: Configurable

## Development Workflow

### 1. Compile Contracts
```bash
npm run compile
```

### 2. Run Tests
```bash
npm test
npm run test:gas
npm run test:coverage
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
npm run simulate
```

## Available Scripts

| Script | Description |
|--------|-------------|
| compile | Compile smart contracts |
| test | Run test suite |
| test:gas | Run tests with gas reporting |
| test:coverage | Generate coverage report |
| deploy | Deploy to Sepolia |
| deploy:local | Deploy to local network |
| verify | Verify on Etherscan |
| interact | Interact with contract |
| simulate | Run workflow simulation |
| lint | Lint Solidity code |
| format | Format code |
| clean | Clean build artifacts |
| node | Start local Hardhat node |

## Project Structure

```
FHECropYieldOptimizer/
├── contracts/          # Solidity contracts
├── scripts/           # Hardhat scripts
│   ├── deploy.js     # Deployment
│   ├── verify.js     # Verification
│   ├── interact.js   # Interaction
│   └── simulate.js   # Simulation
├── test/             # Test suite
├── hardhat.config.js # Configuration
└── package.json      # npm scripts
```

## Testing

60+ tests covering:
- Deployment & initialization
- Farm registration
- Data submission (FHE)
- Collaborative analysis
- Recommendations
- Gateway v2.0 features
- Access control

## Deployment Information

After deployment, check:
- Contract address in deployment-info.json
- Etherscan verification link
- Network: Sepolia (Chain ID: 11155111)

## Resources

- Hardhat Docs: https://hardhat.org/docs
- Ethers.js Docs: https://docs.ethers.org/
- Project README: README.md
- Deployment Guide: DEPLOYMENT.md

---

**Version**: 2.0.0
**Framework**: Hardhat v2.22.16
