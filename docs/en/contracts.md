# KeyCoin — Smart Contracts

All KeyCoin contracts are deployed on **Ethereum Mainnet** and verified on Etherscan.

## Deployed Contracts

| # | Contract | Address | Verification |
|---|----------|---------|:------------:|
| ① | KeyCoinAnchor (ERC20) | `0xf2ad2aE803acB3B96402F2a996DF685675714138` | ✅ Exact Match |
| ② | KeyCoinLocking | `0x2c5b3b75c00a10f848468d872aff7faaca2c291f` | ⚠️ Similar Match |
| ③ | KeyCoinGovernor | `0x87a07e94cafc17a1ba92c9e2e129b54aee7e6f91` | ⚠️ Similar Match |
| ④ | QuantumMigrationCommitment | `0x186a31AAF4e025a3475A7977005504E7AdCE0DFc` | ✅ Exact Match |

## Etherscan Direct Links

| Contract | Read | Write |
|----------|------|-------|
| Anchor | [#readContract](https://etherscan.io/address/0xf2ad2aE803acB3B96402F2a996DF685675714138#readContract) | [#writeContract](https://etherscan.io/address/0xf2ad2aE803acB3B96402F2a996DF685675714138#writeContract) |
| Locking | [#readContract](https://etherscan.io/address/0x2c5b3b75c00a10f848468d872aff7faaca2c291f#readContract) | [#writeContract](https://etherscan.io/address/0x2c5b3b75c00a10f848468d872aff7faaca2c291f#writeContract) |
| Governor | [#readContract](https://etherscan.io/address/0x87a07e94cafc17a1ba92c9e2e129b54aee7e6f91#readContract) | [#writeContract](https://etherscan.io/address/0x87a07e94cafc17a1ba92c9e2e129b54aee7e6f91#writeContract) |
| QMC | [#readContract](https://etherscan.io/address/0x186a31AAF4e025a3475A7977005504E7AdCE0DFc#readContract) | [#writeContract](https://etherscan.io/address/0x186a31AAF4e025a3475A7977005504E7AdCE0DFc#writeContract) |

---

## KeyCoinAnchor (ERC20 Token)

The core token contract. Implements ERC20 with AccessControl, ReentrancyGuard, and Pausable.

### Roles

| Role | On-Chain keccak256 |
|------|--------------------|
| GOVERNOR_ROLE | `0x7935bd0ae54bc31f548c14dba4d37c5c64b3f8ca900cb468fb8abd54d5894f55` |
| MINTER_ROLE | `0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6` |
| ORACLE_ROLE | `0x68e79a7bf1e0bc45d0a330c573bc367f9cf464fd326078812f301165fbda4ef1` |
| PAUSER_ROLE | `0x65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a` |
| DEFAULT_ADMIN_ROLE | `0x0000000000000000000000000000000000000000000000000000000000000000` |

### Key Functions

| Function | Access | Description |
|----------|--------|-------------|
| `mintDaily()` | Public | Mint new KEY based on verified daily kWh × economic multiplier |
| `reportGeneration(kWh, aiValue)` | ORACLE_ROLE | Oracle submits daily generation data |
| `setBaseMultiplier(m)` | GOVERNOR_ROLE | Adjust economic multiplier (range: 0.5–2.0) |
| `rewardCreator(creator, amount)` | MINTER_ROLE | Reward content creators from Reward Pool |
| `deductPowerBill(amount)` | Public | Burn KEY to offset electricity costs |
| `pause()` / `unpause()` | PAUSER_ROLE | Emergency pause |

### Token Parameters

| Parameter | Value |
|-----------|-------|
| Name | Key Coin |
| Symbol | KEY |
| Decimals | 18 |
| Initial Supply | 21,474,836.47 KEY (dynamic, electricity-anchored) |
| Power Pool Share | 70% |
| Reward Pool Share | 30% |
| Burn Rate | 2% |

### Oracle Mechanism

- Minimum 3 Oracle consensus required for daily minting
- Maximum 21 Oracles
- Deviation > 5% triggers stake forfeiture
- Daily reset at UTC 00:00

### Constructor ABI
000000000000000000000000424f377c6d0c4f5d7b0810ecdcc047caf71f25ea
000000000000000000000000959387b05e43133ec0aaeec64196ba0a24fd0ab6
0000000000000000000000004dd49f7d5fa329e5baf15f886d017640a05331ad
000000000000000000000000c105f0b90c537aaa46092903aac01ee59e3e6c86

---

## KeyCoinLocking
A time-weighted locking contract that enables governance voting power and ecosystem participation.
### Key Functions
| Function | Description |
|----------|-------------|
| `lock(amount, lockDays)` | Lock KEY for 365–3650 days |
| `unlock(index)` | Unlock after expiry |
| `earlyUnlock(index)` | Early unlock with 20% penalty → Ecosystem Fund |
| `lockCount(address)` | Number of active locks |
| `locks(address, index)` | Lock details (amount, endTime, withdrawn, active) |
### Locking Parameters
| Parameter | Value |
|-----------|-------|
| Min Lock Duration | 365 days |
| Max Lock Duration | 3,650 days |
| Early Unlock Penalty | 20% |
### Constructor ABI
000000000000000000000000f2ad2ae803acb3b96402f2a996df685675714138
000000000000000000000000424f377c6d0c4f5d7b0810ecdcc047caf71f25ea

---

## KeyCoinGovernor
The on-chain governance contract. Implements Council-based voting with time-weighted voting power.
### Key Functions
| Function | Description |
|----------|-------------|
| `propose(pType, title, desc, calldata)` | Create a proposal |
| `castVote(pid, support)` | Vote on a proposal |
| `resolveProposal(pid)` | Resolve after voting period |
| `electCouncil(candidates)` | Elect Council members (GOVERNOR_ROLE) |
| `getCouncil()` | List active Council members |
| `votingPower(user)` | Calculate time-weighted voting power |
### Proposal Types
| Type | Threshold | Participation | Approval |
|------|----------|:-------------:|:--------:|
| ORACLE_WHITELIST | 10% | 10% | 70% |
| CONTRIBUTION_WEIGHT | 15% | 15% | 75% |
| ECONOMIC_MULTIPLIER | 20% | 20% | 80% |
| PROTOCOL_UPGRADE | 25% | 25% | 85% |
| COUNCIL_ELECTION | 15% | 15% | Plurality |
| EMERGENCY_PAUSE | 5% | 5% | 70% |
| GENERAL | 10% | 10% | 70% |
### Council
- 9 seats
- 3-year terms
- 1/3 rotation per year
- 5/9 required for emergency pause
### Constructor ABI
0000000000000000000000002c5b3b75c00a10f848468d872aff7faaca2c291f
000000000000000000000000f2ad2ae803acb3b96402f2a996df685675714138

---

## QuantumMigrationCommitment (QMC)
An immutable, standalone contract that encodes the project's irrevocable commitment to Post-Quantum Cryptography migration.
### Threat Levels
| Level | Value | Trigger |
|-------|-------|---------|
| NONE | 0 | Current state |
| AWARE | 1 | Quantum computing theoretical breakthrough |
| CONCERNED | 2 | Logical qubits > 1000 |
| CRITICAL | 3 | Quantum computer approaching ECDSA cracking capability |
| BREACHED | 4 | ECDSA has been broken |
### Key Functions
| Function | Description |
|----------|-------------|
| `currentThreatLevel()` | Current quantum threat level |
| `updateThreatLevel(level, evidence)` | Upgrade threat level (Governor only) |
| `migrateToPQC(pqcKeyRoot)` | Register PQC public key root |
| `hasMigratedToPQC(address)` | Check if address has migrated |
| `getThreatHistory()` | Full threat level change history |
### PQC Standards
| Component | Current | PQC Replacement | NIST Standard |
|-----------|---------|-----------------|:------------:|
| Digital Signature | ECDSA (secp256k1) | CRYSTALS-Dilithium | FIPS 204 |
| Key Encapsulation | ECDH | CRYSTALS-Kyber | FIPS 203 |
| Hash Function | Keccak-256 | SHA-3 / SHAKE-256 | FIPS 202 (already quantum-safe) |
---
## Compilation Parameters
```json
{
  "compiler": "v0.8.20+commit.a1b79de6",
  "optimization": true,
  "runs": 200,
  "viaIR": true,
  "evm": "default",
  "license": "MIT"
}
⚠️ Governor requires viaIR: true due to stack depth from extensive function/struct usage.

## Current KEY State

| Metric | Value |
|--------|-------|
| `totalSupply` | ~21,474,836 KEY |
| `baseMultiplier` | 1.0 |
| `lastMintDay` | 20582 |
| Council | 9/9 active |

## Security & Auditing

- All contracts verified on Etherscan
- OpenZeppelin v4.9.6 foundations
- AccessControl-based role separation
- ReentrancyGuard on all state-changing functions
- Pausable emergency circuit breaker
- Multi-Oracle cross-validation with deviation penalties