var proxyquire = require('proxyquireify')(require);
var stubs = {};

var UUT = proxyquire('some-dep', stubs);

describe('test', function() {
  it('should return value multiplied by 2', function() {
    expect(UUT(2)).to.equal(4);
  })
});
