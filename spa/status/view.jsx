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
                {this.props && this.props.currentBlock < this.props.startBlock && [<h3>Start Block: <a href={window.getNetworkElement("etherscanURL") + "block/" + this.props.startBlock} target="_blank">{this.props.startBlock}</a></h3>,<br/>]}
                <ul>
                    {this.props.slots && this.props.slots.map((it, i) => <li key={i}>
                        <h1>x {window.numberToString(parseInt(it[1]) / parseInt(it[2]))}</h1>
                        <h5>End Block: <a href={window.getNetworkElement("etherscanURL") + "block/" + it[0]} target="_blank">{it[0]}</a></h5>
                        <h5>Status: {'\u00a0'} <a className={this.props.slots.indexOf(this.props.currentSlot) === i ? "Active" : this.props.currentBlock < this.props.startBlock || (this.props.currentSlot && this.props.slots.indexOf(this.props.currentSlot) < i) ? "Next" : "Ended"}>{this.props.slots.indexOf(this.props.currentSlot) === i ? "Active" : this.props.currentBlock < this.props.startBlock || (this.props.currentSlot && this.props.slots.indexOf(this.props.currentSlot) < i) ? "Next" : "Ended"}</a></h5>
                    </li>)}
                </ul>
            </section>
        </section>);
    }
});