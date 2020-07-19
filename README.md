# buidl Liquidity Staking Mechanism V1

<img src="/assets/img/syb.gif">

On Monday Jul 20 2020, at ~5pm CEST (Ethereum Block n. <a href="https://etherscan.io/block/countdown/10497000" target="_Blank">10497000</a>) the buidl Staking Contract will start working! 
The Staking Contract <a href="https://etherscan.io/address/0xb81ddc1bcb11fc722d6f362f4357787e6f958ce0" target="_Blank">0xb81ddc1bcb11fc722d6f362f4357787e6f958ce0</a> is already deployed. 

The DFOhub Liquidity Staking Mechanism is designed to reward liquidity providers to lock long-term liquidity in Uniswap V2 buidl-ETH and buidl-USDC pools.

# Reward System

### The reward system is independent from the buidl price!

Rewards are calculated based on how much buidl a holder provides to a liquidity pool, without any change in or dependency on the ETH or USDC values.

The reward amount is fixed, and depends on the locking period selected:

<img src="/assets/img/stperch.png">

## The total reward of the staking position is divided and redeemable once a week!

Every week (47,625 Ethereum Blocks), stakers can redeem their portion of the total rewards accumulated during the staking period. 

Example: if their total reward is 1,000 buidl over a three months locking period, they can redeem 83 (1,000/12) buidl every week.

Weekly rewards can be redeemed (withdrawn) once a week, or less often if a staker prefers (in less transactions), by using the "Withdraw Rewards" button. 

At the end of the staking period, Stakers can just withdraw all of their accumulated rewards, along with their staked buidl, using the "Withdraw Position" button(even after the staking period has ended).

# Time Estimetion

For this staking Smart Contract, time is estimated by:

1 day: 6,350 Ethereum Blocks

1 month: 190,500 Ethereum Blocks (6,350 * 30)

1 Week: 47,625 Ethereum Blocks (190,500 / 4)

3 Months: 571,500 Ethereum Blocks (190,500 * 3)

6 Months: 1,143,000 Ethereum Blocks (190,500 * 6)

9 Months: 1,714,500 Ethereum Blocks (190,500 * 9)

1 Year: 2,286,000 Ethereum Blocks (190,500 * 12)

# buidl Inflation

The buidl used to pay stakers is the 30% already accounted for by the <a href="https://github.com/b-u-i-d-l/fair-inflation-v2">Fair inflation V2 strategy</a>. This means that in terms of inflation, regardless of whether  buidl holders stake their buidl or not, the inflation of buidl can't be more than that outlined in the FI V2 White Paper.

The total yearly buidl redeemable as rewards is 64,800 buidl, divided into:

<img src="/assets/img/maxreward.png">

# Staking Rules

The buidl staking reward is fixed and dependent on the lock tier selected. To avoid inflating more than the 30% of the FI V2 already set aside for the Staking Mechanism (180 buidl/day), and to ensure a fixed reward system for stakers, we have included a max buidl cap of simultaneous staking positions that can be opened.

<img src="/assets/img/maxcap.png">

There are no individual staking limitations, and the minimum amount to open a staking position is 200 buidl.

At the end of the Staking period, along with their staked buidl, the staker will be able to withdraw all of their remaining rewards (i.e, those not already withdrawn) via the stake.dfohub.com GUI, in the form of Uniswap V2 liquidity pool tokens. Then, the staker can either leave these tokens in the Uniswap V2 liquidity pool (and continue to receive Uniswap trading fees), or unlock them, converting them into buidl & eth / usdc, which they can then withdraw (along with the Uniswap trading fees they earned during the staking period) to their own personal wallet.

# Uniswap Integration

buidl Staking works using Uniswap V2, built by the Uniswap team. Before you  stake your buidl, we kindly recommend you read carefully about how Uniswap Liquidity works and the price risks associated with the Uniswap Liquidity Provider rules. 

<a href="https://docs.ethhub.io/guides/graphical-guide-for-understanding-uniswap/" target="_Blank">Ethhub Uniswap Guide</a>

<a href="https://uniswap.org/docs/v2/advanced-topics/understanding-returns/" target="_Blank">Uniswap Returns Guide</a>

<a href="https://medium.com/@pintail/understanding-uniswap-returns-cc593f3499ef" target="_Blank">Advanced Uniswap Guide</a>

# GUI

The Official Staking GUI will be available before Monday at https://stake.dfohub.com
