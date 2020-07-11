var Status = React.createClass({
    requiredScripts: [
        'spa/loader.jsx',
        'spa/bigLoader.jsx'
    ],
    render() {
        return (<section>
            <section className="statusBox">
                <h2>Flippening Watch</h2>
                <section className="statusTitle">
                    <section className="statusFlip">
                        <img src="/assets/img/buidl-logo.png"></img>
                        <a>$BUIDL V1</a>
                        <h3>{window.fromDecimals(this.props.oldVotingTokenSupply, 18)}</h3>
                        <h6>Circulating Supply</h6>
                    </section>
                    <section className="statusFlip">
                        <img src="/assets/img/buidlv2-logo.png"></img>
                        <a>$buidl V2</a>
                        <h3>{window.fromDecimals(this.props.newVotingTokenSupply, 18)}</h3>
                        <h6>Circulating Supply</h6>
                    </section>
                </section>
            </section>
            <section className="statusBox">
                <h2>Switch Status:</h2>
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