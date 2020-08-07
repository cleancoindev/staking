var Index = React.createClass({
    requiredModules: [
        "spa/info"
    ],
    requiredScripts: [
        'spa/bigLoader.jsx',
        'spa/loader.jsx'
    ],
    getInitialState() {
        return {
            view: "Info"
        };
    },
    getDefaultSubscriptions() {
        return {
            'ethereum/ping' : this.controller.updateWalletInfo,
            'view/change' : this.changeView
        }
    },
    onClick(e) {
        e && e.preventDefault && e.preventDefault(true) && e.stopPropagation && e.stopPropagation(true);
        this.changeView(e.currentTarget.innerHTML);
    },
    changeView(view) {
        var _this = this;
        this.domRoot.children().find('a').removeClass("selected").each((i, it) => {
            if(it.innerHTML.toLowerCase() === view.toLowerCase()) {
                return $(it).addClass('selected');
            }
        });
        ReactModuleLoader.load({
            modules : [
                'spa/' + view.toLowerCase()
            ],
            callback: function() {
                _this.setState({view});
            }
        });
    },
    componentDidMount() {
        this.controller.loadStakingData();
    },
    render() {
        var props = {};
        this.props && Object.entries(this.props).forEach(entry => props[entry[0]] = entry[1]);
        this.state && Object.entries(this.state).forEach(entry => props[entry[0]] = entry[1]);
        props.props && Object.entries(props.props).forEach(entry => props[entry[0]] = entry[1]);
        delete props.props;
        return (
            <section className="OnePage">
                {/*<section className="DisclamerBanner">
                    <h1>Disclamer</h1>
                    <p>The Liquidity Stake Manager will start working at the ETH Block n 10497000</p>
                    <a href="https://etherscan.io/block/countdown/10497000" target="_Blank">Countdown</a>
                </section>*/}
                <header className="Head">
                    <section className="HBrand">
                        <h6><img src={window.token.logo}></img> &#129412; Liquidity Stake</h6>
                    <section className="HActions">
                        <a href={window.dfo.ens} target="_Blank">#{window.dfo.name}</a>
                        <a href={window.context.gitHubURL} target="_blank">#github</a>
                        <a href={window.getNetworkElement("etherscanURL") + "address/" + window.getNetworkElement("stakeAddress")} target="_blank">#etherscan</a>
                    </section>
                    {this.state && this.state.walletData && <section className="WalletInfoBoxAll">
                        <section className="WalletInfoBox">
                            <section className="WalletInfoBoxTitle">
                                <img src={window.makeBlockie(window.walletAddress)}></img>
                                <h2><a href={window.getNetworkElement('etherscanURL') + 'address/' + window.walletAddress} target="_blank">{window.shortenWord(window.walletAddress, 15)}</a></h2>
                            </section>
                            {Object.keys(this.state.walletData).map(key => <section key={key} className="WalletInfoBoxBalances">
                                <img src={this.state.walletData[key].logo}/>
                                <p>{this.state.walletData[key].balance}{'\u00a0'}{key}</p>
                            </section>)}
                        </section>
                    </section>}
                    </section>
                </header>
                <section className="PagerMenu">
                    <ul className="Menu">
                        <a href="javascript:;" className="InfoOpener selected" onClick={this.onClick}>Info</a>
                        <a href="javascript:;" className="SwitchOpener" onClick={this.onClick}>Stake</a>
                        <a href="javascript:;" className="StakeOpener" onClick={this.onClick}>Status</a>
                    </ul>
                </section>
                    {React.createElement(window[this.state.view], props)}
            </section>
        );
    }
});