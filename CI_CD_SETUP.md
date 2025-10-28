# CI/CD Setup Guide

## Overview

This project includes a comprehensive CI/CD pipeline using GitHub Actions for automated testing, code quality checks, and coverage reporting.

## Features

### ✅ Automated Testing
- Tests run on every push to `main` or `develop` branches
- Tests run on all pull requests
- Multi-version Node.js testing (18.x and 20.x)
- Parallel job execution for faster feedback

### ✅ Code Quality Checks
- **Solhint**: Solidity linting with security best practices
- **Prettier**: Code formatting validation
- **Coverage**: Automatic coverage report generation
- **Gas Reports**: Gas usage tracking for contract operations

### ✅ Continuous Integration Tools
- GitHub Actions for automation
- Codecov for coverage tracking
- Artifact storage for reports

---

## Project Structure

```
.github/
└── workflows/
    ├── test.yml          # Main CI/CD pipeline
    └── README.md         # Workflow documentation

Configuration Files:
├── .solhint.json         # Solidity linting rules
├── .solhintignore        # Linting exclusions
├── .prettierrc.json      # Formatting rules
├── .prettierignore       # Formatting exclusions
└── .codecov.yml          # Coverage configuration
```

---

## CI/CD Pipeline

### Workflow: `test.yml`

#### Job 1: Test on Node.js 18.x
```yaml
- Checkout code
- Setup Node.js 18.x
- Install dependencies
- Run Solhint linter
- Check Prettier formatting
- Compile contracts
- Run tests
- Generate coverage
- Upload to Codecov
```

#### Job 2: Test on Node.js 20.x
```yaml
- Checkout code
- Setup Node.js 20.x
- Install dependencies
- Run Solhint linter
- Check Prettier formatting
- Compile contracts
- Run tests
- Generate coverage
- Upload to Codecov
```

#### Job 3: Code Quality Checks
```yaml
- Run Solhint (Solidity linter)
- Check Prettier formatting
- Security analysis (optional)
```

#### Job 4: Gas Usage Report
```yaml
- Generate gas consumption reports
- Upload as artifacts
```

---

## Configuration Details

### Solhint Configuration (`.solhint.json`)

**Key Rules:**
- Code complexity: Max 10
- Compiler version: ^0.8.24
- Max line length: 120 characters
- Security patterns enforced
- Naming conventions validated

**Example:**
```json
{
  "extends": "solhint:recommended",
  "rules": {
    "code-complexity": ["error", 10],
    "compiler-version": ["error", "^0.8.24"],
    "max-line-length": ["error", 120]
  }
}
```

### Prettier Configuration (`.prettierrc.json`)

**Solidity Files:**
- Print width: 120
- Tab width: 4 spaces
- Double quotes

**JavaScript/TypeScript:**
- Print width: 100
- Tab width: 2 spaces
- Semicolons required

### Codecov Configuration (`.codecov.yml`)

**Coverage Targets:**
- Project coverage: Auto with 5% threshold
- Patch coverage: Auto with 5% threshold
- Range: 70-100%

**Ignored Paths:**
- `test/**/*`
- `scripts/**/*`
- `node_modules/**/*`

---

## NPM Scripts for CI/CD

### Testing
```bash
npm test                 # Run all tests
npm run test:gas        # Run tests with gas reporting
npm run test:coverage   # Generate coverage report
```

### Code Quality
```bash
npm run lint            # Run Solhint linter
npm run lint:fix        # Auto-fix linting issues
npm run prettier        # Format all files
npm run prettier:check  # Check formatting without fixing
npm run format          # Run prettier + lint:fix
npm run format:check    # Run prettier:check + lint
```

### CI Commands
```bash
npm run ci              # Full CI: format check + compile + test
npm run ci:coverage     # Full CI with coverage
```

### Other
```bash
npm run compile         # Compile contracts
npm run clean           # Clean build artifacts
npm run security:check  # Security analysis (placeholder)
```

---

## Local Development Workflow

### 1. Before Committing

```bash
# Run full CI pipeline locally
npm run ci

# Or individual checks
npm run prettier:check
npm run lint
npm test
```

### 2. Fix Issues

```bash
# Auto-fix formatting
npm run prettier

# Auto-fix linting
npm run lint:fix

# Or both
npm run format
```

### 3. Generate Coverage

```bash
npm run test:coverage

# View HTML report
start coverage/index.html  # Windows
open coverage/index.html   # macOS
xdg-open coverage/index.html  # Linux
```

---

## GitHub Actions Setup

### 1. Enable Actions

1. Go to repository Settings
2. Navigate to Actions > General
3. Enable "Allow all actions and reusable workflows"

### 2. Configure Secrets

**Required for Codecov:**

1. Go to https://codecov.io and sign in with GitHub
2. Add your repository
3. Copy the upload token
4. In GitHub repository:
   - Settings > Secrets and variables > Actions
   - Click "New repository secret"
   - Name: `CODECOV_TOKEN`
   - Value: Your Codecov token

### 3. Branch Protection Rules (Optional)

1. Settings > Branches > Add rule
2. Branch name pattern: `main`
3. Enable:
   - ✅ Require status checks to pass
   - ✅ Require branches to be up to date
   - Select: `test-node-18`, `test-node-20`, `code-quality`
4. Save changes

---

## Codecov Integration

### Dashboard Features

- **Coverage Trends**: Track coverage over time
- **File Browser**: See coverage per file
- **Pull Request Comments**: Automatic coverage reports on PRs
- **Flags**: Separate tracking for Node 18.x and 20.x

### Viewing Reports

1. Go to https://codecov.io
2. Navigate to your repository
3. View:
   - Overall coverage percentage
   - Coverage diff for PRs
   - File-level coverage
   - Historical trends

### Coverage Badges

Add to README.md:
```markdown
[![codecov](https://codecov.io/gh/username/repo/branch/main/graph/badge.svg)](https://codecov.io/gh/username/repo)
```

---

## Troubleshooting

### CI Failures

#### Linting Errors
```bash
# Check locally
npm run lint

# View specific issues
npx solhint contracts/CropYieldOptimizer.sol

# Auto-fix
npm run lint:fix
```

#### Formatting Errors
```bash
# Check what needs formatting
npm run prettier:check

# Auto-format
npm run prettier
```

#### Test Failures
```bash
# Run tests locally
npm test

# Run with more detail
npm test -- --verbose

# Run specific test
npx hardhat test --grep "Contract Deployment"
```

#### Coverage Below Threshold
```bash
# Generate coverage locally
npm run test:coverage

# Identify uncovered code
open coverage/index.html

# Add tests for uncovered areas
```

### Common Issues

**1. Node Version Mismatch**
- Ensure local Node.js version matches CI (18.x or 20.x)
- Use nvm: `nvm use 18` or `nvm use 20`

**2. Dependency Issues**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

**3. Hardhat Compilation Errors**
```bash
# Clean cache
npm run clean
npm run compile
```

**4. Workflow Not Triggering**
- Check workflow file syntax
- Verify branch names match triggers
- Check repository Actions settings

---

## Performance Metrics

### Expected CI Times

| Job | Duration | Description |
|-----|----------|-------------|
| Test Node 18.x | ~45-60s | Full test suite + coverage |
| Test Node 20.x | ~45-60s | Full test suite + coverage |
| Code Quality | ~30s | Linting + formatting |
| Gas Report | ~30s | Gas analysis |
| **Total** | ~2-3 min | Parallel execution |

### Optimization Tips

1. **Caching**: npm dependencies are cached
2. **Parallel Jobs**: All jobs run simultaneously
3. **Early Failures**: Linting runs before tests
4. **Artifacts**: Only essential files uploaded

---

## Best Practices

### Code Quality

1. ✅ Run `npm run ci` before every commit
2. ✅ Maintain >90% test coverage
3. ✅ Fix all linting warnings
4. ✅ Follow Prettier formatting
5. ✅ Monitor gas usage

### Pull Requests

1. ✅ Wait for all CI checks to pass
2. ✅ Review coverage reports
3. ✅ Check gas usage changes
4. ✅ Address review comments
5. ✅ Keep PRs focused and small

### Maintenance

1. ✅ Update dependencies regularly
2. ✅ Review and update linting rules
3. ✅ Monitor CI performance
4. ✅ Keep workflows up to date
5. ✅ Document changes

---

## Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Codecov Documentation](https://docs.codecov.com/)
- [Solhint Rules](https://github.com/protofire/solhint/blob/master/docs/rules.md)
- [Prettier Options](https://prettier.io/docs/en/options.html)
- [Hardhat Testing](https://hardhat.org/hardhat-runner/docs/guides/test-contracts)

---

## Support

If you encounter issues:

1. Check this guide first
2. Review workflow logs in Actions tab
3. Run CI commands locally for debugging
4. Check configuration files for syntax errors
5. Consult official documentation

---

**Last Updated:** 2025-11-02
**Version:** 1.0
**Node.js Versions:** 18.x, 20.x
**Coverage Target:** >90%
