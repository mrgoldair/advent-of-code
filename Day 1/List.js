const Fn = require('../Fn');

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

const reduce = Fn.curry((fn, init, xs) => xs.reduce(fn,init))

module.exports = {
  sum,
  map,
  reduce,
  slidingOf
}