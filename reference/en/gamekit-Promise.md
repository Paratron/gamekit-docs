conf:{
    "root": "gamekit",
    "title": "gamekit.Promise",
    "constructor": true,
    "file": "src/Promises.js",
    "key": "gamekit.Promise"
}:conf

#gamekit.Promise
Gamekit comes with its own implementation of the [Promise/A spec](http://wiki.commonjs.org/wiki/Promises/A).

It isn't as extended as the [Promise Library Q](https://github.com/kriskowal/q), but it does its job. If you need something more sophisticated,
 I recommend using Q.

##Methods

###Promise([target]):gamekit.Promise {.method .constructor}
Creates a new, unfulfilled promise. Return it as a function result to work with asynchronous
results.

    var myPromise = new gamekit.Promise();


###resolve([...]):void {.method}
Resolves a promise (positive outcome). If you want to pass parameters to the function that has been
tied to the promise via `then()`, just pass them to the resolve method - they will all be forwarded
to the success function.

You can resolve your promise before any other code can tie itself to it through the `then()` method.
When `then()` is called at a later point, the success method is immediately called.


###reject([...]):void {.method}
Rejects a promise (negative outcome). Behaves like the `resolve()` method.

###progress([...]):void {.method}
Notification method if you want pass a status of a process that takes much time. Again, all parameters
are forwarded to the registered status function.

###then(success, [error], [progress]):gamekit.Promise {.method}
Ties one or more functions to the promise to react on different outcomes or notifications. The `success`
function is being called when the promise is resolved. The `error` function is called when the promise
is rejected. The `progress` function is called when the code that emitted the promise wants to notify
about its progress. The progress function may be called multiple times.




##Static Methods {#static-methods}
Static methods can be directly called over `gamekit.Promise.*` without creating a new instance
of `gamekit.Promise`. All static methods are also mapped directly onto the global namespace `gamekit`,
because programmers are lazy.

###gamekit.Promise.all([...]):gamekit.Promise {.static-method}
Also mapped at `gamekit.all()` as shorthand method.

Pass multiple promises as parameters into this method. It will return a new, single promise that
is resolved when _all_ passed promises got resolved. The returned promise is rejected if any of the
passed promises are rejected.

###gamekit.Promise.chain([...]):function {.static-method}
Also mapped at `gamekit.chain()` as a shorthand method.

Pass multiple functions as parameters into this method. The functions will be called one after another.
If the functions return promises, the method will wait for the promise to be resolved. If anything else
is returned by a function, the method moves on to the next function immediately.

The method returns a promise itself that is fulfilled when all passed in functions have been called.

###gamekit.Promise.parallel([...]):function {.static-method}
Also mapped at `gamekit.parallel()` as a shorthand method.

Pass multiple functions as parameters into this method. Basically, this works like `gamekit.chain()`
since it also calls all passed in functions one after another (since Javascript doesn't allow you to
really call multiple functions at once), but other than the `chain()` method, this will not wait for
resulting promises from the functions to be resolved. It will execute all functions no matter what they return.

The method returns a promise that is resolved when the returned promises of the passed-in functions are
 resolved - if there are any promises returned.

###gamekit.Promise.wait(duration):function {.static-method}
Also mapped at `gamekit.wait()` as a shorthand method.

Will return a function that upon call returns a promise that will be resolved after the given amount of milliseconds.
Made to just pause promise chains with an eye on animation.