var Stake = React.createClass({
    requiredScripts: [
        'spa/loader.jsx',
        'spa/bigLoader.jsx'
    ],
    max() {
        this.props.balanceOf && (this.input.value = window.fromDecimals(this.props.balanceOf, 18));
        this.onChange();
    },
    approve(e) {
        e && e.preventDefault && e.preventDefault(true) && e.stopPropagation && e.stopPropagation(true);
        if(e.currentTarget.className.indexOf("active") === -1) {
            return;
        }
        this.controller.approve();
    },
    switch(e) {
        e && e.preventDefault && e.preventDefault(true) && e.stopPropagation && e.stopPropagation(true);
        if(e.currentTarget.className.indexOf("active") === -1) {
            return;
        }
        this.controller.switchOperation(this.input.value);
    },
    onChange() {
        if(!this.input || !this.switchFinal) {
            return;
        }
        this.switchFinal.innerHTML = '0';
        var value = this.input.value;
        if(isNaN(parseInt(value))) {
            return;
        }
        if(!this.props.currentSlot) {
            return;
        }
        value = window.toDecimals(value, 18);
        value = window.web3.utils.toBN(value).mul(window.web3.utils.toBN(this.props.currentSlot[1])).div(window.web3.utils.toBN(this.props.currentSlot[2]));
        this.switchFinal.innerHTML = window.fromDecimals(value, 18);
    },
    render() {
        var _this = this;
        return (<section>
            <section className="switchBox">
                <h3>Stake buidl/eth Liquidity</h3>
                <section className="switchTools">
                    <a href="javascript:;" className="switchAll" onClick={this.max}>Max</a>
                    <input type="number" ref={ref => (this.input = ref) && (ref.value = window.fromDecimals(this.props.balanceOf, 18)) && this.onChange()} onChange={this.onChange}/>
                    <aside className="switchLink" target="_blank">buidl</aside>
                    <img src="/assets/img/buidl-logo.png"></img>
                </section>
                <section className="switchTools">
                    <a href="javascript:;" className="switchAll" onClick={this.max}>Max</a>
                    <input type="number" ref={ref => (this.input = ref) && (ref.value = window.fromDecimals(this.props.balanceOf, 18)) && this.onChange()} onChange={this.onChange}/>
                    <select className="switchLink" target="_blank">
                        <option value="eth">eth</option>
                        <option value="usdc">usdc</option>
                    </select>
                    <img src="/assets/img/eth-logo.png"></img>
                </section>
                <h3>Duration</h3>
                <section className="switchTools">
                    <a className="TimetoStake" href="javascript:;">1 Month</a>
                    <a className="TimetoStake SelectedDutrationStake" href="javascript:;">3 Months</a>
                    <a className="TimetoStake" href="javascript:;">6 Months</a>
                    <a className="TimetoStake" href="javascript:;">1 Year</a>
                </section>
                <h3>Total Reward</h3>
                <section className="switchTools">
                    <span ref={ref => (this.switchFinal = ref) && this.onChange()} className="switchFinal">0</span>
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