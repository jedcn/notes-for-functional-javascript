# Notes for Functional JavaScript

These are "notes" I took while reading
[Functional JavaScript][fun-js-site] by [Michael Fogus][fogus-site].

Mr. Fogus has put all of the code for Functional JavaScript
[online][fun-js-code].

[fun-js-site]: http://functionaljavascript.com/
[fogus-site]: http://fogus.me/

## So, what's this, then?

These are specs I wrote in jasmine to help me follow along.

In particular, if I wrote some code and ran some code I could better
understand the ideas in the book.

If you cloned this repository to your machine, you would find source
in `js/`. It's a subset of what's available at the
[official source][fun-js-code].

[fun-js-code]: https://github.com/funjs/book-source

The specs (located in `spec/`) mostly mirror examples in the
book. Sometimes they explore boundary conditions that I didn't
understand.

## How is it used?

If you have this locally, you could run `npm install` to grab any
dependencies. You can run all of the specs with `npm test`.

You can also take advantage of `npm start`: this sets up a watcher and
runs the tests whenever you modify the specs.

## It's also an NPM package?

I made it an npm package to take advantage of dependency management
and support `npm test` and `npm start`.

There's no original work here, and so, I don't expect to publish it.
