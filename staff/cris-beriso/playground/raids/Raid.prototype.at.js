var Raid = function () {
    this.length = 0
}

Raid.prototype.at = function (index) {
    return this[index >= 0 ? Math.floor(index) : this.length + (Math.ceil(index))]
}

console.log("TEST Raid. prototype.at");

console.log("CASE get element at index 3 in veggies");

var veggies = new Raid
veggies[0] = "brocoli"
veggies[1] = "cauliflower"
veggies[2] = "cabbage"
veggies[3] = "kale"
veggies[4] = "tomato"
veggies.length = 5
var veggie = veggies.at(3);
console.log(veggie)
// kale

console.log("CASE get element at index -3 in colors")

var colors = new Raid
colors[0] = "red"
colors[1] = "green"
colors[2] = "blue"
colors[3] = "yellow"
colors.length = 4
var color = colors.at(-3);
console.log(color);
// green

console.log("CASE get number at index 5 in nums")

var nums = new Raid
nums[0] = 100
nums[1] = 200
nums[2] = 300
nums[3] = 400
nums[4] = 500
nums.length = 5
var num = nums.at(10);

console.log(num)
// undefined

