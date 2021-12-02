const Data = require('./Data.js');

let numbers = Data.loadData();

let increases = numbers.reduce((acc,curr) => {
  return curr > acc.last ? 
    { last:curr, count: (acc.count + 1) } :
    { last:curr, count: acc.count };
}, { count:0, last:numbers[0] })

console.log(increases);