var Raid = function () {
    this.length = 0
}

Raid.prototype.includes = function (searchElement, fromIndex) {
    fromIndex === undefined ? fromIndex = 0
        : fromIndex < 0 ? (fromIndex + this.length)
            : fromIndex

    for (var i = 0; i < this.length; i++) {
        var element = this[i]
        if (element === searchElement) {
            return true
        }
    }
    return false
}

console.log('TEST Raid.prototype.includes')

console.log('CASE check if 2 is included in nums')

var nums = new Raid
nums[0] = 1
nums[1] = 2
nums[2] = 3
nums.length = 3

console.log(nums.includes(2));
// Expected output: true

console.log('CASE check if at is included in pets')

var pets = new Raid
nums[0] = 'cat'
nums[1] = 'dog'
nums[2] = 'bat'
nums.length = 3

console.log(pets.includes('at'));
// Expected output: false

console.log('CASE check if 2 is included in nums from an index')

var nums = new Raid
nums[0] = 1
nums[1] = 2
nums[2] = 3
nums.length = 3

console.log(nums.includes(2, 1));
// Expected output: true

console.log('CASE check if 2 is included in nums from a negative index')

var nums = new Raid
nums[0] = 1
nums[1] = 2
nums[2] = 3
nums.length = 3

console.log(nums.includes(1, -2));
// Expected output: true