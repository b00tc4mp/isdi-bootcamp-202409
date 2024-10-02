console.log('TEST Raid.prototype.lastIndexof')

var Raid = function () {
  this.length = 0
}

Raid.prototype.lastIndexof = function (searchElement, fromIndex) {
  var found = 0;

  if (!fromIndex) {
    fromIndex = this.length - 1;
  }
  if (fromIndex < 0) {
    fromIndex = this.length + fromIndex
  }

  for (var i = fromIndex; i >= 0; i--) {
    if (this[i] === searchElement) {
      found = i;
      return found
    } else {
      found = -1
    }
  }

  return found
}

var numbers = new Raid
numbers[0] = 2
numbers[1] = 4
numbers[2] = 1
numbers[3] = 8
numbers[4] = 7
numbers[5] = 39
numbers[6] = 8
numbers.length = 7

console.log('CASE get last index of "8" in "numbers"')
var index = numbers.lastIndexof(8)
console.log(index) // 6

console.log('CASE get last index of "20" in "numbers"')
var index = numbers.lastIndexof(20)
console.log(index) // -1

console.log('CASE get last index of "8" in "numbers" from index -2')
var index = numbers.lastIndexof(8, -2)
console.log(index) // 3

console.log('CASE get last index of "8" in "numbers" from index -1')
var index = numbers.lastIndexof(8, -1)
console.log(index) // 6