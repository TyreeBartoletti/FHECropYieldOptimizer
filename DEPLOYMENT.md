# 🚀 Deployment Guide

Complete deployment guide for the Confidential Crop Yield Optimizer smart contract and frontend application.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Environment Setup](#environment-setup)
- [Smart Contract Deployment](#smart-contract-deployment)
- [Contract Verification](#contract-verification)
- [Frontend Deployment](#frontend-deployment)
- [Post-Deployment](#post-deployment)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Software

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **Git**: Latest version

### Required Accounts & API Keys

1. **Ethereum Wallet**
   - MetaMask or similar Web3 wallet
   - Testnet ETH for Sepolia (get from Sepolia Faucet)

2. **Infura/Alchemy Account**
   - Sign up at Infura or Alchemy
   - Create a new project
   - Get your Sepolia RPC URL

3. **Etherscan Account**
   - Sign up at Etherscan
   - Navigate to API Keys section
   - Create a new API key

4. **GitHub Account** (for frontend deployment)
   - Required for GitHub Pages hosting

---

## 🔧 Environment Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy the example environment file:

```bash
cp env.example .env
```

Edit .env and fill in your values.

### 3. Security Check

⚠️ **IMPORTANT**: Ensure .env is in your .gitignore file!

```bash
echo ".env" >> .gitignore
git status
```

---

## 📦 Smart Contract Deployment

### Step 1: Compile Contracts

```bash
npm run compile
```

### Step 2: Run Tests

```bash
npm test
npm run test:gas
npm run test:coverage
```

### Step 3: Deploy to Sepolia Testnet

```bash
npm run deploy
```

### Step 4: Save Deployment Information

The deployment script automatically creates deployment-info.json with all contract details.

---

## ✅ Contract Verification

### Automatic Verification

```bash
npm run verify
```

### Manual Verification

```bash
npx hardhat verify --network sepolia CONTRACT_ADDRESS
```

---

## 🌐 Frontend Deployment

### GitHub Pages

1. Create GitHub Repository
2. Push code to GitHub
3. Enable GitHub Pages in repository settings
4. Access your site at: https://YOUR-USERNAME.github.io/YOUR-REPO/

---

## 🔄 Post-Deployment

### Test Contract Interaction

```bash
npm run interact
```

### Run Complete Simulation

```bash
npm run simulate
```

---

## 📊 Deployment Information

### Network Details

| Network | Chain ID | RPC URL |
|---------|----------|---------|
| Sepolia | 11155111 | Infura/Alchemy endpoint |

---

## 🔍 Troubleshooting

Check DEPLOYMENT.md for detailed troubleshooting steps.

---

**Last Updated**: 2025-01-15
**Version**: 2.0.0
**Deployment Framework**: Hardhat v2.22.16
