let { load } = require('../Data');
let { groupsOf } = require('../Group.js');
let { map, last, conj } = require('../List.js');

//                                      Split our text on '->' and newline
let points = load('./Day 5/Lines.txt',/\s->\s|\n/)
              // Split again on ','. Now we have a tuple of string [ '0', '22' ]
              .map(l => l.split(','))
              // Each `p` (what will be points) turn their strings into numbers so
              // we end up with [ 0, 22 ]
              .map(p => p.map(Number));

let lines = groupsOf(2, points);

// Function definitions for this solution

// Point -> Point -> Point
const sub =
  ([ px,py ],[ qx,qy ]) => [ (qx - px), (qy - py) ]

// Point -> Point -> Bool
const eq =
  ([ px,py ],[ qx,qy ]) => (px == qx) && (py == qy)

// Point -> Point -> Point
const add =
  ([ px,py ],[ qx,qy ]) => [ (px + qx), (py + qy) ]

// Line -> Number
const grad =
  ([[ px,py ],[ qx,qy ]]) =>
    qx - px == 0 ? Infinity : (qy - py) / (qx - px)

// Line -> Bool
const diagonal =
  l =>
    grad(l) !== 0 && grad(l) !== Infinity

// This will be our map of points to tallys
let index = new Map()

/**
 * Walk - Generate a sequence of steps (at most 1 in any direction) 
 * between points `p` and `q`
 * 
 * Point -> Point -> Point[]
 */
const walk =
  ([ p,q ]) => {
    // The relative distance between points
    let [ x,y ] = sub(p,q)
    // A single step in the direction of our walk. We want each step to be
    // at most 1 in x or y direction but depending on the points that direction
    // coult be RTL/LTR/TTB/BTT. `Math.sign` is used to extract the correct sign
    // in the case where the first point is after the second and the direction
    // of "travel" is backwards.
    let step = [ Math.sign(x), Math.sign(y) ]
    // Our walk starts at `p`
    let path = [p];
    // Add to the path until we're at `q`
    while ( !eq(last(path),q) ){
      // The next step in our path is a step after our last
      let next = add(step,last(path));
      // Create a new path with the new step added
      path = conj(next,path);
    }

    return path;
  }

/***
 * Tally - given a `path`, record each position into `index` that a walk takes
 */
const tally =
  (index,path) => {
    return path.reduce((acc,step) => {
      let key = step.join(",")
      return (acc.has(key)
              ? acc.set(key, (acc.get(key) + 1))
              : acc.set(key,1));
    },index)
  }

// Remove the diagonals
lines = lines.filter(l => !diagonal(l))
// Point[][]
let walks = map(walk,lines)
// walks.
let final = walks.reduce(tally,index)

console.log([...final.values()].filter(x => x > 1).length)