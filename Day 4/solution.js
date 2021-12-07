let { load } = require('../Data.js');
let { groupsOf, everyNth } = require('../Group.js');
let { map, filter, empty, sum } = require('../List.js');
let { curry, compose } = require('../Fn.js');

let draw = [
  12,28,0,63,26,38,64,17,74,67,51,44,77,32,6,10,52,47,61,46,50,29,15,1,39,37,13,66,45,8,68,96,53,40,76,72,21,93,16,83,62,48,11,9,20,36,91,19,5,42,99,84,4,95,92,89,7,71,34,35,55,22,59,18,49,14,54,85,82,58,24,73,31,97,69,43,65,27,81,56,87,70,33,88,60,2,75,90,57,94,23,30,78,80,41,3,98,25,79,86
];

// Arrange raw input into `boards` of 5x5
let numbers = load('./Day 4/boards.txt')
              // Match digits
              .flatMap(l => l.match(/\d\d?/mg))
              // Remove \n chars
              .filter(n => n)

// Represents a cell on a bingo board
const cell =
  (row, col, value) => { return { row, col, value:Number(value), found:false } }

// Mark `num` off of `board` 
// board -> board
const mark =
  curry((num, board) => {
    return board.map(cell => {
              return cell.value == num
                      ? { ...cell, found:true }
                      : cell })
  })

// Get entire row containing `cell`
const row =
  (board, { row }) =>
    board.filter(cell => cell.row == row)

// Get entire col containing `cell`
const col =
  (board, { col }) =>
    board.filter(cell => cell.col == col)

const rows =
  board =>
    groupsOf(5,board)

const cols =
  board =>
    [ 0,1,2,3,4 ].map(i => everyNth(5,i,board))
    
// Given a cell, check it's row/col for bingo
const check =
  board =>
    // Some of the rows have every cell found?
    rows(board).some(row => row.every(cell => cell.found)) ||
    // Some of the cols have every cell found?
    cols(board).some(col => col.every(cell => cell.found))
      ? board : false;

/**
 * Because bingo occurs only in rows or columns (not diagonals), and because marking a number (potentially - a board may not have a number) affects only a single column and row at a time, we don't have to test 5x5 solutions at once but 2x5 - the intersection of the row/col that the marked number occupies
 */
let boards =
  groupsOf(25,numbers)
    .map(g => g.map((value,c) => cell(Math.floor(c/5), c%5, value)))

bingo =
  (boards,[ n, ...rest ]) => {

    // No boards won!
    if (n == undefined) {
      return boards
    }

    // Transition our boards state
    let updated = map(mark(n),boards)

    // Check for our exit condition - Bingo!
    let [ board ] = map(check,updated).filter(x => x)
  
    if (board){
      return [ board, n ];
    }

    return bingo(updated, rest)
  }

let [ board, n ] = bingo(boards,draw)

values = map(cell => cell.value)
unmarked = filter(cell => !cell.found)

let sumUnmarked = compose(compose(unmarked, values), sum)(board)

console.log(sumUnmarked)
