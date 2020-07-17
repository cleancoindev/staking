var StakeController = function (view) {
    var context = this;
    context.view = view;

    context.slippage = new UniswapFraction(window.context.slippageNumerator, window.context.slippageDenominator);
    context.currencyBase = new UniswapCurrency(0, "BASE", "Base");
    context.currencyBuidl = new UniswapCurrency(18, "buidl", "dfohub");
    context.currencyUsdc = new UniswapCurrency(6, "USDC", "USD Coin");

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
        var buidlReserve = reserves[buidlPosition];
        var secondReserve = reserves[otherPosition];
        var budilPerSecond = new UniswapFraction(reserves[buidlPosition], reserves[otherPosition]);
        return {
            budilPerSecond,
            secondPerBuidl : budilPerSecond.invert(),
            buidlReserve,
            secondReserve
        };
    };

    context.max = async function max(target, i, tier) {
        var buidlBalance = await window.blockchainCall(window.buidlToken.methods.balanceOf, window.walletAddress);
        if(target === 'firstAmount') {
            var tierData = (await window.blockchainCall(window.stake.methods.getStakingInfo, tier))[1];
            parseInt(buidlBalance) > parseInt(tierData) && (buidlBalance = tierData);
        }
        buidlBalance = new UniswapPrice(context.currencyBase, context.currencyBuidl, 1, buidlBalance);
        var secondBalance = new UniswapPrice(context.currencyBase, i === '0' ? UniswapCurrency.ETHER : context.currencyUsdc, 1, (await context.getSecondTokenData(i = i || 0)).balance);
        context.view[target].value = (target === 'firstAmount' ? buidlBalance : secondBalance).toSignificant(6);
        target === 'firstAmount' && context.calculateReward(tier);
        context.calculateOther(target, i, tier);
    };

    context.calculateOther = async function calculateOther(target, i, tier) {
        var reserves = await context.calculateReserves((await context.getSecondTokenData(i, true)).token);
        var value = new UniswapPrice(context.currencyBase, target === 'secondAmount' && i === '1' ? context.currencyUsdc : UniswapCurrency.ETHER, 1, context.view[target].value.split(',').join('') || '0');
        value = value.raw.multiply(reserves[target === 'firstAmount' ? 'secondPerBuidl' : 'budilPerSecond']);
        value = new UniswapPrice(context.currencyBase, target === 'secondAmount' || i === '0' ? UniswapCurrency.ETHER : context.currencyUsdc, value.denominator, value.numerator);
        context.view[target === 'firstAmount' ? 'secondAmount' : 'firstAmount'].value = value.raw.toSignificant(6);
        context.calculateReward(tier);
        value = new UniswapPrice(context.currencyBase, target === 'secondAmount' && i === '1' ? context.currencyUsdc : UniswapCurrency.ETHER, 1, window.toDecimals(context.view[target].value.split(',').join('') || '0',  target === 'secondAmount' && i === '1' ? 6 : 18));
        value = value.raw.multiply(reserves[target === 'firstAmount' ? 'secondPerBuidl' : 'budilPerSecond']);
        value = new UniswapPrice(context.currencyBase, target === 'secondAmount' || i === '0' ? UniswapCurrency.ETHER : context.currencyUsdc, value.denominator, value.numerator);
        return value;
    };

    context.calculateReward = async function calculateReward(tier) {
        var tierData = await context.getTierData();
        tierData = [tierData[1][tier], tierData[2][tier], tierData[3][tier]];
        var value = window.web3.utils.toBN(window.toDecimals(context.view.firstAmount.value.split(',').join(''), 18)).mul(window.web3.utils.toBN(tierData[0])).div(window.web3.utils.toBN(tierData[1])).toString();
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
        var firstAmount = parseInt(window.toDecimals(context.view.firstAmount.value.split(',').join(''), 18));
        var stakingInfo = await window.blockchainCall(window.stake.methods.getStakingInfo, tier);
        if(firstAmount < parseInt(stakingInfo[0])) {
            return alert("Amount to stake is less than the current min cap");
        }
        if(firstAmount > parseInt(stakingInfo[2])) {
            return alert("Amount to stake must be less than the current remaining one");
        }
        firstAmount = new UniswapPrice(context.currencyBase, context.currencyBuidl, 1, window.toDecimals(context.view.firstAmount.value.split(',').join(''), 18));
        var secondAmount = await context.calculateOther('firstAmount', pool + '', tier);
        var firstAmountMin = firstAmount.raw.subtract(firstAmount.raw.multiply(context.firstSlippage)).toSignificant(100).split('.')[0];
        var secondAmountMin = secondAmount.raw.subtract(secondAmount.raw.multiply(context.secondSlippage)).toSignificant(100).split('.')[0];
        firstAmount = firstAmount.raw.toSignificant(100).split('.')[0];
        secondAmount = secondAmount.raw.toSignificant(100).split('.')[0];
        var eth = pool === 0 ? secondAmount : undefined;
        var value = pool === 0 ? '0' : secondAmount;
        try {
            await window.blockchainCall(eth, window.stake.methods.stake, tier, pool + '', firstAmount, firstAmountMin, value, secondAmountMin);
        } catch(e) {
            alert(e.message || e);
        }
    };
};