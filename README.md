# instof

```text
instof(<value>,<constructor>) => <boolean>
instof(<value>,<constructor_name>) => <boolean>
```

Tests to see if the prototype property of a constructor appears anywhere in the prototype chain of an value.
This is an alternative to `instanceof` that actually allows to check `any value` not just objects, even `primitives`, `undefined` and `null`.
Also the big advantage in comparance with `instanceof` is that using `instof` you can do check without explicit import of constructor to the module by specifying string name of it.

## Usage

```javascript
const instof = require('instof')

//=> true:

instof(undefined, 'Undefined')
instof(null, 'Null')

instof(global, 'Global')
instof(global, Object)

instof(window, 'Global')
instof(window, 'Window')
instof(window, 'EventTarget')
instof(window, 'Object')

instof(NaN, 'NotNumber')
instof(NaN, Number)
instof(NaN, 'Object')

instof(1/0, 'InfiniteNumber')
instof(-Infinity, 'InfiniteNumber')
instof(Infinity, Number)

instof(Object.create(null), 'Dictionary')
instof({}, Object)

instof(42, Number)
instof(42, 'Object')
instof('str', String)
instof('str', Object)

instof(async function () {}, 'AsyncFunction')
instof(async function () {}, Function)
instof(async function () {}, 'Object')

instof([], Array)
instof([], Object)

instof(new BigInt64Array(), 'BigInt64Array')
instof(new BigInt64Array(), 'TypedArray')
instof(new BigInt64Array(), Object)

//=> false:

instof(null, Object)

instof(Object.create(null), Object)

instof(BigInt(Number.MAX_SAFE_INTEGER), Number)

instof('str', Symbol)

instof({}, 'Dictionary')

instof(new Object(), 'Null')

instof([], 'TypedArray')

instof(new Int8Array(), Array)

```

## Reserved constructor names

Reserved constructor names make possible to distinguish type of some special values from values with the real type.
Historically, accessing the global object has required different syntax in different JavaScript environments. On the web you can use `window`, `self`, `frames`, in Node.js you must instead use `global` and constructor of this global value is 'Object'. Also there are not straightforward situations with `null`, `NaN` and `Infinity` values.
To determine the constructor of such values the `instof` function uses the following constructor names:

- **'Undefined'** for `undefined`
- **'Null'** for `null`
- **'Global'** for `global`, `window`, etc.
- **'NotNumber'** for `NaN`
- **'InfiniteNumber'** for `Infinity` or `-Infinity`
- **'Dictionary'** for object without prototype that was created by `Object.create(null)`

## Install

> Install on Node.JS with [npm](https://www.npmjs.com/)

```bash
npm install instof
```

## License

MIT © [Taras Panasyuk](webdev.taras@gmail.com)
