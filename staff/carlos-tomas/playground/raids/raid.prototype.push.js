var Raid = function () {
    this.length = 0
}

Raid.prototype.push = function (element) {
    this[this.length] = element
    this.length++

    return this.length
}

console.log('TEST Raid.prototype.push')

console.log('CASE add 400 to nums')

var nums = new Raid
nums[0] = 100
nums[1] = 200
nums[2] = 300
nums.length = 3

var length = nums.push(400)

console.log(nums)
// { 0: 100, 1: 200, 2: 300, 3: 400, length: 4 }
console.log(length)
// 4