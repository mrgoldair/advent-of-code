let { conj } = require('./List.js')

// Turns a sequence `xs` into a hash-map where keys are determined by `fn`
const groupBy =
  (fn, xs) => {
    return xs.reduce((acc,curr) => {
      return {
        ...acc,
        [fn(curr)]: acc[fn(curr)]
                    ? conj(curr, acc[fn(curr)])
                    : acc[fn(curr)] = [curr]
    }}, {})
  }

// Given a group (an keyed object with array values), return the entries of the group with the most
// Grouping => [ Key, Entries ]
const smallest =
  grouping => {
    return Object.entries(grouping)
      .reduce(([ l,max ],[ r,group ]) => {
        return group.length == max.length
                ? [ l, max ]
                : group.length < max.length 
                  ? [ r, group ] 
                  : [ l, max ]
      })
  }

const largest =
  grouping => {
    return Object.entries(grouping)
      .reduce(([ l,max ],[ r,group ]) => {
        return group.length == max.length
                ? [ r, group ]
                : group.length > max.length
                  ? [ r, group ] 
                  : [ l, max ]
      })
  }

module.exports = {
  smallest,
  largest,
  groupBy
}