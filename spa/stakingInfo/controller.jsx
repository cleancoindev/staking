var StakingInfoController = function (view) {
    var context = this;
    context.view = view;

    context.load = async function load(view, tier) {
        view.setState({loading : true});
        var stakingInfo = await window.blockchainCall(window.stakingManager.methods.getStakingInfo, tier);
        view.setState({
            loading : false,
            staked : window.web3.utils.toBN(stakingInfo[1]).sub(window.web3.utils.toBN(stakingInfo[2])).toString(),
            available : stakingInfo[2]
        });
    };
};