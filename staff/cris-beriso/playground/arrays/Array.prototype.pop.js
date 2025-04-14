console.log("TEST Array.prototype.pop")

console.log("CASE extract tomato from veggies")

var veggies = ["brocoli", "cauliflower", "cabbage", "kale", "tomato"]
var veggie = veggies.pop()

console.log(veggies)
// ["brocoli", "cauliflower", "cabbage", "kale"]
console.log(veggie)
// tomato

console.log("CASE extract yellow from colors")

var colors = ["red", "green", "blue", "yellow"]
var color = colors.pop()

console.log(colors)
// ["red", "green", "blue"]
console.log(color)
// yellow