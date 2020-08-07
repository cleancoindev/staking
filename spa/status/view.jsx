var Status = React.createClass({
    requiredScripts: [
        'spa/loader.jsx',
        'spa/bigLoader.jsx'
    ],
    requiredModules: [
        'spa/stakingInfo'
    ],
    componentDidMount() {
        this.load();
    },
    componentDidUpdate() {
        this.load();
    },
    load() {
        window.walletAddress && !this.alreadyDone && this.controller.load();
        this.alreadyDone = true;
    },
    render() {
        if(!this.props.stakingData) {
            return (<Loader/>);
        }
        var _this = this;
        return (<section>
            <section className="statusBox">
                <h2>Your Positions</h2>
                {!window.walletAddress && <a href="javascript:;" onClick={() => window.ethereum.enable().then(() => window.getAddress()).then(() => _this.emit('ethereum/ping')).then(_this.controller.load)} className="switchAction active">Connect your Wallet</a>}
                {window.walletAddress && (!this.state || this.state.loadingPosition) && <Loader />}
                {window.walletAddress && (!this.state || !this.state.loadingPosition) && this.state && this.state.stakingPositions && this.state.stakingPositions.map(it => <section className="statusYou">
                    <section className="statusPosition">
                        <h3>{it.poolAmountFromDecimals}</h3>
                        <h6 className="statusUni">&#129412; <a href={window.getNetworkElement("etherscanURL") + "token/" + it.poolAddress} target="_blank">Uniswap-V2</a></h6>
                        <h6><b>{it.poolPosition === '0' ? "ETH" : "USDC"}-buidl</b></h6>
                    </section>
                    <section className="statusPosition">
                        <h5>{window.fromDecimals(it.reward, 18)} <img src="/assets/img/buidl-logo.png"></img></h5>
                        <h6>Locked Reward</h6>
                        <h5><b>{window.fromDecimals(it.cumulativeReward, 18)}</b> <img src="/assets/img/buidl-logo.png"></img></h5>
                        <h6>&#127873; Redeemable</h6>
                        <a className={it.cumulativeReward !== '0' && !it.canWithdraw ? "ActiveRedeem" : "NoRedeem"} href="javascript:;" onClick={e => this.controller.redeem(e, it.tier, it.position)}>Redeem</a>
                    </section>
                    <section className="statusPosition">
                        <h4>for <b>{it.tier === 0 ? "3 Months" : it.tier === 1 ? "6 Months" : it.tier === 2 ? "9 Months" : "1 Year"}</b></h4>
                        <h5>&#9203; <a target="_Bloank" href={window.getNetworkElement("etherscanURL") + "block/countdown/" + it.endBlock}>{it.endBlock}</a></h5>
                        <h6>Position End Block</h6>
                        <a className={it.canWithdraw ? "ActiveRedeem" : "NoRedeem"} href="javascript:;" onClick={e => this.controller.withdraw(e, it.tier, it.position)}>Withdraw Position</a>
                    </section>
                </section>)}
                {(!this.state || !this.state.loadingPosition) && this.state && this.state.stakingPositions && this.state.stakingPositions.length === 0 && <h3>There are no opened staking positions for you right now</h3>}
            </section>
            <section className="statusBox">
                <h2>&#129385; Status:</h2>
                <section className="statusAll">
                    {this.props.stakingData.tiers.map((it, i) => <StakingInfo tier={i} title={it.tierKey} stake={_this.props.stakingData.stakingManager} element={_this.props.element} />)}
                </section>
            </section>
        </section>);
    }
});