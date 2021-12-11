let Point = require('./Point.js');

let Component = {
  x: 1,
  y: 2
}

const min =
  (component,[ p, u ]) => Point.min( component, p, u )

const max =
  (component,[ p, u ]) => Point.max( component, p, u )

module.exports = {
  min,
  max
}