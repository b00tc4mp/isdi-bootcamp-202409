var Raid = function () {
    this.length = 0
}

Raid.prototype.pop = function () {
    var lastElement = this[this.length - 1]
    delete this[this.length - 1]
    this.length--
    return lastElement
}
console.log('TEST Raid.prototype.pop')

console.log('CASE delete last nums index')

var nums = new Raid
nums[0] = 100
nums[1] = 200
nums[2] = 300
nums[3] = 400
nums[4] = 500
nums.length = 5

var res = nums.pop()
console.log(res)
console.log(nums)
// nums { 0: 100, 1: 200, 2: 300, 3: 400, length : 4}