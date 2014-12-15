describe('toThrowContainingMatcher', function () {
    var toThrowContainingMatcher = require('./to-throw-containing-matcher'), test = {}, _ = require('lodash');

    it('should throw an exception when actual is not a function', function () {
        expect(function () {
            test.actual = 'foo';

            toThrowContainingMatcher.call(test);
        }).toThrow('The value is not a function in matcher "toThrowContaining".');
    });

    it('should throw an exception when arguments is not an array or is empty', function () {
        expect(function () {
            test.actual = _.noop;

            toThrowContainingMatcher.call(test);
        }).toThrow('Matcher "toThrowContaining" requires at least one string to be contained in the exception.');
    });

    it('should pass when the exception message contains the given messages', function () {
        expect(function () {
            throw new Error('Foo Bar');
        }).toThrowContaining('Foo', 'Bar');
    });

    it('should pass when negated and the exception not thrown or exception message does not contain the given messages', function () {
        expect(_.noop).not.toThrowContaining('Bar');

        expect(function () {
            throw new Error('Foo');
        }).not.toThrowContaining('Bar');
    });

});
