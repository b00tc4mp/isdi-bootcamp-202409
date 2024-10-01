console.log('TEST Raid.prototype.concat')

var Raid = function () {
  this.length = 0
}

Raid.prototype.concat = function () {
  var result = { length: 0 }
  for (var i = 0; i < this.length; i++) {
    result[result.length++] = this[i]
  }
  for (var j = 0; j < arguments.length; j++) {
    for (var k = 0; k < arguments[j].length; k++) {
      result[result.length++] = arguments[j][k]
    }
  }
  return result
}

var array1 = new Raid
array1[0] = 'a'
array1[1] = 'b'
array1[2] = 'c'
array1.length = 3

var array2 = new Raid
array2[0] = 'd'
array2[1] = 'e'
array2[2] = 'f'
array2.length = 3

var array3 = new Raid
array3[0] = 'g'
array3[1] = 'h'
array3[2] = 'i'
array3.length = 3

console.log('CASE concat 1 array')
var result1 = array1.concat(array2, array3)
console.log(result1)