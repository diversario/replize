var Repl = require('../')
  , assert = require('assert')
  , net = require('net')

describe('REPL', function() {
  it('accepts connections', function(done) {
    var counter = 0

    var repl = Repl({port: 65433})

    setTimeout(function() {
      var sock = net.connect(65433)

      sock.on('connect', function () {
        setTimeout(function() {
          sock.destroy()
        }, 200)
      })
    }, 500)

    repl.on('replConnected', function() {
      assert(repl.clients() === 1)
      counter++
    })

    repl.on('replDisconnected', function() {
      assert(repl.clients() === 0)
      counter++
      assert(counter === 2)
      repl.stop(done)
    })
    
    repl.start()
  })

  it('with context', function(done) {
    var counter = 0

    var repl = Repl({
      port: 65433,
      context: {'foo': 'bar'}
    })

    setTimeout(function() {
      var sock = net.connect(65433)

      sock.on('connect', function () {      
        setTimeout(function() {
          sock.destroy()
        }, 200)
      })
    }, 500)

    repl.on('replConnected', function() {
      assert(repl.clients() === 1)
      counter++
    })

    repl.on('replDisconnected', function() {
      assert(repl.clients() === 0)
      counter++
      assert(counter === 2)
      repl.stop(done)
    })
    
    repl.start()
  })
})