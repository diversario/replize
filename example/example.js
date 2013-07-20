var Repl = require('../')

function Foo() {
  this.repl = Repl({
    port: 20000,
    context: {
      'foo': this
    }
  }).start()
}

Foo.prototype.log = function () {
  console.log('logged foo')
}

new Foo