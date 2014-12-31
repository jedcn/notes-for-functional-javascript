# Notes for Functional JavaScript

These are "notes" I took while reading
[Functional JavaScript by Michael Fogus (O'Reilly). Copyright 2013 Michael Fogus, 978-1-449-36072-6.][fun-js-site]

[Mr. Fogus][fogus-site] and O'Reilly have put all of the code for
Functional JavaScript [online][fun-js-code].

This repository contains a subset of the Functional JavaScript code in
files underneath the `js/` directory. This code was written by Michael
Fogus.

[fun-js-site]: http://functionaljavascript.com/
[fogus-site]: http://fogus.me/

## So, what's this, then?

If you cloned this repository to your machine, you would find source
in `js/`. It's a subset of what's available at the
[official source][fun-js-code], was written by Michael Fogus, and I
entered it back in as I followed along.

[fun-js-code]: https://github.com/funjs/book-source

With the original source in place, I wrote some code underneath
`specs/` in jasmine to help me follow along while reading the book. To
be explicit, it's very helpful to write code while you're reading
code.

The specs (located in `spec/`) mostly mirror examples in the
book. Sometimes they explore boundary conditions that I didn't
understand.

## How is it used?

If you have this locally, you could run `npm install` to grab any
dependencies. You can then run all of the specs with `npm test`.

You can also take advantage of `npm start`: this sets up a watcher and
runs the tests whenever you modify the specs.

Finally-- if you had it cloned locally-- you could create a file named
`experimentingWithFun.js` and you could put code into that file like this:

```javascript
require("./global.js")
var alwaysTrue = always(true);
console.log(alwaysTrue());
```

And then you could see the result by running: `node
experimentingWithFun.js`:

```
$ node experimentingWithFun.js
true
```

## It's also an NPM package?

I made it an npm package to take advantage of dependency management
and support `npm test` and `npm start`.

## Should you use this?

Nope.

Instead, I suspect the answer is [lemonad][lemonad] (pronounced
lemonade).

[lemonad]: https://github.com/fogus/lemonad
