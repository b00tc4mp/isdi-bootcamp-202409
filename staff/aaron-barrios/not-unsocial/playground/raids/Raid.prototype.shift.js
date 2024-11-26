var Raid = function () {
    this.length = 0
}


Raid.prototype.shift = function () {

    for (i = 1; i < this.length; i++) {
        this[i - 1] = this[i]
    }
    delete this[this.length - 1]
    this.length--
    return this
}

console.log('TEST Raid.prototype.shift')

console.log('CASE get number shift 300 in nums')

var nums = new Raid
nums[0] = 100
nums[1] = 200
nums[2] = 300
nums[3] = 400
nums[4] = 500
nums.length = 5

var num = nums.shift()
console.log(num)
//200, 300, 400, 500


