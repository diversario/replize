## REPLize

Add a REPL into your application.

  [![Build Status](https://secure.travis-ci.org/diversario/replize.png?branch=master)](http://travis-ci.org/diversario/replize)
  [![Coverage Status](https://coveralls.io/repos/diversario/replize/badge.png?branch=master)](https://coveralls.io/r/diversario/replize?branch=master)
  [![Dependency Status](https://gemnasium.com/diversario/replize.png)](https://gemnasium.com/diversario/replize)
  [![NPM version](https://badge.fury.io/js/replize.png)](http://badge.fury.io/js/replize)

```
npm install replize
```

## Usage

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

Alternatively, use `telnet`:

```
$ telnet localhost 20000
```

## Events
- `replConnected` `(clientCount)` Client connection is created
- `replDisconnected` `(clientCount)` Client connection is ended
- `error (error)` Socket error
- `replStarted` TCP server is bound
- `replStopped` TCP server is shutdown

## API

#### replize#start([callback])
Start the TCP server used by REPL. Optional `callback` is called when server starts listening. Emits `replStarted`.

#### replize#stop([callback])
Stops the TCP server. Optional `callback` is called when server is shutdown. Emits `replStopped`.

#### replize#clients()
Returns the number of clients connected to this instance.


## Example

```javascript
var Repl = require('replize')

function Foo() {
  this.repl = Repl({
    port: 20000,
    context: {
      'foo': this
    }
  }).start()
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

## License 

(The MIT License)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
