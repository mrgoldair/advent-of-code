const fs = require('fs');

// string -> string[]
function loadData(file){
  let data = fs.readFileSync(file, { encoding:'utf8', flag:'r' })

  return data.split('\n')
}

module.exports = {
  loadData
}