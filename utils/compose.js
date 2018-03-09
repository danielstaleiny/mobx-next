const compose = (...fns) => {
    var [fn1, fn2, ...rest] = fns.reverse()

    var composedFn = (...args) => fn2(fn1(...args))

    if (rest.length == 0) return composedFn

    return compose(...rest.reverse(), composedFn)
}

export default compose
