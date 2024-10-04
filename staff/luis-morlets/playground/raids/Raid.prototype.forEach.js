var Raid = function () {
    this.length = 0
}

Raid.prototype.forEach = function (callback) {
    for (i = 0; i < this.length; i++) {
        var element = this[i]

        callback(element)
    }
}

console.log('TEST Raid.prototype.forEach')

console.log('CASE print characters in raid')

var chars = new Raid
chars[0] = 'a'
chars[1] = 'b'
chars[2] = 'c'
chars.length = 3

var printElement = function (element) {
    console.log(element)
}

chars.forEach(printElement)
//'a'
//'b'
//'c'

console.log('CASE sum numbers from raid')

var nums = new Raid
nums[0] = 100
nums[1] = 200
nums[2] = 300
nums.length = 3
var result = 0

var printElement = function (num) {
    result += num
}

nums.forEach(printElement)
console.log(result)
//600