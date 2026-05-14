# Key Coin Tokenomics

<p style="text-align:center;color:rgba(255,255,255,0.5);font-size:1.1rem;margin-bottom:3rem;">1:1 pegged to daily power generation — generalized currency</p>

## Pegging Formula

$$M = 1 + \frac{V_{AI}}{C_{power}}$$

| Variable | Meaning |
|------|------|
| $M$ | Economic value multiplier |
| $V_{AI}$ | Daily AI compute network economic value (USD) |
| $C_{power}$ | Total daily power generation cost |

**Example:** If daily generation is 1 billion kWh and AI output value is 0.3× generation cost → $M = 1.3$ → 1.3 billion KEY minted that day.

## Issuance Process — Proof-of-Generation

```mermaid
graph LR
    A[🏭 Data Collection<br/>DePIN Node Report] --> B[🔮 Multi-Verification<br/>3+ Oracle Cross-Verify]
    B --> C{Deviation > 5%?}
    C -->|Yes| D[⚠️ Slash Stake]
    C -->|No| E[⚡ Daily Mint<br/>UTC 00:00 Auto-Execute]
    E --> F[💰 70% Electricity Offset Pool]
    E --> G[🏆 30% Contributor Reward Pool]
```

## Circulation Loop

```mermaid
graph TB
    A[⚡ Clean Energy Generation] --> B[🔖 PoG-NFT]
    B --> C[💰 Key Coin Minting]
    C --> D[🔌 Electricity Offset]
    C --> E[🏆 Creation Rewards]
    C --> F[🏗️ Custom Production]
    D --> G[⚡ Power Consumption]
    E --> G
    F --> G
    G --> A
```

## Token Distribution

| Category | Share | Description |
|------|------|------|
| Direct Electricity Offset | **70%** | Auto-deducted for users/nodes, covering ~70% of AI compute costs |
| Contributor Reward Pool | **30%** | AI-assessed distribution to creators and community participants |

### Ecosystem Development Fund (20% of total supply)

| Sub-fund | Share of Fund | Purpose |
|------|---------|------|
| Creator Fund | 35% | Artists, designers, content producers |
| Developer Fund | 25% | Protocol contributors, DApp developers |
| Clean Energy Fund | 20% | Clean energy node deployment subsidies |
| Education Fund | 12% | Universal basic education content |
| Community Fund | 8% | Community organizers, translators, evangelists |

## Inflation Control

<div class="value-grid" style="margin:2rem auto;">

<div class="value-card">
<h3>⚡ Real Generation Hard Cap</h3>
<p>Daily issuance strictly constrained by verified generation data. Physical laws guarantee monetary discipline.</p>
</div>

<div class="value-card">
<h3>🔥 Auto-Burn Mechanism</h3>
<p>Key Coin partially burned during electricity offset, naturally reducing circulating supply and maintaining long-term scarcity.</p>
</div>

<div class="value-card">
<h3>🔒 Long-Term Locking Reduces Circulation</h3>
<p>Governance voting requires 2+ year lock-up, pulling large amounts of KEY out of circulation and lowering inflation pressure.</p>
</div>

</div>

## On-Chain Data

| Metric | Value |
|------|-----|
| Total Supply | <span class="big-number">~21,474,836</span> KEY |
| Base Multiplier | <span class="big-number">1.0</span> |
| Last Mint Day | Day 20582 |
| Locked KEY | 100 KEY (Test) |

## Quantum Safety Commitment

On-chain [QuantumMigrationCommitment](https://etherscan.io/address/0x186a31AAF4e025a3475A7977005504E7AdCE0DFc) (`0x186a...0DFc`), with a five-tier threat response mechanism ensuring asset safety in the quantum era.

> See [Technical Architecture](/en/tech.html) — Quantum Security Architecture section.
