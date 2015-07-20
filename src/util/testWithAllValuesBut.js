module.exports = function (valuesToSkip, expectFn) {
    var _ = require('lodash'),
        allValues = {
            stringValue: 'text',
            numberValue: 10,
            booleanValue: true,
            nullValue: null,
            undefinedValue: undefined,
            objectValue: {},
            arrayValue: [],
            functionValue: _.noop
        }, valuesToTest;

    valuesToSkip = asArray(valuesToSkip);

    valuesToTest = _.filter(allValues, function (value, key) {
        var typeName = key.substring(0, key.indexOf('Value'));

        return valuesToSkip.indexOf(typeName) < 0;
    });

    if (_.keys(allValues).length !== valuesToTest.length + valuesToSkip.length) {
        throw new Error('Some value types: "' + valuesToSkip.join(', ') + '" were not recognized.');
    }

    _.forEach(valuesToTest, function(value) {
        expectFn(value);
    });

    function asArray(valuesToSkip) {
        if (_.isArray(valuesToSkip)) {
            return valuesToSkip;
        }

        if (_.isString(valuesToSkip)) {
            return  [valuesToSkip];
        }

        throw new Error('Values to skip should be either a string or an array of strings: "' + valuesToSkip + '".');
    }
};
