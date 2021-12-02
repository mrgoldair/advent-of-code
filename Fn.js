/**
 * Takes a function of n args and turns it into a
 * n functions of 1 arg
 * @param fn - Function to curry
 * @returns - Curried function
 */
const curry = (fn) => {
  // 
  const curryFn = (gatheredArgs) => {
    return (...arguments) => {
      // Combine the args gathered so far with the current invocations args
      let args = [ ...gatheredArgs, ...Array.from(arguments) ];
      // If we have the full number (or more), call our function
      if (args.length >= fn.length)
        return fn.apply(null, args.slice(0, fn.length))
      // Otherwise we need to return a function to wait for the remainder args
      return curryFn(args)
    }
  }
  // Initially we have no args to pass
  return curryFn([])
}

const compose = (f, g) => x => g(f(x))

module.exports = { curry, compose }