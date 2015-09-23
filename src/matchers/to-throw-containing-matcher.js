var _ = require('lodash');

module.exports = function () {
    return {
        compare: function (actual, expected) {
            var passed = false, message, exception, exceptionMessage, expectedMessages = getExpectedMessages(expected);

            if (!_.isFunction(actual)) {
                throw new Error('The value is not a function in matcher "toThrowContaining".');
            }

            exception = executeAndReturnException(actual);
            exceptionMessage = exception && (exception.message || exception);

            if (exceptionMessage) {
                passed = exceptionContainsMessages(exceptionMessage, expectedMessages);
                message = getExceptionMessage(exception, passed, expectedMessages, exceptionMessage);
            }

            return {
                pass: passed,
                message: message
            };
        }
    };

    function getExceptionMessage(exception, passed, expectedMessages, exceptionMessage) {
        var not = jasmine.isNot ? 'not ' : '';

        if (!exception) {
            return 'Expected function to throw an exception.';
        }

        if (!passed) {
            return 'Expected function ' + not + 'to throw an exception which contains: "' + expectedMessages.join(', ') + '", but it threw "' + exceptionMessage + '".';
        }
    }

    function executeAndReturnException(fn) {
        try {
            fn();
        } catch (e) {
            return e;
        }
    }

    function exceptionContainsMessages(exceptionMessage, expected) {
        return _.every(expected, function (expectedMessage) {
            return exceptionMessage.indexOf(expectedMessage) >= 0;
        });
    }

    function getExpectedMessages(expected) {
        if (_.isString(expected)) {
            return [expected];
        }

        if (_.isArray(expected)) {
            return expected;
        }

        expected = jasmine.util.argsToArray(expected);

        if (expected === undefined || expected.length === 0) {
            throw new Error('Matcher "toThrowContaining" requires at least one string to be contained in the exception.');
        }

        return expected;
    }
};
