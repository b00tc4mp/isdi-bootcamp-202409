console.log('TEST Raid.prototype.pop')

var Raid = function () {
  this.length = 0
}

Raid.prototype.pop = function () {
  var last = this[this.length - 1]
  delete this[this.length - 1]
  this.length--
  return last
}

console.log('CASE remove 400 from nums')
var nums = new Raid
nums[0] = 100
nums[1] = 200
nums[2] = 300
nums[3] = 400
nums.length = 4

var element = nums.pop()
console.log(nums)
console.log(element)

console.log('CASE remove cows from animals')
var animals = new Raid
animals[0] = 'pigs'
animals[1] = 'goats'
animals[2] = 'dogs'
animals[3] = 'cows'
animals.length = 4

var animal = animals.pop()
console.log(animals)
console.log(animal)