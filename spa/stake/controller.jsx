var StakeController = function (view) {
    var context = this;
    context.view = view;

    context.calculateApprove = async function calculateApprove(i) {
        var buidlBalance = parseInt(await window.blockchainCall(window.buidlToken.methods.balanceOf, window.walletAddress));
        var buidlAllowance = parseInt(await window.blockchainCall(window.buidlToken.methods.allowance, window.walletAddress, window.stake.options.address));
        var approveFirst = buidlAllowance === 0 || buidlAllowance < buidlBalance;
        var approveSecond = false;
        if(i !== 0) {
            var secondBalance =  parseInt((await context.getSecondTokenData(i)).balance);
            var secondAllowance = parseInt(await window.blockchainCall(window.usdcToken.methods.allowance, window.walletAddress, window.stake.options.address));
            approveSecond = secondAllowance === 0 || secondAllowance < secondBalance;
        }
        context.view.setState({approveFirst, approveSecond});
    };

    context.approve = async function approve(target) {
        var token = window[target + 'Token'];
        await window.blockchainCall(token.methods.approve, window.stake.options.address, await window.blockchainCall(token.methods.totalSupply));
        context.calculateApprove(parseInt(context.view.pool.value.split('_')[0]));
    };

    context.calculateReserves = async function calculate(secondToken) {
        var pair = window.newContract(window.context.UniswapV2PairAbi, await window.blockchainCall(window.uniswapV2Factory.methods.getPair, window.buidlToken.options.address, secondToken.options.address));
        var buidlPosition  = (await window.blockchainCall(pair.methods.token0)).toLowerCase() === window.buidlToken.options.address.toLowerCase() ? 0 : 1;
        var otherPosition = buidlPosition == 0 ? 1 : 0;
        var reserves = await window.blockchainCall(pair.methods.getReserves);
        reserves[0] = parseFloat(window.fromDecimals(reserves[0], buidlPosition === 0 || secondToken.options.address.toLowerCase() === window.wethToken.options.address.toLowerCase() ? 18 : 6, true));
        reserves[1] = parseFloat(window.fromDecimals(reserves[1], buidlPosition === 1 || secondToken.options.address.toLowerCase() === window.wethToken.options.address.toLowerCase() ? 18 : 6, true));
        var budilPerSecond = reserves[buidlPosition] / reserves[otherPosition];
        var secondPerBuidl = reserves[otherPosition] / reserves[buidlPosition];
        return {
            budilPerSecond,
            secondPerBuidl
        };
    };

    context.max = async function max(target, i, tier) {
        var buidlBalance = parseInt(await window.blockchainCall(window.buidlToken.methods.balanceOf, window.walletAddress));
        if(target === 'firstAmount') {
            var tierData = parseInt((await window.blockchainCall(window.stake.methods.getStakingInfo, tier))[1]);
            buidlBalance = buidlBalance > tierData ? tierData : buidlBalance;
        }
        buidlBalance = parseFloat(window.fromDecimals(buidlBalance, 18, true));
        var secondTokenData = await context.getSecondTokenData(i = i || 0);
        var secondBalance =  parseFloat(window.fromDecimals(secondTokenData.balance, i === 0 ? 18 : 6, true));
        var budilDecurtation = parseFloat(window.fromDecimals('1', 18));
        var secondDecurtation = parseFloat(window.fromDecimals('1', i === 0 ? 18 : 6));
        target === 'firstAmount' && (buidlBalance = buidlBalance - (buidlBalance * budilDecurtation));
        target === 'secondAmount' && (secondBalance = secondBalance - (secondBalance * secondDecurtation));
        context.view[target].value = parseFloat(window.formatMoney(target === 'firstAmount' ? buidlBalance : secondBalance, window.context.uiDecimals, ''));
        target === 'firstAmount' && context.calculateReward(tier);
        context.calculateOther(target, i, tier);
    };

    context.calculateOther = async function calculateOther(target, i, tier) {
        var reserves = await context.calculateReserves((await context.getSecondTokenData(i, true)).token);
        var value = parseFloat(context.view[target].value || '0');
        value *= reserves[target === 'firstAmount' ? 'secondPerBuidl' : 'buidlPerSecond'];
        context.view[target === 'firstAmount' ? 'secondAmount' : 'firstAmount'].value = window.formatMoney(value, target === 'firstAmount' && i == 1 ? 6 : 18, '');
        context.calculateReward(tier);
    };

    context.calculateReward = async function calculateReward(tier) {
        var tierData = await context.getTierData();
        tierData = [tierData[1][tier], tierData[2][tier], window.context.rewardSplitTranches[tier]];
        var value = window.web3.utils.toBN(window.toDecimals(context.view.firstAmount.value, 18)).mul(window.web3.utils.toBN(tierData[0])).div(window.web3.utils.toBN(tierData[1])).toString();
        context.view.reward.innerText = window.fromDecimals(value, 18);
        var splittedValue = window.web3.utils.toBN(value).div(window.web3.utils.toBN(tierData[2]));
        context.view.splittedReward.innerText = window.fromDecimals(splittedValue, 18);
    };

    context.getSecondTokenData = async function getSecondTokenData(i, tokenOnly) {
        return {
            token : i == 0 ? window.wethToken : window.usdcToken,
            balance : tokenOnly === true ? '0' : await (i == 0 ? window.web3.eth.getBalance(window.walletAddress) : window.blockchainCall(window.usdcToken.methods.balanceOf, window.walletAddress))
        };
    };

    context.getTierData = async function getTierData() {
        if(!context.tierData) {
            context.tierData = await window.blockchainCall(window.stake.methods.tierData);
        }
        return JSON.parse(JSON.stringify(context.tierData));
    };

    context.stake = async function stake(pool, tier) {
        var firstAmount = window.toDecimals(context.view.firstAmount.value, 18);
        var stakingInfo = await window.blockchainCall(window.stake.methods.getStakingInfo, tier);
        if(parseInt(firstAmount) < parseInt(stakingInfo[0])) {
            return alert("Amount to stake is less than the current min cap");
        }
        if(parseInt(firstAmount) > parseInt(stakingInfo[2])) {
            return alert("Amount to stake must be less than the current remaining one");
        }
        var secondAmount = window.toDecimals(context.view.secondAmount.value, pool === 0 ? 18 : 6);
        var eth = pool === 0 ? secondAmount : undefined;
        var value = pool === 0 ? '0' : secondAmount;
        try {
            await window.blockchainCall(eth, window.stake.methods.stake, tier, pool + '', firstAmount, value);
        } catch(e) {
            alert(e.message || e);
        }
    };
};