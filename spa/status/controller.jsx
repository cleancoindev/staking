var StatusController = function (view) {
    var context = this;
    context.view = view;

    context.load = async function load() {
        var currentBlock = await window.web3.eth.getBlockNumber();
        var stakingPositions = [];
        for(var tier = 0; tier < context.view.props.stakingData.tiers.length; tier++) {
            var length = parseInt(await window.blockchainCall(context.view.props.stakingData.stakingManager.methods.length, tier));
            for(var i = 0; i < length; i++) {
                var rawStakingInfoData = await window.blockchainCall(context.view.props.stakingData.stakingManager.methods.stakeInfo, tier, i);
                if(window.walletAddress.toLowerCase() !== rawStakingInfoData[0].toLowerCase()) {
                    continue;
                }
                var stakingInfo = {
                    position: i,
                    tier,
                    sender : rawStakingInfoData[0],
                    poolPosition : rawStakingInfoData[1],
                    firstAmount : rawStakingInfoData[2],
                    secondAmount : rawStakingInfoData[3],
                    poolAmount : rawStakingInfoData[4],
                    reward : rawStakingInfoData[5],
                    endBlock : rawStakingInfoData[6],
                    partialRewardBlockTimes : rawStakingInfoData[7],
                    splittedReward : rawStakingInfoData[8],
                    cumulativeReward : '0'
                };
                stakingInfo.poolAmountFromDecimals = new UniswapFraction(stakingInfo.poolAmount, 1).divide(10 ** 18).toSignificant(6);
                stakingInfo.canWithdraw = currentBlock >= parseInt(stakingInfo.endBlock);
                for(var blockTime of stakingInfo.partialRewardBlockTimes) {
                    if(blockTime === '0') {
                        continue;
                    }
                    stakingInfo.nextPartialReward = stakingInfo.nextPartialReward || blockTime;
                    if(currentBlock < parseInt(blockTime)) {
                        continue;
                    }
                    stakingInfo.cumulativeReward = window.web3.utils.toBN(stakingInfo.cumulativeReward).add(window.web3.utils.toBN(stakingInfo.splittedReward)).toString();
                }
                stakingInfo.cumulativeReward = parseInt(stakingInfo.cumulativeReward) > parseInt(stakingInfo.reward) ? stakingInfo.reward : stakingInfo.cumulativeReward;
                stakingPositions.push(stakingInfo);
            }
        }
        context.view.setState({loadingPosition : false, stakingPositions});
    };

    context.redeem = async function redeem(e, tier, position) {
        e && e.preventDefault && e.preventDefault(true) && e.stopPropagation && e.stopPropagation(true);
        if($(e.currentTarget).hasClass('NoRedeem')) {
            return;
        }
        await window.blockchainCall(window.stakingManager.methods.partialReward, tier, position);
        context.load();
    }

    context.withdraw = async function withdraw(e, tier, position) {
        e && e.preventDefault && e.preventDefault(true) && e.stopPropagation && e.stopPropagation(true);
        if($(e.currentTarget).hasClass('NoRedeem')) {
            return;
        }
        await window.blockchainCall(window.stakingManager.methods.withdraw, tier, position);
        context.load();
    }
};