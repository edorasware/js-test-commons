require('./testWithAllValuesBut.spec');

describe('util', function() {
    require('./util');

    it('should register the testWithAllValuesBut function in the window', function() {
        expect(typeof testWithAllValuesBut).toBe('function');
    });
});
