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
    socket.on('error', function (e) {
      console.error('Socket error:', e.message);
      socket.end();
    })
    
    socket.on('end', close)

    function close() {
      self.clients(-1)
      self.emit('replDisconnected', self.clients())
      socket.destroy()
    }
    
    socket.setKeepAlive(true, 1000)

    var r = repl.start({
      prompt: config.prompt || '> ',
      input: socket,
      output: socket,
      terminal: true,
      ignoreUndefined: false
    })
    .on('exit', close)
    
    if (config.context) {
      Object.keys(config.context).forEach(function (key) {
        r.context[key] = config.context[key] 
      })
    }
  })
  .on('connection', function() {
    self.clients(1)
    self.emit('replConnected', self.clients())
  })
  .listen(config.port, config.host || 'localhost', function() {
      self.emit('replStarted')
  })
}

util.inherits(Repl, EE)

Repl.prototype.clients = function (n) {
  if (!n) n = 0

  this.clientCount += n
  
  return this.clientCount
}

