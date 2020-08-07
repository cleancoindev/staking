var IndexController = function (view) {
    var context = this;
    context.view = view;

    context.updateWalletInfo = async function updateWalletInfo() {
        if(window.walletAddress === null) {
            return context.view.setState({walletData : null});
        }
        var walletData = {
            ETH : {
                logo: 'assets/img/eth-logo.png',
                balance: window.fromDecimals(await window.web3.eth.getBalance(window.walletAddress), 18)
            }
        }
        walletData[window.token.symbol] = {
            logo : window.token.logo,
            balance : window.fromDecimals(await window.blockchainCall(window.token.token.methods.balanceOf, window.walletAddress), window.token.decimals)
        }
        for(var token of context.view.state.stakingData.pairs) {
            if(walletData[token.symbol]) {
                continue;
            }
            walletData[token.symbol] = {
                logo: token.logo,
                balance: window.fromDecimals(await window.blockchainCall(token.token.methods.balanceOf, window.walletAddress), token.decimals)
            }
        }
        context.view.setState({walletData});
    };

    context.loadStakingData = async function loadStakingData() {
        context.view.setState({ stakingData: null });
        var blockTiers = {};
        Object.keys(window.context.blockTiers).splice(2, Object.keys(window.context.blockTiers).length).forEach(it => blockTiers[it] = window.context.blockTiers[it]);
        var stakingData = await context.setStakingManagerData(window.stakingManager, blockTiers);
        context.view.setState({stakingData, blockTiers, element : window.token});
        context.updateWalletInfo();
    };

    context.setStakingManagerData = async function setStakingManagerData(stakingManager, blockTiers) {
        var stakingManagerData = {
            stakingManager,
            blockTiers
        };
        var rawTiers = await window.blockchainCall(stakingManager.methods.tierData);
        var pools = await window.blockchainCall(stakingManager.methods.tokens);
        stakingManagerData.startBlock = await window.blockchainCall(stakingManager.methods.startBlock);
        var pairs = await window.loadTokenInfos(pools, window.wethAddress);
        for (var i in pairs) {
            pairs[i].amount = await window.blockchainCall(stakingManager.methods.totalPoolAmount, i);
        }
        var tiers = [];
        for (var i = 0; i < rawTiers[0].length; i++) {
            var tier = {
                blockNumber: rawTiers[0][i],
                percentage: 100 * parseFloat(rawTiers[1][i]) / parseFloat(rawTiers[2][i]),
                rewardSplitTranche: rawTiers[3][i],
                time: window.calculateTimeTier(rawTiers[0][i]),
                tierKey: window.getTierKey(rawTiers[0][i])
            };
            var stakingInfo = await window.blockchainCall(stakingManager.methods.getStakingInfo, i);
            tier.minCap = stakingInfo[0];
            tier.hardCap = stakingInfo[1];
            tier.remainingToStake = stakingInfo[2];
            tier.staked = window.web3.utils.toBN(tier.hardCap).sub(window.web3.utils.toBN(tier.remainingToStake)).toString()
            tiers.push(tier);
        }
        stakingManagerData.pairs = pairs;
        stakingManagerData.tiers = tiers;
        return stakingManagerData;
    };
};