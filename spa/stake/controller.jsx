var StakeController = function (view) {
    var context = this;
    context.view = view;

    context.slippage = new UniswapFraction(window.context.slippageNumerator, window.context.slippageDenominator);

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

    context.max = async function max(target, i, tier) {
        var buidlBalance = await window.blockchainCall(window.buidlToken.methods.balanceOf, window.walletAddress);
        if(target === 'firstAmount') {
            var tierData = (await window.blockchainCall(window.stake.methods.getStakingInfo, tier))[1];
            parseInt(buidlBalance) > parseInt(tierData) && (buidlBalance = tierData);
        }
        buidlBalance = new UniswapFraction(buidlBalance, 1).divide(10 ** 18).toSignificant(6);
        var secondBalance = new UniswapFraction((await context.getSecondTokenData(i = i || 0)).balance, 1).divide(10 ** i === 1 ? 6 : 18).toSignificant(6);
        context.view[target].value = (target === 'firstAmount' ? buidlBalance : secondBalance);
        target === 'firstAmount' && context.calculateReward(tier);
        context.calculateOther(target, i, tier);
    };

    context.calculateOther = async function calculateOther(target, i, tier) {
        var reserves = await context.calculateReserves((await context.getSecondTokenData(i, true)).token, i);
        var value = reserves[target === 'firstAmount' ? 'secondPerBuidl' : 'buidlPerSecond'].multiply(window.toDecimals(context.view[target].value.split(',').join('') || '0', i === 1 ? 6 : 18));
        value = new UniswapFraction(value.toSignificant(100).split('.')[0]);
        var otherVal = value.divide(10 ** (target === 'firstAmount' && i == 1 ? 6 : 18)).toSignificant(6);
        context.view[target === 'firstAmount' ? 'secondAmount' : 'firstAmount'].value = window.formatMoney(otherVal, otherVal.split('.')[1] && otherVal.split('.')[1].length);
        target === "firstAmount" && context.calculateReward(tier);
        return value;
    };

    context.calculateReserves = async function calculateReserves(secondToken, i) {
        var pair = window.newContract(window.context.UniswapV2PairAbi, await window.blockchainCall(window.uniswapV2Factory.methods.getPair, window.buidlToken.options.address, secondToken.options.address));
        var buidlPosition  = (await window.blockchainCall(pair.methods.token0)).toLowerCase() === window.buidlToken.options.address.toLowerCase() ? 0 : 1;
        var otherPosition = buidlPosition == 0 ? 1 : 0;
        var reserves = await window.blockchainCall(pair.methods.getReserves);
        reserves[buidlPosition] = i === 0 ? reserves[buidlPosition] : new UniswapFraction(reserves[buidlPosition], 1).divide(10 ** 12).toSignificant(6);
        var buidlPerSecond = new UniswapFraction(reserves[buidlPosition], reserves[otherPosition]);
        var secondPerBuidl = new UniswapFraction(reserves[otherPosition], reserves[buidlPosition]);
        return {
            buidlPerSecond,
            secondPerBuidl
        };
    };

    context.calculateReward = function calculateReward(tier) {
        setTimeout(async function() {
            try {
                var tierData = await context.getTierData();
                tierData = [tierData[1][tier], tierData[2][tier], tierData[3][tier]];
                var value = window.web3.utils.toBN(window.toDecimals(context.view.firstAmount.value.split(',').join(''), 18)).mul(window.web3.utils.toBN(tierData[0])).div(window.web3.utils.toBN(tierData[1])).toString();
                context.view.reward.innerText = window.fromDecimals(value, 18);
                var splittedValue = window.web3.utils.toBN(value).div(window.web3.utils.toBN(tierData[2]));
                context.view.splittedReward.innerText = window.fromDecimals(splittedValue, 18);
            } catch(e) {
            }
        });
    };

    context.getSecondTokenData = async function getSecondTokenData(i, tokenOnly) {
        return {
            token : i == 0 ? window.wethToken : window.usdcToken,
            balance : tokenOnly === true ? '0' : await (i == 0 ? window.web3.eth.getBalance(window.walletAddress) : window.blockchainCall(window.usdcToken.methods.balanceOf, window.walletAddress))
        };
    };

    context.getTierData = async function getTierData() {
        try {
            if(!context.tierData) {
                context.tierData = await window.blockchainCall(window.stake.methods.tierData);
            }
            return JSON.parse(JSON.stringify(context.tierData));
        } catch(e) {
            return [];
        }
    };

    context.stake = async function stake(pool, tier) {
        context.view.setState({staked: null});
        var firstAmount = window.toDecimals(context.view.firstAmount.value.split(',').join(''), 18);
        var stakingInfo = await window.blockchainCall(window.stake.methods.getStakingInfo, tier);
        var buidlBalance = await window.blockchainCall(window.buidlToken.methods.balanceOf, window.walletAddress);
        if(parseInt(firstAmount) < parseInt(stakingInfo[0])) {
            return alert("Amount to stake is less than the current min cap");
        }
        if(parseInt(firstAmount) > parseInt(stakingInfo[2])) {
            return alert("Amount to stake must be less than the current remaining one");
        }
        if(parseInt(firstAmount) > parseInt(buidlBalance)) {
            return alert("You don't have enough buidl balance to stake!");
        }
        firstAmount = new UniswapFraction(firstAmount, 1);
        var secondAmount = await context.calculateOther('firstAmount', pool, tier);
        var firstAmountMin = firstAmount.subtract(firstAmount.multiply(context.slippage)).toSignificant(100).split('.')[0];
        var secondAmountMin = secondAmount.subtract(secondAmount.multiply(context.slippage)).toSignificant(100).split('.')[0];
        firstAmount = firstAmount.toSignificant(100).split('.')[0];
        secondAmount = secondAmount.toSignificant(100).split('.')[0];
        if(parseInt(secondAmount) > (await context.getSecondTokenData(pool)).balance) {
            return alert("You don't have enough " + (pool === 0 ? "eth" : "usdc") + " balance to stake!");
        }
        var eth = pool === 0 ? secondAmount : undefined;
        var value = pool === 0 ? '0' : secondAmount;
        try {
            await window.blockchainCall(eth, window.stake.methods.stake, tier, pool + '', firstAmount, firstAmountMin, value, secondAmountMin);
            context.view.setState({staked: {
                amount : context.view.firstAmount.value,
                period : tier === '0' ? "3 months" : tier === '1' ? "6 months" : tier === '2' ? "9 months" : "1 year"
            }});
        } catch(e) {
            alert(e.message || e);
        }
    };
};