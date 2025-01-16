//CASE: Create a function to locate an index from an array


var at = function (iterable, indexInterior) {
    if (indexInterior >= 0 /*&& indexInterior <= iterable.length*/) {
        //Aquí evaluamos cuando index >= 0
        return iterable[indexInterior];

    } else if (indexInterior < 0 /*&& indexInterior >= -1 * iterable.length*/) {
        //Aquí evaluaremos los negativos
        return (iterable[iterable.length + index]);

    } else {
        return;
        //Si dejamos un return a palo seco ya retorna undefined, 
        //no hace falta especificar undefined
    }
}

var veggies = {
    0: "tomato",
    1: "pumkin",
    2: "cauliflower",
    3: "pepper",
    4: "kale",
    length: 5
};

var colors = {
    0: "green",
    1: "back",
    2: "orange",
    3: "yellow",
    4: "pink",
    length: 5
};


console.log("CASE: Locate index 4:")
var index = 4;
console.log('An index of ' + index + ' returns ' + at(veggies, index));
// Expected output: "An index of 2 returns kale "


console.log("CASE: Locate index -2:")
var index = -2;
console.log('An index of ' + index + ' returns ' + at(colors, index));
// Expected output: "An index of -2 returns yellow "