var at = function (iterable, index) {
    /*
    Identificar el valor de la propiedad con el indice indicado.
    Siempre devuelve undefined si no encuentra el index.
    Devolver el elemento en el iterable
    */ 

    if (index > -1) {
        return iterable[Math.floor(index)];
   } else {
        return iterable[iterable.length + (Math.ceil(index))];
   }

};

console.log ("CASE locate kale from veggies");

var veggies = { 0: 'broccoli', 1: 'cauliflower', 2: 'cabbage', 3: 'kale', 4: 'tomato', length: 5 };

var veggie = at(veggies, 3);

console.log(veggie);
//kale

console.log('CASE locate green from colors');

var colors = { 0: 'red', 1: 'green', 2: 'blue', 3: 'yellow', length: 4 };
var color = at(colors, -3);

console.log(color);
//green