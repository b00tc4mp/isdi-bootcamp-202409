var Raid = function () {
    this.length = 0
}

Raid.prototype.at = function (index) {
    return index < -this.length || index >= this.length ? 'out of index' : (index >= 0 ? this[index] : this[index + this.length])
}

console.log('TEST Raid.prototype.at')

console.log('CASE get number at index 3 in nums')

var nums = new Raid
nums[0] = 100
nums[1] = 200
nums[2] = 300
nums[3] = 400
nums[4] = 500
nums.length = 5

var num = nums.at(3)
console.log(num)
// 400

console.log('CASE locate index -1 on cities')

var cities = new Raid
cities[0] = 'barcelona'
cities[1] = 'madrid'
cities[2] = 'valencia'
cities.length = 3

var city = cities.at(-1)
console.log(city)
// valencia