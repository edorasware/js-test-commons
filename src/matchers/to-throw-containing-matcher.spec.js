describe('toThrowContainingMatcher', function () {
    var toThrowContainingMatcher = require('./to-throw-containing-matcher'), _ = require('lodash');

    it('should throw an exception when actual is not a function', function () {
        expect(function () {
            var test = {actual: 'foo'};
            toThrowContainingMatcher().compare.call(null, test, 'foo');
        }).toThrow(new Error('The value is not a function in matcher "toThrowContaining".'));
    });

    it('should throw an exception when arguments is not an array or is empty', function () {
        expect(function () {
            var test = {actual: _.noop};
            toThrowContainingMatcher().compare.call(null, test, _.noop);
        }).toThrow(new Error('Matcher "toThrowContaining" requires at least one string to be contained in the exception.'));
    });

    it('should pass when the exception message contains the given messages', function () {
        var expectedMessage, test = function () {
                throw new Error(expectedMessage);
            },
            success = {
                pass: true,
                message: undefined
            };

        expectedMessage = 'Foo';
        expect(toThrowContainingMatcher().compare.call(null, test, 'Foo')).toEqual(success);

        expectedMessage = 'Foo Bar';
        expect(toThrowContainingMatcher().compare.call(null, test, ['Foo', 'Bar'])).toEqual(success);
    });

    it('should not pass when the exception message does not contain all the given messages', function () {
        var expectedMessage, test = function () {
                throw new Error(expectedMessage);
            },
            fail = {
                pass: false
            };

        expectedMessage = 'Foo';
        fail.message = 'Expected function to throw an exception which contains: "Bar", but it threw "Foo".';
        expect(toThrowContainingMatcher().compare.call(null, test, 'Bar')).toEqual(fail);

        expectedMessage = 'Foo';
        fail.message = 'Expected function to throw an exception which contains: "Foo Bar", but it threw "Foo".';
        expect(toThrowContainingMatcher().compare.call(null, test, 'Foo Bar')).toEqual(fail);
    });

    it('should pass when negated and no exception is thrown', function () {
        expect(_.noop).not.toThrowContaining('Foo');
    });
});
