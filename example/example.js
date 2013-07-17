var Repl = require('../')

function Foo() {
  this.repl = Repl({
    port: 20000,
    context: {
      'foo': this
    }
  })
}

Foo.prototype.log = function () {
  console.log('logged foo')
}

var f = new Foo()