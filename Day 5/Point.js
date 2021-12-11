let { nth } = require('../List.js');

/**
 * 
 */
let Component = {
  x: 1,
  y: 2
}

const equal =
  ([ px,py ],[ ux,uy ]) =>
    px == ux && py == uy

const max =
  (component,p,u) => {
    return nth((component - 1),p) > nth((component - 1),u)
      ? p : u
  }

// Where component is of Component.x or Component.y
const min =
  (component,p,u) => {
    return nth((component - 1),p) < nth((component - 1),u)
      ? p : u
  }

const sub =
  ([ px,py ], [ qx,qy ]) =>
    [ qx - px, qy - py ]

module.exports = {
  equal,
  min,
  max,
  sub
}