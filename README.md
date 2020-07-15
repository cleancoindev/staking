# buidl Liquidity Staking Mechanism V1

On Monday Jul 20 2020, at ~5pm CEST (Ethereum Block n 10497000) the buidl Staking contract will start working! 
The Staking Contract (0x9085F272D2F348a48Be31D6e66D221463677F6c7) is already deployed. 

## How it Works:

The DFOhub Liquidity Staking Mechanism is designed to reward Uniswap V2 liquidity Providers (buidl-ETH and buidl-USDC exchanges) to lock long-therm liquidity.

The reward amount is fixed, and depends on the locking period selected. The reward system is independent from the buidl price. It's calculated based on how much buidl a holder uses to fill a liquidity pool, without any changes or dependency on the ETH or USDC values.

### The total reward of the staking position is divided and redeemable once a week.

Example: if the total reward is 10 buidl over three months locking period, this means that the staker can redeem 0.83 (10/12) buidl every week.

### The minimum amount of buidl to open a liquidity staking position is 200 buidl.

The Reward is calculated based on four Lock tiers:

## Three Months (5% Reward)

Every buidl Staked for a three months locking period is equal to a reward of 0.05 buidl (0.004 buidl weekly).

Example: 10,000 buidl staked will earn as a total reward 500 buidl  (40 buidl weekly)

## Six Months (20% Reward)

Every buidl Staked for a six months locking period is equal to a reward of 0.2 buidl (0.008 buidl weekly).

Example: 10,000 buidl staked will earn as a total reward 2,000 buidl (80 buidl weekly)

## Nine Months (30% Reward)

Every buidl Staked for a nine months locking period is equal to a reward of 0.3 buidl (0.0082 buidl weekly).

Example: 10,000 buidl staked will earn as a total reward 3,000 buidl (80 buidl weekly)

## One Year (50% Reward)

Every buidl Staked for a yearly locking period is equal to a reward of 0.5 buidl (0.01 buidl weekly).

Example: 10,000 buidl staked will earn as a total reward 5000 buidl (100 buidl weekly)

# Redeem

At the end of the staking period, the staker can redeem the related Uniswap V2 token (Liquidity + Uniswap Trading Fees) and the reward (if not already redeemed).

# Inflation

The staking mechanism is already accounted for by the Fair Inflation V2 (FI V2) of DFOhub, reduced by 30% during the last week update to pay the Staking Rewards.

In order to not exceed the 30% of the FI V2, every Lock Tier has a limited number of buidl that can be simultaneously staked:

### Three Months: 16,200 Max buidl staked at the same time.

### Six Months: 16,200 Max buidl staked at the same time.

### Nine Months: 58,320 Max buidl staked at the same time.

### One Year: 63,504 Max buidl staked at the same time.

# GUI

The Official Staking GUI will be available before Monday at https://stake.dfohub.com
