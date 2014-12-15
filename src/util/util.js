var _ = require('lodash');

beforeEach(function () {
    registerWindowFunctions({
        testWithAllValuesBut: require('./testWithAllValuesBut')
    });
});

afterEach(function () {
    deregisterWindowFunctions([
        'testWithAllValuesBut'
    ]);
});

function registerWindowFunctions(fns) {
    _.forEach(fns, registerWindowFunction);

    function registerWindowFunction(fn, name) {
        if (window[name]) {
            throw new Error('A window property with the name: "' + name + '" already exists.');
        }
        window[name] = fn;
    }
}

function deregisterWindowFunctions(names) {
    _.forEach(names, function (name) {
        window[name] = undefined;
    });
}
