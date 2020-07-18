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
    render() {
        var props = {};
        this.state && Object.entries(this.state).forEach(data => props[data[0]] = data[1]);
        return (
            <section className="OnePage">
                {/*<section className="DisclamerBanner">
                    <h1>Disclamer</h1>
                    <p>The Stake Manager will start working at the ETH Block n 10490000</p>
                    <a href="https://etherscan.io/block/countdown/10490000" target="_Blank">Coountdown</a>
                </section>*/}
                <header className="Head">
                    <section className="HBrand">
                        <h6><img src="/assets/img/buidl-logo.png"></img> &#129412; Liquidity Stake</h6>
                    <section className="HActions">
                        <a href="https://dfohub.com" target="_Blank">#dfohub</a>
                        <a href="https://github.com/b-u-i-d-l/staking" target="_Blank">#github</a>
                        <a href={window.getNetworkElement("etherscanURL") + "address/" + window.getNetworkElement("stakeAddress")} target="_blank">#etherscan</a>
                    </section>
                    <section className="WalletInfoBoxAll">
                        <section className="WalletInfoBox">
                            <section className="WalletInfoBoxTitle">
                                <h2>0x3453428057</h2>
                                <img src=""></img>
                            </section>
                            <section className="WalletInfoBoxBalances">
                                <img></img>
                                <p></p>
                            </section>
                            <section className="WalletInfoBoxBalances">
                                <img></img>
                                <p></p>
                            </section>
                            <section className="WalletInfoBoxBalances">
                                <img></img>
                                <p></p>
                            </section>
                        </section>
                    </section>
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