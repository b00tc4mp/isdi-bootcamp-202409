console.log('TEST RAID.prototype.indexOf')

var Raid = function () {
  this.length = 0
}

Raid.prototype.indexOf = function (searchElement, fromIndex) {
  var found = 0;

  if (!fromIndex) {
    fromIndex = 0;
  }
  if (fromIndex < 0) {
    fromIndex = this.length + fromIndex
  }

  for (var i = fromIndex; i < this.length; i++) {
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

console.log('CASE show index of "8" in "numbers"')
var result = numbers.indexOf(8)
console.log(result) // Expected output: 3

console.log('CASE show index of "20" in "numbers"')
var result2 = numbers.indexOf(20)
console.log(result2) // Expected output: -1

console.log('CASE show index of "7" in "numbers" from index -3')
var result = numbers.indexOf(7, -3)
console.log(result) // Expected output: 4

var letters = new Raid
letters[0] = 'a'
letters[1] = 'b'
letters[2] = 'c'
letters[3] = 'b'
letters[4] = 'a'
letters.length = 5

console.log('CASE get index of c in letters')
var result3 = letters.indexOf('c')
console.log(result3) // expected output: 2