console.log('TEST Raid.prototype.shift')

var Raid = function () {
  this.length = 0
}

Raid.prototype.shift = function () {
  var first = this[0]
  for (var i = 0; i < this.length - 1; i++) {
    this[i] = this[i + 1]
  }
  delete this[this.length - 1]
  this.length--;
  return first
}

var nums = new Raid
nums[0] = 100
nums[1] = 200
nums[2] = 300
nums[3] = 400
nums.length = 4

console.log('CASE remove 100 from nums')
var removed = nums.shift()
console.log(removed)
console.log(nums)

console.log('CASE remove pigs from animals')
var animals = new Raid
animals[0] = 'pigs'
animals[1] = 'goats'
animals[2] = 'dogs'
animals[3] = 'sheep'
animals[4] = 'cows'
animals.length = 5

var removed2 = animals.shift()
console.log(removed2)
console.log(animals)