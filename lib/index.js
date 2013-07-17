var repl = require('repl')
  , net = require('net')
  , EE = require('events').EventEmitter
  , util = require('util')

module.exports = Repl

function Repl(config) {
  var self = this
  
  if (!(this instanceof Repl)) return new Repl(config)

  var replClients = 0

  net.createServer(function (socket) {
    var r = repl.start({
      prompt: config.prompt || '> ',
      input: socket,
      output: socket,
      terminal: true,
      ignoreUndefined: false
    })
    .on('exit', function() {
      replClients--
      self.emit('replDisonnected', replClients)
      socket.end()
    })
    
    if (config.context) {
      Object.keys(config.context).forEach(function (key) {
        r.context[key] = config.context[key] 
      })
    }
  })
  .on('connection', function() {
    replClients++
    self.emit('replConnected', replClients)
  })
  .listen(config.port, config.host || 'localhost', function() {
      self.emit('replStarted')
  })
}

util.inherits(Repl, EE)