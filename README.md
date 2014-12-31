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

## It's also an NPM package?

I made it an npm package to take advantage of dependency management
and support `npm test` and `npm start`.

There's no original or interesting work here, and so, I don't expect
to publish it.

But- if you're reading the book, and you'd like to `require` the
functions in that you're reading about, you could create an NPM
project with the following dependency in its `package.json`:

```json
"dependencies": {
  "notes-for-functional-javascript": "git://github.com/jedcn/notes-for-functional-javascript"
}
```

Then, in your own project, you could run an `npm install` and execute
code like this:

```javascript
var notes = require("notes-for-functional-javascript");

var alwaysTrue = notes.always(true);
console.log(alwaysTrue()); // true
```

I prefer to invoke Mr. Fogus' functions as if they were globally
available and so you can add `/global` to the end of the require and
do that:

```javascript
require("notes-for-functional-javascript/global");

var alwaysTrue = always(true);
console.log(alwaysTrue()); // true
```
