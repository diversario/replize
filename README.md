### REPLize

Add a REPL into your application.

  [![Build Status](https://secure.travis-ci.org/diversario/replize.png?branch=master)](http://travis-ci.org/diversario/replize)
  [![Coverage Status](https://coveralls.io/repos/diversario/replize/badge.png?branch=master)](https://coveralls.io/r/diversario/replize?branch=master)
  [![Dependency Status](https://gemnasium.com/diversario/replize.png)](https://gemnasium.com/diversario/replize)
  [![NPM version](https://badge.fury.io/js/replize.png)](http://badge.fury.io/js/replize)

```
npm install replize
```

### Usage

`replize` is most useful when attached onto instances (however, it can be used in any way you like).
 
It exports a constructor that takes a configuration hash:

- `port` _number_ (required) Port to listen on. This is how you connect to it
- `host` _string_ (default: `localhost`) Interface to bind to
- `prompt` _string_ (default: `> `) REPL prompt
- `context` _object_ To expose something for REPL you attach it to this object. Key name will become the object name you call in the REPL (see example below).

`bin` folder contains a REPL client you can use:

```
./bin/repl <port>
```

### Events
- `replConnected` `(clientCount)` Client connection is created
- `replDisconnected` `(clientCount)` Client connection is ended
- `error (error)` Socket error
- `replStarted` TCP server is bound
- `replStopped` TCP server is shutdown

### Example

```javascript
var Repl = require('replize')

function Foo() {
  this.repl = Repl({
    port: 20000,
    context: {
      'foo': this
    }
  })
}

Foo.prototype.log = function(){
  console.log('foo')
}

```

Connect to this instance:

```
$ ./bin/repl 20000
```
and type

```
> foo.log()
```
and you will see `foo` instance print `foo` into console.

See [example](example/) folder.