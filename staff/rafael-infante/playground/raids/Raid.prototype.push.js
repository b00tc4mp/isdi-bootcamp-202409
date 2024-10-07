console.log('TEST Raid.prototype.push')

var Raid = function () {
  this.length = 0;
};

Raid.prototype.push = function (element) {
  // this -> { 0: 100, 1: 200, 2: 300, length: 3 }
  // element -> 400

  for (var i = 0; i < arguments.length; i++) {
    this[this.length] = arguments[i]
    this.length++
  }
  return this.length


};

console.log('CASE add 400 to nums')
var nums = new Raid()
nums[0] = 100;
nums[1] = 200;
nums[2] = 300;
nums.length = 3;
var length = nums.push(400)

console.log(nums);
//Raid { 0: 100, 1: 200, 2: 300, 3: 400, length: 4 }

console.log(length)
// 4

console.log('CASE add cows to animals')
var animals = new Raid()
animals[0] = 'pigs'
animals[1] = 'goats'
animals[2] = 'dogs'
animals[3] = 'sheep'
animals.length = 4

var length = animals.push('cows')
console.log(animals)

console.log('CASE add "coconut", "pear" & "mango" to fruits')
var fruits = new Raid
fruits[0] = 'banana'
fruits[1] = 'apple'
fruits[2] = 'kiwi'
fruits[3] = 'grape'
fruits.length = 4

var length = fruits.push('coconut', 'pear')
console.log(fruits)