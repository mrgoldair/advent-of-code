let state = [ 1,3,4,1,5,2,1,1,1,1,5,1,5,1,1,1,1,3,1,1,1,1,1,1,1,2,1,5,1,1,1,1,1,4,4,1,1,4,1,1,2,3,1,5,1,4,1,2,4,1,1,1,1,1,1,1,1,2,5,3,3,5,1,1,1,1,4,1,1,3,1,1,1,2,3,4,1,1,5,1,1,1,1,1,2,1,3,1,3,1,2,5,1,1,1,1,5,1,5,5,1,1,1,1,3,4,4,4,1,5,1,1,4,4,1,1,1,1,3,1,1,1,1,1,1,3,2,1,4,1,1,4,1,5,5,1,2,2,1,5,4,2,1,1,5,1,5,1,3,1,1,1,1,1,4,1,2,1,1,5,1,1,4,1,4,5,3,5,5,1,2,1,1,1,1,1,3,5,1,2,1,2,1,3,1,1,1,1,1,4,5,4,1,3,3,1,1,1,1,1,1,1,1,1,5,1,1,1,5,1,1,4,1,5,2,4,1,1,1,2,1,1,4,4,1,2,1,1,1,1,5,3,1,1,1,1,4,1,4,1,1,1,1,1,1,3,1,1,2,1,1,1,1,1,2,1,1,1,1,1,1,1,2,1,1,1,1,1,1,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,2,5,1,2,1,1,1,1,1,1,1,1,1 ]

const inc =
  n => n + 1

const dec =
  n => n - 1

const freq =
  xs =>
   xs.reduce((acc,curr) => {
      return acc.has(curr)
              ? acc.set(curr, inc(acc.get(curr)))
              : acc.set(curr,1);
   }, new Map());

const gen =
  (n,state) => {
    //
    if (n == 0)
      return state
    //
    let next = new Map();
    for (let [ k,v ] of state.entries()){
      if (k == 0) {
        next.set(6, next.has(6) ? (next.get(6) + v): v)
        next.set(8,v)
      } else if (k == 7) {
        next.set(6, next.has(6) ? (next.get(6) + v): v)
      } else {
        next.set(dec(k),v)
      }
    }
    return gen(dec(n),next);
  }

//console.log(freq(state))
let res = [...gen(256,freq(state)).values()]
            .reduce((acc,cur) => acc + cur)
console.log(res)