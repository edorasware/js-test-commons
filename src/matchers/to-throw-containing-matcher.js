module.exports = function () {
    var _ = require('lodash'), exceptionMeetsExpectation = false, exception, exceptionMessage, expectedMessages = jasmine.util.argsToArray(arguments);

    if (!_.isFunction(this.actual)) {
        throw new Error('The value is not a function in matcher "toThrowContaining".');
    }

    if (!_.isArray(expectedMessages) || expectedMessages.length === 0) {
        throw new Error('Matcher "toThrowContaining" requires at least one string to be contained in the exception.');
    }

    exception = executeAndReturnException(this.actual);
    exceptionMessage = exception && (exception.message || exception);

    if (exceptionMessage) {
        exceptionMeetsExpectation = exceptionContainsMessages(exceptionMessage, expectedMessages);
    }

    this.message = function () {
        var not = this.isNot ? 'not ' : '';

        if (!exception) {
            return 'Expected function to throw an exception.';
        }

        if (!exceptionMeetsExpectation) {
            return 'Expected function ' + not + 'to throw an exception which contains: "' + expectedMessages.join(', ') + '", but it threw "' + exceptionMessage + '".';
        }
    };

    return exceptionMeetsExpectation;

    function executeAndReturnException(fn) {
        try {
            fn();
        } catch (e) {
            return e;
        }
    }

    function exceptionContainsMessages(exceptionMessage, expectedMessages) {
        return _.every(expectedMessages, function (expectedMessage) {
            return exceptionMessage.indexOf(expectedMessage) >= 0;
        });
    }
};
