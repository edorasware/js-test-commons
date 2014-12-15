beforeEach(function () {
    this.addMatchers({
        toThrowContaining: require('./to-throw-containing-matcher')
    });
});
