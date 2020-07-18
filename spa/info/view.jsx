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
                        <p>The DFOhub Liquidity Staking Mechanism is designed to reward <a className="FancyUni" href="https://uniswap.info/token/0x7b123f53421b1bf8533339bfbdc7c98aa94163db">Uniswap V2</a> liquidity Providers (<a className="FancyUni" href="https://uniswap.info/pair/0xb0fb35cc576034b01bed6f4d0333b1bd3859615c">buidl-ETH</a> and <a className="FancyUni" href="https://uniswap.info/pair/0x543a59743fe2967553512166f739c965ecd78763">buidl-USDC</a> exchanges) to lock long-therm liquidity.</p>
                    </section>
                    <section className="ExpPar">    
                        <p><b>Disclamer:</b> Before trusting this website, make sure the URL is <a href="https://stake.dfohub.com" target="_blank">https://stake.dfohub.com</a></p>
                    </section>
                    <h2>The reward system is independent from the buidl price!</h2>
                    <section className="ExpPar">    
                        <p>The reward system is calculated based on how much buidl a holder uses to fill a liquidity pool, without any changes or dependency on the ETH or USDC values.</p>
                    </section>
                    <h2>The reward amount is fixed, and depends on the locking period selected</h2>
                    <section className="ExpPar"> 
                        <section className="ExpParBoxes">
                            <section className="ExpParBox">
                                <h5>3 Months</h5>
                                <p><b>571,500</b> Ethereum Blocks</p>
                                <h6>5%</h6>
                                <p><b>50 buidl reward every 1,000 buidl staked</b></p>
                            </section>
                            <section className="ExpParBox">
                                <h5>6 Months</h5>
                                <p><b>1,143,000</b> Ethereum Blocks</p>
                                <h6>20%</h6>
                                <p><b>200 buidl reward every 1,000 buidl staked</b></p>
                            </section>
                            <section className="ExpParBox">
                                <h5>9 Months</h5>
                                <p><b>1,714,500</b> Ethereum Blocks</p>
                                <h6>30%</h6>
                                <p><b>300 buidl reward every 1,000 buidl staked</b></p>
                            </section>
                            <section className="ExpParBox">
                                <h5>1 Year</h5>
                                <p><b>2,286,000</b> Ethereum Blocks</p>
                                <h6>50%</h6>
                                <p><b>500 buidl reward every 1,000 buidl staked</b></p>
                            </section>
                        </section>
                    </section>
                            <h2>The total reward of the staking position is divided and redeemable once a week!</h2>
                            <section className="ExpPar">    
                                <p>Every Week (47,625 Ethereum Blocks) Stakers can reedem a portion of the total reward, during the staking period.</p>
                                <p><b>Example:</b> If the total reward is 1,000 buidl over three months locking period, this means that the staker can redeem 83 (1,000/12) buidl every week.</p>
                            </section>
                            <section className="ExpPar">    
                                <p>Weekly earnings can be reedemed once a week or accumulative in less transations as the staker wants by claim the reward using the "Reedem" button.</p>
                                <p>Stakers can reedem the cumulative remained ammount of Reward even with the "Withdraw" transaction after the staking period.</p>
                            </section>
                        </section>
                    </section>
        );
    }
});