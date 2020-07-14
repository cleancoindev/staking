var Status = React.createClass({
    requiredScripts: [
        'spa/loader.jsx',
        'spa/bigLoader.jsx'
    ],
    render() {
        return (<section>
            <section className="statusBox">
                <h2>Your Positions</h2>
                <section className="statusYou">
                    <section className="statusPosition">
                        <h3>{window.fromDecimals(this.props.oldVotingTokenSupply, 18)}</h3>
                        <h6 className="statusUni">&#129412; <a href="">Uniswap-V2</a></h6>
                        <h6><b>USDC-buidl</b></h6>
                    </section>
                    <section className="statusPosition">
                        <h4>for <b>1 Year</b></h4>
                        <h5><img src="/assets/img/buidl-logo.png"></img> <b>+ 3,330.9</b></h5>
                        <h6>Fixed Reward</h6>
                    </section>
                    <section className="statusPosition">
                        <h5><a target="_Bloank" href="https://etherscan.io/block/countdown/10462235">10462235</a></h5>
                        <h6>Lock End Block</h6>
                        <a className="NoRedeem">Redeem</a>
                    </section>
                </section>
            </section>
            <section className="statusBox">
                <h2>Liquidity Stake Status:</h2>
                <section className="statusAll">
                    <section className="statusTier">
                        <h3>1 Month</h3>
                        <h4 className="TierStaked"><b>3,500.00</b> <img src="/assets/img/buidl-logo.png"></img></h4>
                        <h6 className="TierStaked">Staked</h6>
                        <h4 className="TierFree"><b>27,500.00</b> <img src="/assets/img/buidl-logo.png"></img></h4>
                        <h6 className="TierFree">Available</h6>
                    </section>
                    <section className="statusTier">
                        <h3>3 Months</h3>
                        <h4 className="TierStaked"><b>3,500.00</b> <img src="/assets/img/buidl-logo.png"></img></h4>
                        <h6 className="TierStaked">Staked</h6>
                        <h4 className="TierFree"><b>27,500.00</b> <img src="/assets/img/buidl-logo.png"></img></h4>
                        <h6 className="TierFree">Available</h6>
                    </section>
                    <section className="statusTier">
                        <h3>6 Months</h3>
                        <h4 className="TierStaked"><b>3,500.00</b> <img src="/assets/img/buidl-logo.png"></img></h4>
                        <h6 className="TierStaked">Staked</h6>
                        <h4 className="TierFree"><b>27,500.00</b> <img src="/assets/img/buidl-logo.png"></img></h4>
                        <h6 className="TierFree">Available</h6>
                    </section>
                    <section className="statusTier">
                        <h3>1 Year</h3>
                        <h4 className="TierStaked"><b>3,500.00</b> <img src="/assets/img/buidl-logo.png"></img></h4>
                        <h6 className="TierStaked">Staked</h6>
                        <h4 className="TierFree"><b>27,500.00</b> <img src="/assets/img/buidl-logo.png"></img></h4>
                        <h6 className="TierFree">Available</h6>
                    </section>
                </section>
                <section className="statusBox">
                    <h2>Inflation Status:</h2>
                    <section className="statusAll">
                        <section className="statusTier">
                            <h4><b>3,500.00</b> <img src="/assets/img/buidl-logo.png"></img></h4>
                            <h6>&#127873; Total Rewards &#127873;</h6>
                        </section>
                        <section className="statusTier">
                            <h4><b>3,500.00</b> <img src="/assets/img/buidl-logo.png"></img></h4>
                            <h6>&#128293; Total Burned &#128293;</h6>
                        </section>
                    </section>
                </section>

            </section>
        </section>);
    }
});