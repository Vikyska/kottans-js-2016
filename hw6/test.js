'use strict'

require("chai").should()

const {main} = require("./package")
const add = require(main)

describe("add", () => {

  it('should be a function with 1 param', () => {
    add.should
      .be.a("function")
      .have.lengthOf(1)
  })

  it('should return 0 on empty string', () => {
    add('').should.equal(0)
  })

  it('should return self argument if it only one', () => {
    add('1').should.equal(1)
    add('24').should.equal(24)
    add('1876').should.equal(0)//should ignore more than 1000
  })

  it('should return sum of 2 elements from string', () => {
    add('1,4').should.equal(5)
    add('25,4').should.equal(29)
    add('150,150').should.equal(300)
  })

  it('should work with unknown amount of numbers', () => {
    add('1,3,4').should.equal(8)
    add('1,3,4,10,20').should.equal(38)
    add('1,9,20,40,55,150').should.equal(275)
  })

  it('should handle new lines as divider', () => {
    add('1\n5').should.equal(6)
    add('1\n5,10').should.equal(16)
    add('1\n5\n14').should.equal(20)
    add('1\n5,14').should.equal(20)
  })

  it('should handle custom divider', () => {
    add('//lol\n1lol2lol3').should.equal(6)
    add('//%&#\n1%&#2%&#7').should.equal(10)
    add('//%#GGd\n1%#GGd2%#GGd3').should.equal(6)
  })

  it('should throw an exception negatives not allowed', () => {
    (()=>{add('4,-8,5,-5')}).should.throw(Error, 'Negative numbers like -8,-5 are not allowed')
  })

  it('should ignore number bigger than 1000', () => {
    add('1,3,1005,6').should.equal(10)
    add('1000,3,2005,6').should.equal(1009)
  })

  it('should handle multiply delimitters', () => {
    add('//[ololo][upyachka]\n1ololo2upyachka3').should.equal(6)
    add('//[ololo][more][nope][kottan]\n1ololo2more3kottan4nope5').should.equal(15)
  })


})