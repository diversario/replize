var repl = require('repl')
  , net = require('net')
  , EE = require('events').EventEmitter
  , util = require('util')

module.exports = Repl

function Repl(config) {
  if (!(this instanceof Repl)) return new Repl(config)
  
  this._config = config

  this.clientCount = 0
}

util.inherits(Repl, EE)

Repl.prototype.clients = function (n) {
  if (!n) n = 0

  this.clientCount += n
  
  return this.clientCount
}

Repl.prototype.start = function () {
  var self = this
  
  this._server = net.createServer(function (socket) {
    socket.on('error', function (e) {
      self.emit('error', e)
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
      prompt: self._config.prompt || '> ',
      input: socket,
      output: socket,
      terminal: true,
      ignoreUndefined: false
    })
    .on('exit', close)

    if (self._config.context) {
      Object.keys(self._config.context).forEach(function (key) {
        r.context[key] = self._config.context[key]
      })
    }
  })
  .on('connection', function() {
    self.clients(1)
    self.emit('replConnected', self.clients())
  })
  .listen(self._config.port, self._config.host || 'localhost', function() {
    self.emit('replStarted')
  })
}

Repl.prototype.stop = function (cb) {
  var self = this
  
  this._server.close(function () {
    self._server = null
    self.emit('replStopped')
    cb && cb()
  })
}