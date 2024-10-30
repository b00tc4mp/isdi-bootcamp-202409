var Raid = function () {
    this.length = 0
}

Raid.prototype.forEach = function (callback) {
    for (var i = 0; i < this.length; i++) {
        var element = this[i]
        callback(element)
    }
}

console.log('TEST Raid.prototype.js')

console.log('CASE print characters in raid')

var chars = new Raid
chars[0] = 'a'
chars[1] = 'b'
chars[2] = 'c'
chars.length = 3

chars.forEach(function (element) {
    console.log(element)
})

console.log('CASE sum numbers from raid')

var nums = new Raid
nums[0] = 100
nums[1] = 200
nums[2] = 300
nums.length = 3

var result = 0

nums.forEach(function (num) {
    result += num
})

console.log(result)