var Info = React.createClass({
    requiredScripts: [
        'spa/bigLoader.jsx'
    ],
    render() {
        return (
            <section>
                <section className="ExpTop">
                    <h1>Welcome to the $BUIDL Liquidity Staking Manager</h1>
                    <section className="ExpPar">
                        <p>The DFOhub Liquidity Staking Mechanism is designed to reward <a className="FancyUni" href="https://uniswap.info/token/0x7b123f53421b1bf8533339bfbdc7c98aa94163db">Uniswap V2</a> liquidity Providers to lock long-term liquidity in Uniswap V2 <a className="FancyUni" href="https://uniswap.info/pair/0xb0fb35cc576034b01bed6f4d0333b1bd3859615c">buidl-ETH</a> and <a className="FancyUni" href="https://uniswap.info/pair/0x543a59743fe2967553512166f739c965ecd78763">buidl-USDC</a> pools.</p>
                    </section>
                    <section className="ExpPar">    
                        <p><b>Disclamer:</b> Before trusting this website, make sure the URL is <a href="https://stake.dfohub.com" target="_blank">https://stake.dfohub.com</a></p>
                    </section>
                    <h1>&#127873; Reward System</h1>
                    <h2>The reward system is independent from the buidl price!</h2>
                    <section className="ExpPar">    
                        <p>Rewards are calculated based on how much buidl a holder provides to a liquidity pool, without any change in or dependency on the ETH or USDC values.</p>
                    </section>
                    <h2>The reward amount is fixed, and depends on the locking period selected:</h2>
                    <section className="ExpPar"> 
                        <section className="ExpParBoxes">
                            <section className="ExpParBox">
                                <h5>3 Months</h5>
                                <p><b>571,500</b> Ethereum Blocks</p>
                                <h6>5% &#127873;</h6>
                                <p><b>Example: 50 buidl reward every 1,000 buidl staked</b></p>
                            </section>
                            <section className="ExpParBox">
                                <h5>6 Months</h5>
                                <p><b>1,143,000</b> Ethereum Blocks</p>
                                <h6>20% &#127873;</h6>
                                <p><b>Example: 200 buidl reward every 1,000 buidl staked</b></p>
                            </section>
                            <section className="ExpParBox">
                                <h5>9 Months</h5>
                                <p><b>1,714,500</b> Ethereum Blocks</p>
                                <h6>30% &#127873;</h6>
                                <p><b>Example: 300 buidl reward every 1,000 buidl staked</b></p>
                            </section>
                            <section className="ExpParBox">
                                <h5>1 Year</h5>
                                <p><b>2,286,000</b> Ethereum Blocks</p>
                                <h6>50% &#127873;</h6>
                                <p><b>Example: 500 buidl reward every 1,000 buidl staked</b></p>
                            </section>
                        </section>
                    </section>
                    <h2>The total reward of the staking position is divided and redeemable once a week!</h2>
                    <section className="ExpPar">    
                        <p>Every week (47,625 Ethereum Blocks), stakers can redeem their portion of the total rewards accumulated during the staking period.</p>
                    </section> 
                    <section className="ExpPar">   
                        <p><b>Example:</b> if their total reward is 1,000 buidl over a three months locking period, they can redeem 83 (1,000/12) buidl every week.</p>
                    </section>
                    <section className="ExpPar">    
                        <p>Weekly rewards can be redeemed (withdrawn) once a week, or less often if a staker prefers (in less transactions), by using the "Withdraw Rewards" button.</p>
                    </section>
                    <section className="ExpPar"> 
                        <p>At the end of the Staking period, along with their staked buidl, the staker will be able to withdraw all of their remaining rewards (i.e, those not already withdrawn) via the stake.dfohub.com GUI, in the form of Uniswap V2 liquidity pool tokens. Then, the staker can either leave these tokens in the Uniswap V2 liquidity pool (and continue to receive Uniswap trading fees), or unlock them, converting them into buidl & eth / usdc, which they can then withdraw (along with the Uniswap trading fees they earned during the staking period) to their own personal wallet.</p>
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
                        <h1>&#128184; buidl Inflation</h1>    
                        <p>The buidl used to pay stakers is the 30% already accounted for by the <a href="https://github.com/b-u-i-d-l/fair-inflation-v2" target="_Blank">fair inflation V2 strategy</a> This means that in terms of inflation, regardless of whether buidl holders stake their buidl or not, the inflation of buidl can't be more than that outlined in the FI V2 White Paper.</p>
                    </section>
                    <section className="ExpPar">    
                        <p>The Total yearly buidl reedemeable as a reward is 64,800 buidl devided into:</p>
                    </section>
                    <section className="ExpPar"> 
                        <section className="ExpParBoxes">
                            <section className="ExpParBox">
                                <h6>3,240 buidl</h6>
                                <p>3 Months tier total reward</p>
                            </section>
                            <section className="ExpParBox">
                                <h6>6,480 buidl</h6>
                                <p>6 Months tier total reward</p>
                            </section>
                            <section className="ExpParBox">
                                <h6>23,328 buidl</h6>
                                <p>9 Months tier total reward</p>
                            </section>
                            <section className="ExpParBox">
                                <h6>31,752 buidl</h6>
                                <p>Yearly tier total reward</p>
                            </section>
                        </section>
                    </section>
                    <section className="ExpPar">  
                        <h1>&#129385; Staking Rules</h1>  
                        <p>The buidl staking reward is fixed and dependent on the lock tier selected. To avoid inflating more than the 30% of the FI V2 already set aside for the Staking Mechanism (180 buidl/day), and to ensure a fixed reward system for stakers, we have included a max buidl cap of simultaneous staking positions that can be opened.</p>
                    </section>
                    <section className="ExpPar"> 
                        <section className="ExpParBoxes">
                            <section className="ExpParBox">
                                <h6>16,200 buidl</h6>
                                <p>3 Months tier total max cap of simultaneous buidl staked at the same time</p>
                            </section>
                            <section className="ExpParBox">
                                <h6>16,200 buidl</h6>
                                <p>6 Months tier total max cap of simultaneous buidl staked at the same time</p>
                            </section>
                            <section className="ExpParBox">
                                <h6>58,320 buidl</h6>
                                <p>9 Months tier total max cap of simultaneous buidl staked at the same time</p>
                            </section>
                            <section className="ExpParBox">
                                <h6>63,504 buidl</h6>
                                <p>1 Year tier total max cap of simultaneous buidl staked at the same time</p>
                            </section>
                        </section>
                    </section>
                    <section className="ExpPar">  
                        <p>There are no individual staking limitations, and the minimum amount to open a staking position is 200 buidl.</p>
                    </section>

                    <section className="ExpPar">  
                        <h1>&#129412; Uniswap Integration</h1>  
                        <p>buidl Staking works using Uniswap V2, built by the Uniswap team. Before you stake your buidl, we kindly recommend you read carefully about how Uniswap Liquidity works and the price risks associated with the Uniswap Liquidity Provider rules. <a href="https://docs.ethhub.io/guides/graphical-guide-for-understanding-uniswap/" target="_Blank">Ethhub Uniswap Guide</a> | <a href="https://uniswap.org/docs/v2/advanced-topics/understanding-returns/" target="_Blank">Uniswap Returns Guide</a> | <a href="https://medium.com/@pintail/understanding-uniswap-returns-cc593f3499ef" target="_Blank">Advanced Uniswap Guide</a></p>
                    </section>

                    <section className="ExpPar">  
                        <h1>&#129385; How to Stake</h1>  
                        <p>The buidl staking reward is fixed and dependent to the lock tier selected. To don't inflate more than the 30% of the FI V2 removed for the Stake Mechanism (180 buidl/day) and to reach a fixed reward system for stakers, we have added a max cap of simultaneous staking positions opened based on buidl staked:</p>
                    </section>

                    <section className="ExpPar">  
                        <h1>&#129385; How to reedem Staking and Rewards</h1>  
                        <p>The buidl staking reward is fixed and dependent to the lock tier selected. To don't inflate more than the 30% of the FI V2 removed for the Stake Mechanism (180 buidl/day) and to reach a fixed reward system for stakers, we have added a max cap of simultaneous staking positions opened based on buidl staked:</p>
                    </section>
                </section>
            </section>
        );
    }
});