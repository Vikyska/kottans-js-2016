function some(...args) {
  return {
    [Symbol.hasInstance]: (v) => args.some(arg => v instanceof arg)
  }
}

function deepAssign(target, ...sources) {
  
  if (target == null) throw new TypeError

  let to = Object(target)

  if (!sources.length) return to

  sources.forEach(nextSource => {

    if (nextSource == null) return

    let from = Object(nextSource)

    Reflect.ownKeys(from).forEach(nextKey => {

      if (from.propertyIsEnumerable(nextKey)) {

        let val = from[nextKey]

        if (val === Object(val))

          to[nextKey] = deepAssign(new val.constructor(
            val instanceof some(RegExp, Date, Map, Set)
              ? val
              : null
          ), val)
        else
          to[nextKey] = val
      }
    })
  })

  return to
}

console.dir(deepAssign({}, {a: 1, b: {bb: 35}, z: { kkk : { fff: { sss: `"deeeeeeep"(c) Leonardo Dicaprio. Inception.`}}} }, {b: 2}, {a: 'testOverride'}, {x: 'new'}));