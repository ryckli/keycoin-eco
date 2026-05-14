# KeyCoin — 智能合约

所有 KeyCoin 合约部署在 **以太坊主网** 并已通过 Etherscan 验证。

## 已部署合约

| # | 合约 | 地址 | 验证状态 |
|---|----------|---------|:----:|
| ① | KeyCoinAnchor (ERC20) | `0xf2ad2aE803acB3B96402F2a996DF685675714138` | ✅ 完全匹配 |
| ② | KeyCoinLocking | `0x2c5b3b75c00a10f848468d872aff7faaca2c291f` | ⚠️ 相似匹配 |
| ③ | KeyCoinGovernor | `0x87a07e94cafc17a1ba92c9e2e129b54aee7e6f91` | ⚠️ 相似匹配 |
| ④ | QuantumMigrationCommitment | `0x186a31AAF4e025a3475A7977005504E7AdCE0DFc` | ✅ 完全匹配 |

## Etherscan 直达链接

| 合约 | 读取 | 写入 |
|----------|------|-------|
| Anchor | [#readContract](https://etherscan.io/address/0xf2ad2aE803acB3B96402F2a996DF685675714138#readContract) | [#writeContract](https://etherscan.io/address/0xf2ad2aE803acB3B96402F2a996DF685675714138#writeContract) |
| Locking | [#readContract](https://etherscan.io/address/0x2c5b3b75c00a10f848468d872aff7faaca2c291f#readContract) | [#writeContract](https://etherscan.io/address/0x2c5b3b75c00a10f848468d872aff7faaca2c291f#writeContract) |
| Governor | [#readContract](https://etherscan.io/address/0x87a07e94cafc17a1ba92c9e2e129b54aee7e6f91#readContract) | [#writeContract](https://etherscan.io/address/0x87a07e94cafc17a1ba92c9e2e129b54aee7e6f91#writeContract) |
| QMC | [#readContract](https://etherscan.io/address/0x186a31AAF4e025a3475A7977005504E7AdCE0DFc#readContract) | [#writeContract](https://etherscan.io/address/0x186a31AAF4e025a3475A7977005504E7AdCE0DFc#writeContract) |

---

## KeyCoinAnchor (ERC20 代币)

核心代币合约。实现 ERC20 与 AccessControl、ReentrancyGuard、Pausable。

### 角色权限

| 角色 | 链上 keccak256 |
|------|--------------------|
| GOVERNOR_ROLE | `0x7935bd0ae54bc31f548c14dba4d37c5c64b3f8ca900cb468fb8abd54d5894f55` |
| MINTER_ROLE | `0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6` |
| ORACLE_ROLE | `0x68e79a7bf1e0bc45d0a330c573bc367f9cf464fd326078812f301165fbda4ef1` |
| PAUSER_ROLE | `0x65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a` |
| DEFAULT_ADMIN_ROLE | `0x0000000000000000000000000000000000000000000000000000000000000000` |

### 核心函数

| 函数 | 权限 | 说明 |
|----------|--------|-------------|
| `mintDaily()` | Public | 基于验证发电量 × 经济乘数每日铸造 KEY |
| `reportGeneration(kWh, aiValue)` | ORACLE_ROLE | Oracle 提交每日发电数据 |
| `setBaseMultiplier(m)` | GOVERNOR_ROLE | 调整经济乘数（范围：0.5–2.0） |
| `rewardCreator(creator, amount)` | MINTER_ROLE | 从奖励池中奖励内容创造者 |
| `deductPowerBill(amount)` | Public | 销毁 KEY 抵扣电费 |
| `pause()` / `unpause()` | PAUSER_ROLE | 紧急暂停 |

### 代币参数

| 参数 | 值 |
|-----------|-------|
| 名称 | Key Coin |
| 符号 | KEY |
| 小数位 | 18 |
| 初始供应量 | 21,474,836.47 KEY（动态，电力锚定） |
| 电力抵扣池比例 | 70% |
| 奖励池比例 | 30% |
| 销毁率 | 2% |

### Oracle 机制

- 每日铸造需至少 3 个 Oracle 达成共识
- 最多 21 个 Oracle
- 偏差 > 5% 触发质押罚没
- 每日 UTC 00:00 重置

### Constructor ABI

```
000000000000000000000000424f377c6d0c4f5d7b0810ecdcc047caf71f25ea
000000000000000000000000959387b05e43133ec0aaeec64196ba0a24fd0ab6
0000000000000000000000004dd49f7d5fa329e5baf15f886d017640a05331ad
000000000000000000000000c105f0b90c537aaa46092903aac01ee59e3e6c86
```

---

## KeyCoinLocking

时间加权锁仓合约，赋予治理投票权和生态参与资格。

### 核心函数

| 函数 | 说明 |
|----------|-------------|
| `lock(amount, lockDays)` | 锁定 KEY，365–3650 天 |
| `unlock(index)` | 到期后解锁 |
| `earlyUnlock(index)` | 提前解锁，扣除 20% → 生态基金 |
| `lockCount(address)` | 活跃锁仓数量 |
| `locks(address, index)` | 锁仓详情（金额、到期时间、已提取、活跃状态） |

### 锁仓参数

| 参数 | 值 |
|-----------|-------|
| 最小锁定时长 | 365 天 |
| 最大锁定时长 | 3,650 天 |
| 提前解锁罚金 | 20% |

### Constructor ABI

```
000000000000000000000000f2ad2ae803acb3b96402f2a996df685675714138
000000000000000000000000424f377c6d0c4f5d7b0810ecdcc047caf71f25ea
```

---

## KeyCoinGovernor

链上治理合约。实现基于理事会的投票机制，采用时间加权投票权。

### 核心函数

| 函数 | 说明 |
|----------|-------------|
| `propose(pType, title, desc, calldata)` | 创建提案 |
| `castVote(pid, support)` | 对提案投票 |
| `resolveProposal(pid)` | 投票结束后执行提案 |
| `electCouncil(candidates)` | 选举理事会成员 (GOVERNOR_ROLE) |
| `getCouncil()` | 列出在任理事会成员 |
| `votingPower(user)` | 计算时间加权投票权 |

### 提案类型

| 类型 | 最小投票权 | 参与率 | 通过条件 |
|------|----------|:---:|:----:|
| ORACLE_WHITELIST | 10% | 10% | 70% |
| CONTRIBUTION_WEIGHT | 15% | 15% | 75% |
| ECONOMIC_MULTIPLIER | 20% | 20% | 80% |
| PROTOCOL_UPGRADE | 25% | 25% | 85% |
| COUNCIL_ELECTION | 15% | 15% | 排名制 |
| EMERGENCY_PAUSE | 5% | 5% | 70% |
| GENERAL | 10% | 10% | 70% |

### 理事会

- 9 个席位
- 3 年任期
- 每年改选 1/3
- 紧急暂停需 5/9 通过

### Constructor ABI

```
0000000000000000000000002c5b3b75c00a10f848468d872aff7faaca2c291f
000000000000000000000000f2ad2ae803acb3b96402f2a996df685675714138
```

---

## QuantumMigrationCommitment (QMC)

不可变独立合约，编码项目对后量子密码学迁移的不可撤销承诺。

### 威胁等级

| 等级 | 值 | 触发条件 |
|-------|-------|---------|
| NONE | 0 | 当前状态 |
| AWARE | 1 | 量子计算理论突破 |
| CONCERNED | 2 | 逻辑量子比特 > 1000 |
| CRITICAL | 3 | 量子计算机接近破解 ECDSA |
| BREACHED | 4 | ECDSA 已被实际破解 |

### 核心函数

| 函数 | 说明 |
|----------|-------------|
| `currentThreatLevel()` | 当前量子威胁等级 |
| `updateThreatLevel(level, evidence)` | 升级威胁等级（仅 Governor） |
| `migrateToPQC(pqcKeyRoot)` | 注册 PQC 公钥根 |
| `hasMigratedToPQC(address)` | 检查地址是否已迁移 |
| `getThreatHistory()` | 完整威胁等级变更历史 |

### PQC 标准

| 组件 | 当前 | PQC 替代 | NIST 标准 |
|-----------|---------|-----------------|:--:|
| 数字签名 | ECDSA (secp256k1) | CRYSTALS-Dilithium | FIPS 204 |
| 密钥封装 | ECDH | CRYSTALS-Kyber | FIPS 203 |
| 哈希函数 | Keccak-256 | SHA-3 / SHAKE-256 | FIPS 202（已量子安全）|

---

## 编译参数

```json
{
  "compiler": "v0.8.20+commit.a1b79de6",
  "optimization": true,
  "runs": 200,
  "viaIR": true,
  "evm": "default",
  "license": "MIT"
}
```

⚠️ Governor 合约因大量函数/结构体导致栈深度问题，需启用 `viaIR: true`。

## 当前 KEY 状态

| 指标 | 值 |
|--------|-------|
| `totalSupply` | ~21,474,836 KEY |
| `baseMultiplier` | 1.0 |
| `lastMintDay` | 20582 |
| 理事会 | 9/9 就位 |

## 安全与审计

- 所有合约已在 Etherscan 验证
- 基于 OpenZeppelin v4.9.6
- 基于 AccessControl 的角色分离
- 所有状态变更函数配备 ReentrancyGuard
- Pausable 紧急熔断
- 多 Oracle 交叉验证 + 偏差罚没
