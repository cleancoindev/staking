var Stake = React.createClass({
    requiredScripts: [
        'spa/loader.jsx',
        'spa/bigLoader.jsx'
    ],
    getDefaultSubscriptions() {
        return {
            'ethereum/ping' : this.refreshData
        };
    },
    getInitialState() {
        return {
            approveFirst : true,
            approveSecond : true
        }
    },
    onTier(e) {
        $($(e.currentTarget).parent()).children('a').each(function() {
            $(this).removeClass('SelectedDutrationStake');
        });
        $(e.currentTarget).addClass("SelectedDutrationStake");
        this.controller.calculateReward(parseInt(e.currentTarget.dataset.tier));
    },
    changeSecond(e) {
        var split = e.currentTarget.value.split("_");
        this.logo.src = "assets/img/" + split[1] + "-logo.png";
        this.controller.calculateOther("firstAmount", parseInt(this.pool.value.split('_')[0]), this.domRoot.children().find('.TimetoStake.SelectedDutrationStake')[0].dataset.tier);
        this.controller.calculateApprove(parseInt(this.pool.value.split('_')[0]));
    },
    max(e) {
        this.refreshData(e.currentTarget.dataset.target);
    },
    componentDidMount() {
        this.refreshData();
    },
    refreshData(target) {
        this.controller.max(target !== 'firstAmount' && target !== 'secondAmount' ? 'firstAmount' : target, parseInt(this.pool.value.split('_')[0]), this.domRoot.children().find('.TimetoStake.SelectedDutrationStake')[0].dataset.tier);
        this.controller.calculateApprove(parseInt(this.pool.value.split('_')[0]));
    },
    onChangeAmount(e) {
        this.controller.calculateOther(e.currentTarget.dataset.target, parseInt(this.pool.value.split('_')[0]), this.domRoot.children().find('.TimetoStake.SelectedDutrationStake')[0].dataset.tier);
        e.currentTarget.dataset.target === "firstAmount" && this.controller.calculateReward(parseInt(this.domRoot.children().find('.TimetoStake.SelectedDutrationStake')[0].dataset.tier));
    },
    approve(e) {
        if(!$(e.currentTarget).hasClass('active')) {
            return;
        }
        this.controller.approve(e.currentTarget.dataset.target);
    },
    stake(e) {
        if(!$(e.currentTarget).hasClass('active')) {
            return;
        }
        this.controller.stake(parseInt(this.pool.value.split('_')[0]), this.domRoot.children().find('.TimetoStake.SelectedDutrationStake')[0].dataset.tier);
    },
    render() {
        var _this = this;
        return (<section>
            <section className="switchBox">
                <h3>&#129412; + &#9203; = &#127873;</h3>
                <section className="switchTools">
                    <a data-target="firstAmount" href="javascript:;" className="switchAll" onClick={this.max}>Max</a>
                    <input ref={ref => this.firstAmount = ref} type="number" data-target="firstAmount" onChange={this.onChangeAmount}/>
                    <aside className="switchLink" target="_blank">buidl</aside>
                    <img src="assets/img/buidl-logo.png"/>
                </section>
                <section className="switchTools switchTools2">
                    {false && <a data-target="secondAmount" href="javascript:;" className="switchAll" onClick={this.max}>Max</a>}
                    <input ref={ref => this.secondAmount = ref} type="number" data-target="secondAmount" onChange={this.onChangeAmount}/>
                    <select ref={ref => this.pool = ref} className="switchLink" target="_blank" onChange={this.changeSecond}>
                        <option value="0_eth" selected>eth</option>
                        <option value="1_usdc">usdc</option>
                    </select>
                    <img ref={ref => this.logo = ref} src="assets/img/eth-logo.png"/>
                </section>
                <h3>&#9203; Duration</h3>
                <section className="switchTools">
                    <a data-tier="0" className="TimetoStake" href="javascript:;" onClick={this.onTier}>3 Month</a>
                    <a data-tier="1" className="TimetoStake SelectedDutrationStake" href="javascript:;" onClick={this.onTier}>6 Months</a>
                    <a data-tier="2" className="TimetoStake" href="javascript:;" onClick={this.onTier}>9 Months</a>
                    <a data-tier="3" className="TimetoStake" href="javascript:;" onClick={this.onTier}>1 Year</a>
                </section>
                <h3>&#127873; Total Reward</h3>
                <section className="switchTools">
                    <span ref={ref => this.reward = ref} className="switchFinal">0</span>
                    <aside className="switchLink" >buidl</aside>
                    <img src="/assets/img/buidl-logo.png"></img>
                </section>
                <h3 className="switchWeek">Weekly</h3>
                <section className="switchTools switchToolsWeek">
                    <span ref={ref => this.splittedReward = ref} className="switchFinal">0</span>
                    <aside className="switchLink" >buidl</aside>
                    <img src="/assets/img/buidl-logo.png"></img>
                </section>
                <section className="switchActions">
                    {window.walletAddress && (this.state.approveFirst || !this.state.approveSecond) && <a data-target="buidl" href="javascript:;" className={"switchAction" + (this.state.approveFirst ? " active" : "")} onClick={this.approve}>Approve buidl</a>}
                    {window.walletAddress && !this.state.approveFirst && this.state.approveSecond && <a data-target="usdc" href="javascript:;" className="switchAction active" onClick={this.approve}>Approve usdc</a>}
                    {window.walletAddress && <a href="javascript:;" className={"switchAction" + (!this.state.approveFirst && !this.state.approveSecond ? " active" : "")} onClick={this.stake}>Stake</a>}
                    {!window.walletAddress && <a href="javascript:;" onClick={() => window.ethereum.enable().then(() => window.getAddress()).then(() => _this.emit('ethereum/ping'))} className="switchAction active">Connect</a>}
                </section>
                <p>By Staking $buidl you'll earn from the Uniswap V2 Trading fees + the Staking Reward, redemable after the selected locking period  </p>
                <p>Disclamer: Staking $buidl is an irreversible action, you'll be able to redeem your locked tokens only after the selected locking period. Do it at your own risk</p>
            </section>
        </section>);
    }
});