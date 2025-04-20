var Raid = function () {
    this.length = 0
}

Raid.prototype.push = function () {
    for (var i = 0; i < arguments.length; i++) {
        var element = arguments[i]

        this[this.length] = element

        this.length++
    }

    return this.length
}

console.log('TEST Raid.prototype.push')

console.log('CASE add 400 to nums')

var nums = new Raid // Raid()
nums[0] = 100
nums[1] = 200
nums[2] = 300
nums.length = 3
var length = nums.push(400) // nums['push'](400)

console.log(nums)
// Raid {0: 100, 1: 200, 2: 300, 3: 400, length: 4 }
console.log(length)
// 4

console.log('CASE add banana to fruits')

var fruits = new Raid
fruits[0] = 'apple'
fruits[1] = 'orange'
fruits[2] = 'raspberry'
fruits[3] = 'pineapple'
fruits.length = 4
var length = fruits.push('banana')

console.log(fruits)
// { 0: 'apple', 1: 'orange', 2: 'raspberry', 3: 'pineapple', 4: 'banana', length: 5 }
console.log(length)
// 5

console.log('CASE add banana pear and coconut to fruits')

var fruits = new Raid
fruits[0] = 'apple'
fruits[1] = 'orange'
fruits[2] = 'raspberry'
fruits[3] = 'pineapple'
fruits.length = 4
var length = fruits.push('banana', 'pear', 'coconut')

console.log(fruits)
// { 0: 'apple', 1: 'orange', 2: 'raspberry', 3: 'pineapple', 4: 'banana', 5:'pear', 6: 'coconut', length: 7 }
console.log(length)
// 7