describe('testWithAllValuesBut', function () {
    var testWithAllValuesBut = require('./testWithAllValuesBut');

    it('should throw an exception when the given values is neither string nor array of strings', function () {
        expect(function () {
            testWithAllValuesBut(undefined, jasmine.createSpy('callback'));
        }).toThrow('Values to skip should be either a string or an array of strings: "undefined".');
    });

    it('should throw an exception when one of the given values is not recognized', function () {
        expect(function () {
            testWithAllValuesBut('non-type', jasmine.createSpy('callback'));
        }).toThrow('Some value types: "non-typeValue" were not recognized.');

        expect(function () {
            testWithAllValuesBut(['number', 'non-type'], jasmine.createSpy('callback'));
        }).toThrow('Some value types: "numberValue, non-typeValue" were not recognized.');
    });

    it('should not execute the callback with an argument of the given type', function () {
        var callback = jasmine.createSpy('callback');

        testWithAllValuesBut('array', callback);

        expect(callback).not.toHaveBeenCalledWith([]);
    });

    it('should not execute the callback with an argument of the given types', function () {
        var callback = jasmine.createSpy('callback');

        testWithAllValuesBut(['object', 'array'], callback);

        expect(callback).not.toHaveBeenCalledWith({});
        expect(callback).not.toHaveBeenCalledWith([]);
    });
});
