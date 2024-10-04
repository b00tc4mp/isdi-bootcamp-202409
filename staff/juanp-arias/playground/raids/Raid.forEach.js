var Raid = function () { this.length = 0 }

Raid.prototype.forEach = function (callback){
    for (var i = 0; i < this.length; i++){
        var element = this[i]

        callback(element)
    }
}

console.log('CASE sum numbers from iterable')

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

console.log('CASE rest numbers from iterable')

var nums = new Raid
nums[0] = 500
nums[1] = 600
nums[2] = 300
nums.length = 3
var result = 0

nums.forEach(function (num) {
    result -= num
})

console.log(result)
// -1400