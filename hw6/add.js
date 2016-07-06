'use strict'

const add = strings =>
{

  if (strings == '') return 0

  let matchArray = strings.match(RegExp('^//(.+)\\n'))

  if (matchArray) {
    let divider = matchArray[1]

    if (divider.startsWith('[') && divider.endsWith(']')) {
      divider = divider.slice(1,-1).split('][').join('|')
    }

    strings = strings.slice(matchArray[0].length)
    var pattern = RegExp(divider, 'g')
  } else {
    pattern = /[,\n]/g
  }

  let nums = strings
        .split(pattern)
        .map(str => str == "" ? 0 : +str)
        .filter(item => item < 1001)

  let negative = nums.filter(item => item < 0)

  if (negative.length) throw new Error(`Negative numbers like ${negative} are not allowed`)

  return nums.reduce((sum, num) => sum + num, 0)

}

module.exports = add