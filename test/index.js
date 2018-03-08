let test = require('ava');

test('test runs', t => new Promise(done => {
    setTimeout(() => {
        t.pass();
        done();
    }, 1000);
}));
