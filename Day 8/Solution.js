let { load } = require('../Data.js');
let Fn = require('../Fn.js');

let data = load('./Day 8/Data.txt')

// second :: a[] -> a
const second =
  ([ _, second, ...rest ]) => second

let outputs = data.map(line => { 
  return second(line.split("|"))
})

// split :: string -> string[]
const split =
  s => s.split(" ")

// trim :: string -> string
const trim =
  s => s.trim()

console.log(outputs
              .flatMap(Fn.compose(trim,split))
              .filter(s => {
                return ( s.length == 2 ||
                         s.length == 4 ||
                         s.length == 3 ||
                         s.length == 7 )})
              .length)
// console.log(outputs.split(" ").map(s => s.length).filter(s => s.length == 2 || s.length == 3 || s.length == 4 || s.length == 7))