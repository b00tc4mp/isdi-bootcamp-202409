var Raid = function () {
    this.length = 0
}


Raid.prototype.at = function (index) {
    // buscar en el iterable el elemento que se encuentra en el index
    // siempre te va a devolver undefined si no encuentra el index
    if (index >= 0) {
        var element = this[index]

        return element
    } else {
        var newIndex = index + this.length

        var element = this[newIndex]

        return element
    }
}
console.log('TEST at')

console.log('CASE get number at index 3 in nums')

var nums = new Raid
nums[0] = 110
nums[1] = 200
nums[2] = 300
nums[3] = 400
nums[4] = 500
nums.length = 5

var num = nums.at(3)
console.log(num)
// 400

console.log('CASE get number at index -3 in nums')

var nums = new Raid
nums[0] = 110
nums[1] = 200
nums[2] = 300
nums[3] = 400
nums[4] = 500
nums.length = 5

var num = nums.at(-3)
console.log(num)
// 300

console.log('CASE get number at index -10 in nums')

var nums = new Raid
nums[0] = 110
nums[1] = 200
nums[2] = 300
nums[3] = 400
nums[4] = 500
nums.length = 5

var num = nums.at(-10)
console.log(num)
// undefined

console.log('CASE get number at index 10 in nums')

var nums = new Raid
nums[0] = 110
nums[1] = 200
nums[2] = 300
nums[3] = 400
nums[4] = 500
nums.length = 5

var num = nums.at(10)
console.log(num)
// undefined