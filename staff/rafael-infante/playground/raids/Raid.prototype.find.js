console.log("TEST Raid.prototype.find");

var Raid = function () {
  this.length = 0;
};

Raid.prototype.find = function (callback) {
  for (var i = 0; i < this.length; i++) {
    var element = this[i]
    var found = callback(element)
    if (found) return element
  }
  return undefined
};

console.log('CASE find the first element greater than 10')
var numbers = new Raid()
numbers[0] = 5
numbers[1] = 12
numbers[2] = 8
numbers[3] = 130
numbers[4] = 44
numbers.length = 5

var found = numbers.find(function (number) { return number > 10 })
console.log(found)