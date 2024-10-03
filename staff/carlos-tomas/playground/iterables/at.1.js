var at = function (iterable, index) {
    // buscar en la iterable el elemnto que se encuentra en el dice
    // Siempre va a devolver undefiened si no enctra el valor 

    if (index > -1) {
        return iterable[Math.floor(index)]
    }
    else {
        return iterable[iterable.length + (Math.ceil(index))]

    }

}


console.log('TEST Array.prototype.at')

console.log('CASE buscar el indice')

var nums = { 0: 100, 1: 200, 2: 300, 3: 400, 4: 500, length: 5 };
var num = at(nums, -2)

console.log(num)

console.log('CASE extract green from colors')

var colors = { 0: 'red', 1: 'green', 2: 'blue', 3: 'yellow', length: 4 }
var color = at(colors, -3)


console.log(color)
// green