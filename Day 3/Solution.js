let { loadData } = require('../Data.js');
let { curry } = require('../Fn.js');

//string[]
let data = loadData('./Day 3/Data.txt');

// (Tally, Tally) => Tally
const sum =
  ([a0, a1],[b0, b1]) => [ (a0 + b0), (a1 + b1) ]

// Tally => 1 | 0
const max =
  ([ l, r ]) => l > r ? 0 : 1

// number => number
const negate =
  b => b == 0 ? 1 : 0

// str => [Tally]
const tally =
  str =>
    // 100101101101
    Array.from(str)
      .map(ch => { 
        return ch == '1' ?
                  [ 0, 1 ]
                : [ 1, 0 ]
      })

// [ 1 | 0 ]
let gamma = data
  // Generate our 0/1 tallys for each string
  .map(tally)
  // Sum tallys 
  .reduce((map2(sum)))
  // 
  .map(max);

// [ 1 | 0 ]
let epsilon =
  gamma.map(negate);

gamma = parseInt(gamma.join(''),2)
epsilon = parseInt(epsilon.join(''),2)

// 4139586
console.log( gamma * epsilon )