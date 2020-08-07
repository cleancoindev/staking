function Boot() {
    window.getPage();
    var pathName = 'index';
    var props = {};
    var callback = undefined;
    for(var i in arguments) {
        var arg = arguments[i];
        if(typeof arg === 'string') {
            pathName = arg;
        }
        if(typeof arg === 'object') {
            props = arg;
        }
        if(typeof arg === 'function') {
            callback = arg;
        }
    }
    ReactModuleLoader.load({
        modules: ['spa/' + pathName],
        scripts: ['spa/bigLoader.jsx'],
        callback : function() {
            React.defaultLoader = function() {
                return React.createElement(BigLoader);
            };
            ReactDOM.render(React.createElement(window[pathName.firstLetterToUpperCase()], props), document.body, callback);
        }
    });
};