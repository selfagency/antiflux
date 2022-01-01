# Antiflux

A lightweight, zero-dependency, observable state manager, exclusively for
Node.js, for when reactive stage managers and their attendant boilerplate are
extreme overkill.

## Installation

```sh
npm install antiflux || yarn add antiflux
```

## Usage

```js
import { Antiflux } from 'antiflux'

const store = new Antiflux([initialState], [options], [getters])
```

### Set key

Add or update a key.

```js
store.set('myKey', 'myValue')
```

### Has key

Check if a key exists. Responds with a boolean.

```js
store.has('myKey')
```

### Get key

Responds with the key value.

```js
const myValue = store.get('myKey')
```

Deep-get with dot notation.

```js
const myValue = store.get('deep.deeper.deepest')
```

### Watch for changes

Watch a key for changes. Available targets are `set`, `delete`, and `clear`.

```js
store.watch.on('set', e => {
  const { key, value, prior } = e

  console.log(`The key ${key} changed from ${prior} to ${value}`).
})
```

### Delete key

Delete a key from the state.

```js
store.delete('myKey')
```

### Dump data

Dump all state data. Specify `true` to decrypt encrypted data. Default is `false`.

```js
store.dump()
```

### Clear all

Clear all entries from the state.

```js
store.clear()
```

## Options

### Initialize state

Initialize the store with a predefined state.

```js
const initialState = {
  foo: 'bar',
  baz: 'qux'
}

const store = new Antiflux(initialState)
```

### Encrypt data

Encrypt data at rest with AES-256-GCM encryption. Use the `encryptKey` option to specify a 32-character encryption key.

```js
const options = {
  encryptKey: 'bWDlfrMxr1cnl4F4sdOvoKEOO9WY628a'
}

const store = new Antiflux({}, options)
```

### Persist data

Use the `persist` option to specify a path at which to write data. Data will
be reloaded from disk at runtime.

```js
const options = {
  persist: '/tmp/antiflux.db'
}

const store = new Antiflux({}, options)
```

### Debug mode

Use the `debug` option to print state changes to the console, e.g.: `(Store) foo: bar ➟ baz`.

```js
const options = {
  debug: true
}

const store = new Antiflux({}, options)
```

## Custom getters

Create custom getters to return modified data.

```js
const getters = {
  getLower(state) {
    return state.get('foo.bar.baz').toLowerCase()
  },
  getUpper(state) {
    return state.get('foo.bar.baz').toUpperCase()
  }
}

const store = new Antiflux({}, {}, getters)
```
