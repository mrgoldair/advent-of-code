const fs = require('fs');

// string -> string[]
function load(file, split='\n'){
  return fs.readFileSync(file, { encoding:'utf8', flag:'r' }).split(split)
}

module.exports = {
  load
}