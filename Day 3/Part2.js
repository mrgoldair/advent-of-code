let { loadData } = require('../Data.js');
let { curry } = require('../Fn.js');
let { groupBy, smallest, largest } = require('../Group.js')
let { nth, first, conj } = require('../List.js')

//string[]
let data = loadData('./Day 3/Data.txt');

// Increment a number
const inc =
  num => num + 1

// Takes a number representing the bit to first collate from `xs` which is a list of strings representing binary numbers
const o2Gen =
  (idx, xs) => {
    if (xs.length == 1)
      return first(xs)
    let groups = groupBy(nth(idx),xs)
    let [ _, input ] = largest(groups);
    return o2Gen(inc(idx),input)
  }

// num, xs -> str
const co2Gen =
  (idx, xs) => {
    if (xs.length == 1)
      return first(xs)
    // { 0:.., 1:.. }
    let groups = groupBy(nth(idx),xs)
    // { 0:.., 1:.. } -> [ k, v ]
    let [ _, input ] = smallest(groups);
    // num, xs -> str
    return co2Gen(inc(idx),input)
  }

let o2 = o2Gen(0,data)
let co2 = co2Gen(0,data)

console.log(parseInt(o2,2) * parseInt(co2,2))