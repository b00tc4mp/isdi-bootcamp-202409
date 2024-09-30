 var at = function(iterable, index) {
     if(index > -1) {
        //mathflor es para redondear hacia abajo un número que tiene decimales
         return iterable[Math.floor(index)];
     }
    else {

        return iterable[iterable.length + (Math.ceil(index))];
    }

 }

console.log("CASE locate kale grom veggies");

var veggies = {
    0: 'brocoli',
    1: 'carrot',
    2: 'potato',
    3: 'onion',
    4: 'zucchini',
    5: 'kale',
    length:6 };

var veggie = at(veggies, -1);
console.log(veggie);

console.log('CASE locate green from colors');

var colors = {
    0: 'green',
    1: 'blue',
    2: 'yellow',
    3: 'purple',
    4: 'orange',
    5: 'red',
    length:6 };

var color = at(colors, -10);
console.log(color);

