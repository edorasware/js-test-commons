beforeEach(function () {
    jasmine.addMatchers({
        toThrowContaining: require('./to-throw-containing-matcher')
    });
});
