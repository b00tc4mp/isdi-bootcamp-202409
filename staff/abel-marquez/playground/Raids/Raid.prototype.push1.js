var Raid = function () {
    this.length = 0
}

Raid.prototype.push = function (element) {
    // this -> {0: 100, 1: 200, 2: 300, length: 3 }
    // element -> 400
    this[this.length] = element
     // this -> {0: 100, 1: 200, 2: 300, 3: 400, length: 3 }

    this.length ++
       // this -> {0: 100, 1: 200, 2: 300, 3: 400, length: 4 }
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


var fruits = new Raid
fruits[0] = 'apple'
fruits[1] = 'orange'
fruits[2] = 'raspberry'
fruits[3] = 'pineapple'
fruits.length = 4
var length = fruits.push('banana')
