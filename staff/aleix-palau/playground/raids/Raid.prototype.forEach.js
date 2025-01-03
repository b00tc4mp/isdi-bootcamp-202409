var Raid = function () {
    this.length = 0
}

Raid.prototype.forEach = function (callback) {
    for (var i = 0; i < this.length; i++) {

        callback(this[i])
    }
}

console.log('TEST forEach')

console.log('CASE sum the numbers in the object')

var nums = new Raid
nums[0] = 5
nums[1] = 4
nums[2] = 5
nums.length = 3
var sum = 0

nums.forEach(function (num) {
    sum += num
})

console.log(sum)
// 14