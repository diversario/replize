var repl = require('repl')
  , net = require('net')
  , EE = require('events').EventEmitter
  , util = require('util')

module.exports = Repl

function Repl(config) {
  var self = this
  
  if (!(this instanceof Repl)) return new Repl(config)

  this.clientCount = 0

  net.createServer(function (socket) {
    var r = repl.start({
      prompt: config.prompt || '> ',
      input: socket,
      output: socket,
      terminal: true,
      ignoreUndefined: false
    })
    .on('exit', function() {
      self.clientCount--
      self.emit('replDisonnected', self.clientCount)
      socket.end()
    })
    
    if (config.context) {
      Object.keys(config.context).forEach(function (key) {
        r.context[key] = config.context[key] 
      })
    }
  })
  .on('connection', function() {
    self.clientCount++
    self.emit('replConnected', self.clientCount)
  })
  .listen(config.port, config.host || 'localhost', function() {
      self.emit('replStarted')
  })
}

util.inherits(Repl, EE)

Repl.prototype.clients = function () {
  return this.clientCount
}

