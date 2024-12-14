var Raid = function () {
    this.length = 0;
}

Raid.prototype.forEach = function (callback) {
    for (var i = 0; i < this.length; i++) {
        callback(this[i])
    }
}

console.log('TEST Raid.prototype.forEach')

console.log('CASE print characters in iterable')

var chars = new Raid
chars[0] = 'a'
chars[1] = 'b'
chars[2] = 'c'
chars.length = 3

// chars.forEach(function (element) { console.log(element) })
// a
// b
// c

var printElement = function (element) {
    console.log(element)
}

chars.forEach(printElement);

console.log('CASE sum numbers from iterable');

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
// 600
