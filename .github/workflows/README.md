# GitHub Actions CI/CD Workflows

This directory contains automated CI/CD pipelines for the Confidential Crop Yield Optimizer project.

## Workflows Overview

### 1. CI/CD Pipeline (`test.yml`)

**Triggers:**
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop` branches

**Jobs:**

#### Test on Node.js 18.x
- Runs complete test suite on Node.js 18.x
- Executes linting and formatting checks
- Generates code coverage
- Uploads coverage to Codecov

#### Test on Node.js 20.x
- Runs complete test suite on Node.js 20.x
- Executes linting and formatting checks
- Generates code coverage
- Uploads coverage to Codecov

#### Code Quality Checks
- Solhint (Solidity linter)
- Prettier formatting validation
- Security analysis (if configured)

#### Gas Usage Report
- Generates gas consumption reports
- Uploads reports as artifacts

## Configuration Files

### `.solhint.json`
Solidity linting rules following industry best practices:
- Code complexity limits
- Compiler version enforcement
- Naming conventions
- Security patterns

### `.solhintignore`
Files and directories excluded from linting:
- `node_modules/`
- `artifacts/`
- `cache/`
- Third-party contracts

### `.prettierrc.json`
Code formatting rules for:
- Solidity files (`.sol`)
- JavaScript files (`.js`)
- TypeScript files (`.ts`)
- JSON files (`.json`)

### `.prettierignore`
Files excluded from formatting:
- Dependencies
- Build outputs
- Generated files

### `.codecov.yml`
Code coverage configuration:
- Coverage thresholds
- Ignore patterns
- Multi-environment support (Node 18.x, 20.x)

## Local Testing

### Run CI checks locally:

```bash
# Full CI pipeline
npm run ci

# CI with coverage
npm run ci:coverage

# Individual checks
npm run lint
npm run prettier:check
npm run test
npm run test:coverage
```

## Required Secrets

To enable Codecov integration, add the following secret to your GitHub repository:

- `CODECOV_TOKEN`: Your Codecov upload token

**Setup:**
1. Go to repository Settings > Secrets and variables > Actions
2. Click "New repository secret"
3. Name: `CODECOV_TOKEN`
4. Value: Your token from https://codecov.io

## Workflow Status

Add badges to your README.md:

```markdown
![CI/CD Pipeline](https://github.com/your-username/confidential-crop-yield-optimizer/workflows/CI%2FCD%20Pipeline/badge.svg)
[![codecov](https://codecov.io/gh/your-username/confidential-crop-yield-optimizer/branch/main/graph/badge.svg)](https://codecov.io/gh/your-username/confidential-crop-yield-optimizer)
```

## Troubleshooting

### Linting Failures
```bash
# Fix auto-fixable issues
npm run lint:fix

# Check specific files
npx solhint contracts/CropYieldOptimizer.sol
```

### Formatting Failures
```bash
# Auto-format all files
npm run prettier

# Check formatting without fixing
npm run prettier:check
```

### Test Failures
```bash
# Run tests locally
npm test

# Run with verbose output
npm test -- --verbose

# Run specific test
npx hardhat test --grep "Contract Deployment"
```

### Coverage Issues
```bash
# Generate coverage locally
npm run test:coverage

# View HTML report
open coverage/index.html  # macOS
xdg-open coverage/index.html  # Linux
start coverage/index.html  # Windows
```

## Best Practices

1. **Before Pushing:**
   - Run `npm run ci` to catch issues locally
   - Ensure all tests pass
   - Check formatting with `npm run prettier:check`

2. **Pull Requests:**
   - Wait for all CI checks to pass
   - Review coverage reports
   - Address any linting warnings

3. **Code Quality:**
   - Maintain >90% test coverage
   - Follow Solidity style guide
   - Keep gas costs optimized

## Artifacts

Workflow artifacts are automatically generated:

- **Gas Reports**: Available for 90 days after workflow run
- **Coverage Reports**: Uploaded to Codecov

Access artifacts:
1. Go to Actions tab
2. Click on workflow run
3. Scroll to "Artifacts" section

---

**Last Updated:** 2025-11-02
**Workflow Version:** 1.0
