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
            element: "Info"
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
    changeView(element) {
        var _this = this;
        this.domRoot.children().find('a').removeClass("selected").each((i, it) => {
            if(it.innerHTML.toLowerCase() === element.toLowerCase()) {
                return $(it).addClass('selected');
            }
        });
        ReactModuleLoader.load({
            modules : [
                'spa/' + element.toLowerCase()
            ],
            callback: function() {
                _this.setState({element});
            }
        });
    },
    componentDidMount() {
        this.controller.updateWalletInfo();
    },
    render() {
        var props = {};
        this.state && Object.entries(this.state).forEach(data => props[data[0]] = data[1]);
        return (
            <section className="OnePage">
                {/*<section className="DisclamerBanner">
                    <h1>Disclamer</h1>
                    <p>The Liquidity Stake Manager will start working at the ETH Block n 10497000</p>
                    <a href="https://etherscan.io/block/countdown/10497000" target="_Blank">Countdown</a>
                </section>*/}
                <header className="Head">
                    <section className="HBrand">
                        <h6><img src="/assets/img/buidl-logo.png"></img> &#129412; Liquidity Stake</h6>
                    <section className="HActions">
                        <a href="https://dfohub.com" target="_Blank">#dfohub</a>
                        <a href="https://github.com/b-u-i-d-l/staking" target="_Blank">#github</a>
                        <a href={window.getNetworkElement("etherscanURL") + "address/" + window.getNetworkElement("stakeAddress")} target="_blank">#etherscan</a>
                    </section>
                    {this.state && this.state.walletData && <section className="WalletInfoBoxAll">
                        <section className="WalletInfoBox">
                            <section className="WalletInfoBoxTitle">
                                <img src={window.makeBlockie(window.walletAddress)}></img>
                                <h2><a href={window.getNetworkElement('etherscanURL') + 'address/' + window.walletAddress} target="_blank">{window.shortenWord(window.walletAddress, 15)}</a></h2>
                            </section>
                            {Object.keys(this.state.walletData).map(key => <section key={key} className="WalletInfoBoxBalances">
                                <img src={"assets/img/" + key + "-logo.png"}/>
                                <p>{this.state.walletData[key]}</p>
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
                    {React.createElement(window[this.state.element], props)}
            </section>
        );
    }
});