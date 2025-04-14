var at = function (iterable, index) {
     /*
     Identificar el valor de la propiedad con el indice indicado.
     Siempre devuelve undefined si no encuentra el index.
     Devolver el elemento en el iterable
     */

     return iterable[index >= 0 ? Math.floor(index) : iterable.length + (Math.ceil(index))]
};

console.log("TEST at")

console.log("CASE get element at index 3 in veggies");

var veggies = { 0: 'broccoli', 1: 'cauliflower', 2: 'cabbage', 3: 'kale', 4: 'tomato', length: 5 };
var veggie = at(veggies, 3);
console.log(veggie);
//kale

console.log('CASE get element at index -3 in colors');

var colors = { 0: 'red', 1: 'green', 2: 'blue', 3: 'yellow', length: 4 };
var color = at(colors, -3);

console.log(color);
//green

console.log("CASE get number at index 5 in nums")

var nums = { 0: 100, 1: 200, 2: 300, 3: 400, 4: 500, length: 5 }
var num = at(nums, 10)

console.log(num)
//undefined
