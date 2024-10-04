var Raid = function () { // función base
    this.length = 0 // setea propiedad length 0 
}

Raid.prototype.push = function (element) { // push es propiedad de prototipo de Raid
    this[this.length] = element
    this.length++

    return this.length
}

console.log('TEST Raid.prototype.push')

console.log('CASE add 400 to nums')

var nums = new Raid // instanciando objeto tipo Raid. === Raid()
nums[0] = 100
nums[1] = 200
nums[2] = 300
nums.length = 3

var length = nums.push(400)

console.log(nums)
// Raid { 0: 100, 1: 200, 2: 300, 3: 400, length: 4 }
console.log(length)
// 4