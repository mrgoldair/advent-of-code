const Fn = require('./Fn.js');

function sum(addends){
  return addends.reduce((acc,curr) => {
    return acc + curr
  })
}

const slidingOf = Fn.curry((size, xs) => {
  let groups = [];
  for (let i = 0;i <= (xs.length - size);i++){
    groups.push(xs.slice(i, i + size))
  }
  return groups;
})

const map = Fn.curry((fn, xs) => xs.map(fn))

const filter = Fn.curry((fn, xs) => xs.filter(fn))

const reduce = Fn.curry((fn, init, xs) => xs.reduce(fn,init))

// Return nth entry of array-like
const nth =
  Fn.curry((nth, str) => str[nth])

const first =
  xs =>
    nth(0,xs)

const empty =
  xs =>
    xs.length == 0

const conj =
  (item, xs) => {
    let copy = xs.slice()
    copy.push(item)
    return copy
  }

module.exports = {
  sum,
  map,
  filter,
  reduce,
  slidingOf,
  nth,
  first,
  conj,
  empty
}