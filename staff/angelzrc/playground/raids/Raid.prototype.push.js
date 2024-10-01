var Raid = function () {
    this.length = arguments.length
    for (var i = 0; i< arguments.length; i++) {
        this[i] = arguments[i]
    }
}
console.log('TEST Raid.prototype.push')

Raid.prototype.push= function() {
   for(var i = 0; i < arguments.length; i++){
    this[this.length] = arguments[i]
    this.length++
   }
    return this.length
}

console.log('CASE add 400 to nums')

var nums = new Raid(100, 200, 300)
var length = nums.push(400)


console.log(nums)
// [100, 200, 300, 400]
console.log(length)
// 4

console.log('CASE add banana to fruits')

var fruits = new Raid('apple', 'orange', 'raspberry', 'pineapple')
var length2 = fruits.push('banana', 'pear', 'coconut')

console.log(fruits)

console.log(length2)