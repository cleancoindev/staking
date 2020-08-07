var Info = React.createClass({
    requiredScripts: [
        'spa/bigLoader.jsx'
    ],
    render() {
        return (
            <section>
                <section className="ExpTop">
                    <h1>Welcome to the {window.dfo.symbol} Liquidity Staking Manager</h1>
                    <section className="ExpPar">
                        <p>The {window.dfo.name} Liquidity Staking Mechanism is designed to reward <a className="FancyUni" href="https://uniswap.info/token/0x7b123f53421b1bf8533339bfbdc7c98aa94163db">Uniswap V2</a> liquidity Providers to lock long-term liquidity in Uniswap V2 <a className="FancyUni" href="https://uniswap.info/pair/0xb0fb35cc576034b01bed6f4d0333b1bd3859615c">{window.dfo.symbol}-ETH</a> and <a className="FancyUni" href="https://uniswap.info/pair/0x543a59743fe2967553512166f739c965ecd78763">{window.dfo.symbol}-USDC</a> pools.</p>
                    </section>
                    <section className="ExpPar">
                        <p><b>Disclamer:</b> Before trusting this website, make sure the URL is <a href="https://stake.dfohub.com" target="_blank">https://stake.dfohub.com</a></p>
                    </section>
                    <h1>&#127873; Reward System</h1>
                    <h2>The reward system is independent from the {window.dfo.symbol} price!</h2>
                    <section className="ExpPar">
                        <p>Rewards are calculated based on how much {window.dfo.symbol} a holder provides to a liquidity pool, without any change in or dependency on the ETH or USDC values.</p>
                    </section>
                    <h2>The reward amount is fixed, and depends on the locking period selected:</h2>
                    <section className="ExpPar">
                        <section className="ExpParBoxes">
                            {this.props && this.props.stakingData && this.props.stakingData.tiers && this.props.stakingData.tiers.map(it => <section key={it.blockNumber} className="ExpParBox">
                                {it.tierKey !== 'Custom' && <h5>{it.tierKey}</h5>}
                                <p><b>{window.formatMoney(it.blockNumber, 0)}</b> Ethereum Blocks</p>
                                <h6>{it.percentage}% &#127873;</h6>
                                <p><b>Example: {window.formatMoney(it.percentage * 1000 / 100)} {window.dfo.symbol} reward every 1,000 {window.dfo.symbol} staked</b></p>
                            </section>)}
                        </section>
                    </section>
                    <h2>The total reward of the staking position is divided and redeemable once a week!</h2>
                    <section className="ExpPar">
                        <p>Every week (47,625 Ethereum Blocks), stakers can redeem their portion of the total rewards accumulated during the staking period.</p>
                    </section> 
                    <section className="ExpPar">
                        <p><b>Example:</b> if their total reward is 1,000 {window.dfo.symbol} over a three months locking period, they can redeem 83 (1,000/12) {window.dfo.symbol} every week.</p>
                    </section>
                    <section className="ExpPar">
                        <p>Weekly rewards can be redeemed (withdrawn) once a week, or less often if a staker prefers (in less transactions), by using the "Withdraw Rewards" button.</p>
                    </section>
                    <section className="ExpPar">
                        <p>At the end of the Staking period, along with their staked {window.dfo.symbol}, the staker will be able to withdraw all of their remaining rewards (i.e, those not already withdrawn) via the stake.dfohub.com GUI, in the form of Uniswap V2 liquidity pool tokens. Then, the staker can either leave these tokens in the Uniswap V2 liquidity pool (and continue to receive Uniswap trading fees), or unlock them, converting them into {window.dfo.symbol} & eth / usdc, which they can then withdraw (along with the Uniswap trading fees they earned during the staking period) to their own personal wallet.</p>
                    </section>
                    <section className="ExpPar">
                        <h1>&#9203; Time Estimation</h1>
                        <p>In this stacking Smart Contract the time is estimated by:</p>
                    </section>
                    <section className="ExpPar">
                        <p><b>1 day:</b> 6,350 Ethereum Blocks</p>
                    </section>
                    <section className="ExpPar">
                        <p><b>1 month:</b> 190,500 Ethereum Blocks (6,350 * 30)</p>
                    </section>
                    <section className="ExpPar">
                        <p><b>1 Week:</b> 47,625 Ethereum Blocks (190,500 / 4)</p>
                    </section>
                    <section className="ExpPar">
                        <p><b>3 Months:</b> 571,500 Ethereum Blocks (190,500 * 3)</p>
                    </section>
                    <section className="ExpPar">
                        <p><b>6 Months:</b> 1,143,000 Ethereum Blocks (190,500 * 6)</p>
                    </section>
                    <section className="ExpPar">
                        <p><b>9 Months:</b> 1,714,500 Ethereum Blocks (190,500 * 9)</p>
                    </section>
                    <section className="ExpPar">
                        <p><b>1 Year:</b> 2,286,000 Ethereum Blocks (190,500 * 12)</p>
                    </section>
                    <section className="ExpPar">
                        <h1>&#128184; {window.dfo.symbol} Inflation</h1>    
                        <p>The {window.dfo.symbol} used to pay stakers is the 30% already accounted for by the <a href="https://github.com/b-u-i-d-l/fair-inflation-v2" target="_Blank">fair inflation V2 strategy</a> This means that in terms of inflation, regardless of whether {window.dfo.symbol} holders stake their {window.dfo.symbol} or not, the inflation of {window.dfo.symbol} can't be more than that outlined in the FI V2 White Paper.</p>
                    </section>
                    <section className="ExpPar">    
                        <p>The Total yearly {window.dfo.symbol} reedemeable as a reward is 64,800 {window.dfo.symbol} devided into:</p>
                    </section>
                    <section className="ExpPar"> 
                        <section className="ExpParBoxes">
                            <section className="ExpParBox">
                                <h6>3,240 {window.dfo.symbol}</h6>
                                <p>3 Months tier total reward</p>
                            </section>
                            <section className="ExpParBox">
                                <h6>6,480 {window.dfo.symbol}</h6>
                                <p>6 Months tier total reward</p>
                            </section>
                            <section className="ExpParBox">
                                <h6>23,328 {window.dfo.symbol}</h6>
                                <p>9 Months tier total reward</p>
                            </section>
                            <section className="ExpParBox">
                                <h6>31,752 {window.dfo.symbol}</h6>
                                <p>Yearly tier total reward</p>
                            </section>
                        </section>
                    </section>
                    <section className="ExpPar">  
                        <h1>&#129385; Staking Rules</h1>  
                        <p>The {window.dfo.symbol} staking reward is fixed and dependent on the lock tier selected. To avoid inflating more than the 30% of the FI V2 already set aside for the Staking Mechanism (180 {window.dfo.symbol}/day), and to ensure a fixed reward system for stakers, we have included a max {window.dfo.symbol} cap of simultaneous staking positions that can be opened.</p>
                    </section>
                    <section className="ExpPar"> 
                        <section className="ExpParBoxes">
                            <section className="ExpParBox">
                                <h6>16,200 {window.dfo.symbol}</h6>
                                <p>3 Months tier total max cap of simultaneous {window.dfo.symbol} staked at the same time</p>
                            </section>
                            <section className="ExpParBox">
                                <h6>16,200 {window.dfo.symbol}</h6>
                                <p>6 Months tier total max cap of simultaneous {window.dfo.symbol} staked at the same time</p>
                            </section>
                            <section className="ExpParBox">
                                <h6>58,320 {window.dfo.symbol}</h6>
                                <p>9 Months tier total max cap of simultaneous {window.dfo.symbol} staked at the same time</p>
                            </section>
                            <section className="ExpParBox">
                                <h6>63,504 {window.dfo.symbol}</h6>
                                <p>1 Year tier total max cap of simultaneous {window.dfo.symbol} staked at the same time</p>
                            </section>
                        </section>
                    </section>
                    <section className="ExpPar">  
                        <p>There are no individual staking limitations, and the minimum amount to open a staking position is 200 {window.dfo.symbol}.</p>
                    </section>

                    <section className="ExpPar">  
                        <h1>&#129412; Uniswap Integration</h1>  
                        <p>{window.dfo.symbol} Staking works using Uniswap V2, built by the Uniswap team. Before you stake your {window.dfo.symbol}, we kindly recommend you read carefully about how Uniswap Liquidity works and the price risks associated with the Uniswap Liquidity Provider rules. <a href="https://docs.ethhub.io/guides/graphical-guide-for-understanding-uniswap/" target="_Blank">Ethhub Uniswap Guide</a> | <a href="https://uniswap.org/docs/v2/advanced-topics/understanding-returns/" target="_Blank">Uniswap Returns Guide</a> | <a href="https://medium.com/@pintail/understanding-uniswap-returns-cc593f3499ef" target="_Blank">Advanced Uniswap Guide</a></p>
                    </section>

                    <section className="ExpPar">  
                        <h1>&#9193; How to Stake</h1>  
                        <p>Before you stake {window.dfo.symbol}, consider that during the staking process you're actually adding liquidity to Uniswap V2, and so you'll receive back Uniswap V2 Pool tokens at the end of the staking period. What happens in the background is that you're adding liquidity to Uniswap V2 just as you would via the Uniswap GUI, but you're also locking the Uniswap V2 Tokens to receive {window.dfo.symbol} rewards. We kindly recommend that you read all of the Uniswap Liquidity Providers Documentation before staking, so that you can make an informed decision:</p>
                        <p><a href="https://docs.ethhub.io/guides/graphical-guide-for-understanding-uniswap/" target="_Blank">Ethhub Uniswap Guide</a> | <a href="https://uniswap.org/docs/v2/advanced-topics/understanding-returns/" target="_Blank">Uniswap Returns Guide</a> | <a href="https://medium.com/@pintail/understanding-uniswap-returns-cc593f3499ef" target="_Blank">Advanced Uniswap Guide</a> Keep in mind that staking {window.dfo.symbol} is an irreversible action. Do it at your own risk!</p>
                    </section>
                    <section className="ExpPar">    
                        <p>To Stake Liquidity, all you have to do is go to the "Stake" Section on stake.dfohub.com and follow these steps:</p>
                    </section>
                    <section className="ExpPar">    
                        <p>#1 Connect you wallet, by clicking the "Connect" button</p>
                        <p>#2 Choose the quantity of {window.dfo.symbol} you want to stake</p>
                        <p>#3 Select between the ETH or the USDC pool, and be sure you have the ammount required</p>
                        <p>#4 Select the lock duration</p>
                        <p>#5 If you haven’t already, click the "Approve" button</p>
                        <p>#6 Wait for the “Approval” transaction to confirm</p>
                        <p>#7 Start your staking transaction by clicking "Stake"</p>
                        <p>#8 Wait for the Staking Transaction to confirm...</p>
                        <p>... <b>Done!</b> You have successfully Staked {window.dfo.symbol}. Now, you can manage your position in the "Status" page.</p>
                    </section>

                    <section className="ExpPar">  
                        <h1>&#128176; How to reedem Staking and Rewards</h1>  
                        <p>Once you have successfully created a Staking Position, you can manage it on the "Status" page:</p>
                    </section>
                    <section className="ExpPar">
                        <h2>Weekly Reward Withdraw</h2>  
                        <p>To Withdraw your weekly Reward from your position, just click the Withdraw Reward button. This button is designed to let you Withdraw all of your available unlocked rewards.</p>
                    </section>
                    <section className="ExpPar">
                        <h2>Position Withdraw</h2>  
                        <p>At the end of the Staking Period, you can use the "Withdraw Position" button to Withdraw all of your staked Uniswap V2 Pool Tokens, as well as your remaining rewards (if any).</p>
                        <p>To Withdraw your liquidity using your Uniswap V2 Liquidity Pool Tokens, you just have to go to the <a href="https://app.uniswap.org/#/pool" target="_Blank">Uniswap GUI</a>, select your Liquidity Pool and choose the amount to Withdraw.</p>
                    </section>
                </section>
            </section>
        );
    }
});