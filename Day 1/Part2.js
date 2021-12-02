const Data = require('./Data.js');
const List = require('./List.js');
const Fn = require('../Fn.js');

let numbers = Data.loadData();

function countIncreases(acc,curr){
  return (curr > acc.last ? 
    { last:curr, count: (acc.count + 1) } :
    { last:curr, count: acc.count })
}

let solution =
  Fn.compose(
               // num[] -> [num,num,num][]
    Fn.compose(List.slidingOf(3),
               // [num,num,num][] -> num[]
               List.map(List.sum)),
    List.reduce(countIncreases, {last:0,count:-1}))

console.log(solution(numbers));