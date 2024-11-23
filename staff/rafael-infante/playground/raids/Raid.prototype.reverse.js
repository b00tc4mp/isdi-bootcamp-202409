console.log('TEST Raid.prototype.reverse')

var Raid = function () {
  this.length = 0
}

Raid.prototype.reverse = function () {
  //this -> numbers object
  var newObj = { length: 0 };
  for (var i = this.length - 1; i >= 0; i--) {
    newObj[newObj.length] = this[i]
    newObj.length++
  }
  for (var j = 0; j < this.length; j++) {
    this[j] = newObj[j]
  }
  return this
}

var numbers = new Raid
numbers[0] = 'one'
numbers[1] = 'two'
numbers[2] = 'three'
numbers.length = 3

console.log('CASE reverse an array of numbers')
var reversed = numbers.reverse()
console.log(reversed) // Expected output {0: 'three', 1: 'two', 2: 'one', length: 3}

console.log('CASE reverse an array of letters')

var letters = new Raid
letters[0] = 'a'
letters[1] = 'b'
letters[2] = 'c'
letters.length = 3

var reversed2 = letters.reverse()
console.log(reversed2) // Expected output {0: 'c', 1: 'b', 2: 'a', length: 3}