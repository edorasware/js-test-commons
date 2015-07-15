var _ = require('lodash');
var exceptionMeetsExpectation = false,
    exception,
    exceptionMessage;

module.exports = function (util, customEqualityTesters) {
    return {
        compare: function(actual, expected) {
            
            var message, passed;

            if (expected === undefined) {
                throwInvalidExpectationError();
            } else {
                expected = _.isArray(expected)? expected : jasmine.util.argsToArray(expected);    
                if (expected.length === 0) {
                    throwInvalidExpectationError();
                }
            }

            if (!_.isFunction(actual)) { 
                throw new Error('The value is not a function in matcher "toThrowContaining".');
            }
            
            exception = executeAndReturnException(actual);
            exceptionMessage = exception && (exception.message || exception);

            if (exceptionMessage) {
                exceptionMeetsExpectation = exceptionContainsMessages(exceptionMessage, expected);
                message = getExceptionMessage(exception, exceptionMeetsExpectation, expected, exceptionMessage);
                passed = exceptionContainsMessages(exceptionMessage, expected);
            }

            return {
                pass: passed,
                message: message
            };
        }
    }
};

function throwInvalidExpectationError() {
    throw new Error('Matcher "toThrowContaining" requires at least one string to be contained in the exception.');
};

function getExceptionMessage(exception, exceptionMeetsExpectation, expected, exceptionMessage) {
    var not = jasmine.isNot ? 'not ' : '';

    if (!exception) {
        return 'Expected function to throw an exception.';
    }

    if (!exceptionMeetsExpectation) {
        return 'Expected function ' + not + 'to throw an exception which contains: "' + expected.join(', ') + '", but it threw "' + exceptionMessage + '".';
    }    
};


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
