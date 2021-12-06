let { loadData } = require('../Data.js');
let { curry } = require('../Fn.js');

//string[]
//let data = loadData('./Day 3/Data.txt');

const conj =
  (item, xs) => {
    let copy = xs.slice()
    copy.push(item)
    return copy
  }

// Turns a sequence `xs` into a hash-map where keys are determined by `fn`
const groupBy =
  (fn, xs) => {
    return xs.reduce((acc,curr) => {
      return {
        ...acc,
        [fn(curr)]: acc[fn(curr)]
                    ? conj(curr, acc[fn(curr)])
                    : acc[fn(curr)] = [curr]
    }}, {})
  }

let input = [
  "010100010111",
  "100100100110",
  "100110111001",
  "011001011011",
  "010000110111",
  "000011101001"
]

// Most-significant-bit as a specialisation of nth
const msb =
  str => Number(str[0])

// Return nth entry of array-like
const nth =
  curry((nth, str) => str[nth])

// Given a group (an keyed object with array values), enumerate the keys and report the group key with the most entries
// Group => number
// Group.Max
const groupMax =
  grouping => {
    return Object.entries(grouping)
      .reduce(([ l,max ],[ r,group ]) => {
        return group.length > max.length
                ? [ r, group ] 
                : [ l, max ]
      })
  }

let groups = groupBy(nth(0),input)

// Takes a number representing the bit to first collate from `xs` which is a list of strings representing binary numbers
const oxGen =
  (nth, xs)


console.log(groupMax(groups))