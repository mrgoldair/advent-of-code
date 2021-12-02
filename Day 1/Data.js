const fs = require('fs');

function loadData(){
  let data = fs.readFileSync('./Day 1/data.txt', { encoding:'utf8', flag:'r' })

  return data.split('\n')
              .map(s => Number(s));
}

module.exports = {
  loadData
}