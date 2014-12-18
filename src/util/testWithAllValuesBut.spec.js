describe('testWithAllValuesBut', function () {
    var testWithAllValuesBut = require('./testWithAllValuesBut');

    it('should throw an exception when the given values is neither string nor array of strings', function () {
        expect(function () {
            testWithAllValuesBut(undefined, jasmine.createSpy('callback'));
        }).toThrow('Values to skip should be either a string or an array of strings: "undefined".');
    });

    it('should execute the callback with all values when the values to skip are empty', function () {
        var callback = jasmine.createSpy('callback');

        testWithAllValuesBut([], callback);

        expect(callback.callCount).toBe(8);
    });

    it('should throw an exception when one of the given values is not recognized', function () {
        expect(function () {
            testWithAllValuesBut('non-type', jasmine.createSpy('callback'));
        }).toThrow('Some value types: "non-type" were not recognized.');

        expect(function () {
            testWithAllValuesBut(['number', 'non-type'], jasmine.createSpy('callback'));
        }).toThrow('Some value types: "number, non-type" were not recognized.');
    });

    it('should execute the callback with 0 and object', function () {
        var callback = jasmine.createSpy('callback');

        testWithAllValuesBut('string', callback);

        expect(callback).toHaveBeenCalledWith(0);
        expect(callback).toHaveBeenCalledWith({});
    });

    it('should not execute the callback with an argument of the given type', function () {
        var callback = jasmine.createSpy('callback');

        testWithAllValuesBut('number', callback);

        expect(callback).not.toHaveBeenCalledWith(0);
        expect(callback).toHaveBeenCalledWith({});
    });

    it('should not execute the callback with an argument of the given types', function () {
        var callback = jasmine.createSpy('callback');

        testWithAllValuesBut(['number', 'boolean'], callback);

        expect(callback).not.toHaveBeenCalledWith(0);
        expect(callback).not.toHaveBeenCalledWith(true);
    });
});
