module.exports = function (valuesToSkip, expectFn) {
    var _ = require('lodash'),
        allValues = {
            stringValue: 'text',
            numberValue: 0,
            booleanValue: true,
            nullValue: null,
            undefinedValue: undefined,
            objectValue: {},
            arrayValue: [],
            functionValue: _.noop
        }, valuesToTest;

    valuesToSkip = asArray(valuesToSkip);

    valuesToTest = _.filter(allValues, function (value, key) {
        return valuesToSkip.indexOf(key) < 0;
    });

    if (_.keys(allValues).length !== valuesToTest.length + valuesToSkip.length) {
        throw new Error('Some value types: "' + valuesToSkip.join(', ') + '" were not recognized.');
    }

    _.forEach(valuesToTest, expectFn);

    function asArray(valuesToSkip) {
        if (_.isArray(valuesToSkip)) {
            return _.map(valuesToSkip, concatValue);
        }

        if (_.isString(valuesToSkip)) {
            return  [concatValue(valuesToSkip)];
        }

        throw new Error('Values to skip should be either a string or an array of strings: "' + valuesToSkip + '".');

        function concatValue(valueName) {
            return _.isString(valueName) ? valueName.concat('Value') : valueName;
        }
    }
};
