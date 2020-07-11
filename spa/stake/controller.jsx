var StakeController = function (view) {
    var context = this;
    context.view = view;

    context.switchOperation = async function switchOperation(value) {
        if(isNaN(parseInt(value)) || parseInt(value) < 1) {
            return alert("Please, insert an amount greater than zero");
        }
        value = window.toDecimals(value, 18);
        if(value > context.view.props.balanceOf) {
            return alert("Inserted value is greater than your actual balance");
        }
        try {
            await window.blockchainCall(window.vasaPowerSwitch.methods.vasaPowerSwitch, value);
            context.view.emit('ethereum/ping');
        } catch(e) {
            return alert(e.message || e);
        }
    };

    context.approve = async function approve() {
        await window.blockchainCall(window.oldToken.methods.approve, window.vasaPowerSwitch.options.address, await window.blockchainCall(window.oldToken.methods.totalSupply));
        context.view.emit('ethereum/ping');
    };
};