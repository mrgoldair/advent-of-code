let { loadData } = require('../Data.js');

// string[]
let data = loadData('./Day 3/Data.txt');

// regex => str => [ str, number ]
const parseFn =
  // /(up|down|forward)\s(\d)/
  regex =>
  // "up 5"
  str => {
    let [ _, dir, amount ] = str.match(regex);
    return [ dir, Number(amount) ]
  }

// model => amount => model
const down =
  (model,value) => {
    return { ...model, aim: model.aim + value }
  }

const up =
  (model,value) => {
    return { ...model, aim: model.aim - value }
  }

const forward =
  (model,value) => {
    return { ...model, 
             horizontal: model.horizontal + value,
             vertical: model.vertical + (model.aim * value) }
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
          return forward(model,value);
        case "up":
          return up(model,value);
        case "down":
          return down(model,value);
      }
    }, {
      vertical: 0,
      horizontal: 0,
      aim: 0
    })

console.log( horizontal * vertical );