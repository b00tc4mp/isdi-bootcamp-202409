Raid = function () {
    this.length = 0
}

Raid.prototype.push = function (element) {
    this[this.length] = element
    this.length++

    return this.length
}

console.log('TEST Raid.prototype.push')

console.log('CASE add 400 to nums')

var nums = new Raid
nums[0] = 100
nums[1] = 200
nums[2] = 300
nums.length = 3

nums.push(400)

console.log(nums)
// {0: 100, 1: 200, 2: 300, 3: 400, length: 4}
console.log(nums.length)
// 4

console.log('CASE add banana to fruits')

var fruits = new Raid
fruits[0] = "apple"
fruits[1] = "orange"
fruits[2] = "raspberry"
fruits[3] = "pineapple"
fruits.length = 4

fruits.push("banana")

console.log(fruits)
// {0: 'apple', 1: 'orange', 2: 'raspberry', 3: 'pineapple', 4: 'banana', length: 5}
console.log(fruits.length)
// 5

console.log('CASE add Hospitalet to cities')

var cities = new Raid
cities[0] = "Barcelona"
cities[1] = "Vancouver"
cities[2] = "Karlsruhe"
cities.length = 3

cities.push("Hospitalet")

console.log(cities)
// {0: 'Barcelona', 1: 'Vancouver', 2: 'Karlsruhe', 3: 'Hospitalet', length: 4}
console.log(cities.length)
// 4