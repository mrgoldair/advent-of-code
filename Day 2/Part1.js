let { loadData } = require('../Data.js');

// string[]
let data = loadData('./Day 2/Data.txt');

// regex => str => [ str, number ]
const parseFn =
  // /(up|down|forward)\s(\d)/
  regex =>
  // "up 5"
  str => {
    let [ _, dir, amount ] = str.match(regex);
    return [ dir, Number(amount) ]
  }



const sub = (value,from) => from - value

// model => amount => model
const down =
  (model,value) => {
    return { ...model, vertical: model.vertical + value }
  }

const add = (val,to) => from + val

let { horizontal, vertical } =
  data
    // [str] => [ str, number ]
    .map(parseFn(/(up|down|forward)\s(\d)/))
    // (acc,[ str, number ]) => [ str, number ]
    .reduce((model, [ dir, value ]) => {
      switch (dir) {
        case "forward":
          return { ...model, horizontal: model.horizontal + value };
        case "up":
          return { ...model, vertical: model.vertical - value }
        case "down":
          return down(model,value)
      }
    }, {
      vertical: 0,
      horizontal: 0
    })

console.log( horizontal * vertical );