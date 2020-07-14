var Stake = React.createClass({
    requiredScripts: [
        'spa/loader.jsx',
        'spa/bigLoader.jsx'
    ],
    onTier(e) {
        $($(e.currentTarget).parent()).children('a').each(function() {
            $(this).removeClass('SelectedDutrationStake');
        });
        $(e.currentTarget).addClass("SelectedDutrationStake");
    },
    changeLogo(e) {
        this.logo.src = "assets/img/" + e.currentTarget.value.split("_")[1] + "-logo.png";
    },
    max() {
        this.props.balanceOf && (this.input.value = window.fromDecimals(this.props.balanceOf, 18));
    },
    render() {
        var _this = this;
        return (<section>
            <section className="switchBox">
                <h3>Stake buidl/eth Liquidity</h3>
                <section className="switchTools">
                    <a href="javascript:;" className="switchAll" onClick={this.max}>Max</a>
                    <input id="firstAmount" type="number"/>
                    <aside className="switchLink" target="_blank">buidl</aside>
                    <img src="assets/img/buidl-logo.png"/>
                </section>
                <section className="switchTools">
                    <a href="javascript:;" className="switchAll" onClick={this.max}>Max</a>
                    <input id="secondAmount" type="number" />
                    <select ref={ref => this.pool = ref} className="switchLink" target="_blank" onChange={this.changeLogo}>
                        <option value="0_eth" selected>eth</option>
                        <option value="1_usdc">usdc</option>
                    </select>
                    <img ref={ref => this.logo = ref} src="assets/img/eth-logo.png"/>
                </section>
                <h3>Duration</h3>
                <section className="switchTools">
                    <a data-tier="0" className="TimetoStake" href="javascript:;" onClick={this.onTier}>1 Month</a>
                    <a data-tier="1" className="TimetoStake SelectedDutrationStake" href="javascript:;" onClick={this.onTier}>3 Months</a>
                    <a data-tier="2" className="TimetoStake" href="javascript:;" onClick={this.onTier}>6 Months</a>
                    <a data-tier="3" className="TimetoStake" href="javascript:;" onClick={this.onTier}>1 Year</a>
                </section>
                <h3>Total Reward</h3>
                <section className="switchTools">
                    <span className="switchFinal">0</span>
                    <aside className="switchLink" >buidl</aside>
                    <img src="/assets/img/buidl-logo.png"></img>
                </section>
                <section className="switchActions">
                    {this.props.currentSlot && window.walletAddress && <a href="javascript:;" className={"switchAction" + (!this.props.approved ? " active" : "")} onClick={this.approve}>Approve</a>}
                    {this.props.currentSlot && window.walletAddress && <a href="javascript:;" className={"switchAction" + (this.props.approved ? " active" : "")} onClick={this.switch}>Stake</a>}
                    {this.props.currentSlot && !window.walletAddress && <a href="javascript:;" onClick={() => window.ethereum.enable().then(() => window.getAddress()).then(() => _this.emit('ethereum/ping'))} className="switchAction active">Connect</a>}
                </section>
                <p>By Staking $buidl you'll earn from the Uniswap V2 Trading fees + the Staking Reward, redemable after the selected locking period  </p>
                <p>Disclamer: Staking $buidl is an irreversible action, you'll be able to redeem your locked tokens only after the selected locking period. Do it at your own risk</p>
            </section>
        </section>);
    }
});