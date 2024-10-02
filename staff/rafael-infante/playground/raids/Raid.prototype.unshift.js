console.log('TEST Raid.prototype.unshift')

var Raid = function () {
  this.length = 0
}

Raid.prototype.unshift = function () {
  for (var j = arguments.length - 1; j >= 0; j--) {
    for (var i = this.length; i >= 0; i--) {
      this[i] = this[i - 1]
    }
    this[0] = arguments[j]
    this.length++
  }
  return this.length
}

var obj = new Raid
obj[0] = 1
obj[1] = 2
obj[2] = 3
obj.length = 3

console.log('CASE add one element at the start of obj')
var length = obj.unshift('a')
console.log(obj)
console.log(length)

var obj2 = new Raid
obj2[0] = 1
obj2[1] = 2
obj2[2] = 3
obj2.length = 3

console.log('CASE add two elements at the start of obj')
var length2 = obj2.unshift('a', 'b')
console.log(obj2)
console.log(length2)