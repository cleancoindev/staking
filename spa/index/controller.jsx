var IndexController = function (view) {
    var context = this;
    context.view = view;

    context.updateWalletInfo = async function updateWalletInfo() {
        context.view.setState({
            walletData : !window.walletAddress ? null : {
                eth : window.fromDecimals(await window.web3.eth.getBalance(window.walletAddress), 18),
                buidl: window.fromDecimals(await window.blockchainCall(window.buidlToken.methods.balanceOf, window.walletAddress), 18),
                usdc: window.fromDecimals(await window.blockchainCall(window.usdcToken.methods.balanceOf, window.walletAddress), 6)
            }
        });
    };
};